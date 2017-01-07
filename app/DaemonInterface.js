'use strict';

import WebSocket from 'ws';
import EventEmitter from 'events';

export default class DaemonInterface extends EventEmitter {

  constructor() {
    super();
    console.log("DaemonInterface constructor start");
    this.ws = new WebSocket('ws://localhost:8888');
    this.wsOpen = false;
    this.useTestNet = true;
    this.identities = []; // looks like this: [currentIdentity, [list, of, identities]]
    this.pockets = []; //Only remember the pockets of the current identity.
    this.pendingRequests = []; //Requests sent to the daemon to be handled on message
  }

  /* ***************** */
  /* Utility functions */
  /* ***************** */

  init() {
    console.log("DaemonInterface init");

    this.ws.on("open", () => {
      this.wsOpen = true;
      this.dwGetAccounts();
    });

    this.ws.on('message', (data, flags) => {
      // flags.binary will be set if a binary data is received.
      // flags.masked will be set if the data was masked.
      // Handle the message (show success or failure message in the UI, etc)
      let message = JSON.parse(data);
      this.handleDaemonMessage(message);
      console.log(message.id);
      delete this.pendingRequests[message.id]; //Remove the request from the pending array
      console.log(this.pendingRequests);
    });

    console.log("DaemonInterface init complete")
  }

  sendMessage = (message) => { //Sends a message to the daemon
    console.log("Sending Message to Daemon:");
    console.log(message);

    if(this.wsOpen){
      this.pendingRequests[message.id] = (message);
      try {
        this.ws.send(JSON.stringify(message));
      } catch(e) {
        console.log(e.name);
        if(e.name == "Error") {
          this.emit("daemonMessage", {
            name: "daemonDisconnected",
            type: "error",
            text: "Disconnected (try ctrl+r)",
          });
          this.emit("deleteDaemonMessage", "loggingIn");
        }
      }
    } else {
      //TODO: Throw an error / restart the daemon
      console.log("WebSocket Not Open Yet!");
      this.emit("daemonMessage", {
        name: "daemonDisconnected",
        type: "error",
        text: "Disconnected (try ctrl+r)",
      });
    }
  };

  shouldEmitPocketsReady(messageId){
    for(let id in this.pendingRequests) {
      let request = this.pendingRequests[id];
      if(request.id != messageId && (
          request.command == "dw_receive" ||
          request.command == "dw_balance" ||
          request.command == "dw_history" ||
          request.command == "dw_stealth" )
        ) {
        return; //There are other pending pocket requests Don't emit an event.
      }
    }
    //This was the last pocket-related query request. Emit a ready event.
    this.emit("pocketsListReady", this.pockets);
  }

  generateTransactionId() { //Used for transaction IDs
    return parseInt(Math.random() * 4294967295);
  }

  /* ************** */
  /* Public Methods */
  /* ************** */

  startLogin = (accountName, password) => {
      this.emit("daemonMessageDelete", "wrongPassword");
      this.emit("daemonMessage", {
        name: "loggingIn",
        type: "info",
        text: "Logging In...",
      });
      this.dwSetAccount(accountName, password);
  };

  createIdentity = (identityName, password, useTestNet) => {
    this.emit("daemonMessageDelete", "passwordMismatch");
    this.emit('daemonMessage', {
        name: "creatingIdentity",
        type: "info",
        text: "Creating Identity...",
    });
    this.dwCreateAccount(identityName, password, useTestNet);
  }

  restoreIdentity = (identityName, password, brainwallet, useTestNet) => {
    this.emit('daemonMessage', {
        name: "restoringIdentity",
        type: "info",
        text: "Restoring Identity...",
    });
    this.dwRestoreAccount(identityName, password, brainwallet, useTestNet);
  }


  deleteIdentity = (identityName) => {
    this.dwDeleteAccount(identityName);
  }

  createPocket = (pocketName) => {
    this.emit('daemonMessage', {
        name: "creatingPocket",
        type: "info",
        text: "Creating Pocket...",
    });
    this.dwCreatePocket(pocketName);
  }

  validateAddress = (address) => {
    this.dwValidateAddress(address);
  }

  sendCoins = (address, amount, pocket, fee) => {
    this.emit("daemonMessageDelete", "notEnoughFunds");
    this.emit('daemonMessage', {
        name: "sendingCoins",
        type: "info",
        text: "Sending Coins...",
    });
    this.dwSend(address, amount, pocket, fee);
  }

  backupIdentity = () => {
    this.dwSeed();
  }

  /* **************** */
  /* Message Handlers */
  /* **************** */

  handleDaemonMessage = (message) => {
    if(message.error != null) {
      console.log(message.error);

      if(message.error == "wrong_password"){
        this.emit("daemonMessageDelete", "loggingIn");
        this.emit("daemonMessage", {
          name: "wrongPassword",
          type: "error",
          text: "Wrong password!",
        });
      }
      if(message.error == "invalid_brainwallet"){
        this.emit("daemonMessageDelete", "restoringIdentity");
        this.emit("daemonMessage", {
          name: "invalidBrainwallet",
          type: "error",
          text: "Invalid Brainwallet!",
        });
      }
      if(message.error =="passwords do not match"){
        this.emit("daemonMessageDelete", "creatingIdentity");
        this.emit("daemonMessage", {
          name: "passwordMismatch",
          type: "error",
          text: "Passwords do not match!",
        });
      }
      if(message.error =="not_enough_funds"){
        this.emit("daemonMessageDelete", "sendingCoins");
        this.emit("daemonMessage", {
          name: "notEnoughFunds",
          type: "error",
          text: "Not Enough Funds",
        });
      }
      return;
    }

    if(typeof this.pendingRequests[message.id] == "undefined" || this.pendingRequests[message.id].command == "undefined") {
      console.log("Error handling message " + message.id);
      console.log(this.pendingRequests);
    }

    switch(this.pendingRequests[message.id].command) {
      case "dw_list_accounts" : this.handleListAccounts(message);
        break;
      case "dw_create_account" : this.handleCreateAccount(message);
        break;
      case "dw_restore_account" : this.handleRestoreAccount(message);
        break;
      case "dw_set_account" : this.handleSetAccount(message);
        break;
      case "dw_delete_account" : this.handleDeleteAccount(message);
        break;
      case "dw_list_pockets" : this.handleListPockets(message);
        break;
      case "dw_balance" : this.handleBalance(message);
        break;
      case "dw_create_pocket" : this.handleCreatePocket(message);
        break;
      case "dw_receive" : this.handleReceive(message);
        break;
      case "dw_validate_address" : this.handleValidate(message);
        break;
      case "dw_stealth" : this.handleStealth(message);
        break;
      case "dw_history" : this.handleHistory(message);
        break;
      case "dw_send" : this.handleSendCoins(message);
        break;
      case "dw_seed" : this.handleBackup(message);
        break;
      default: console.log("Warning: DaemonInterface: Unknown command");
        break;
    }
  };

  handleListAccounts = (message) => {
    //Take list of accounts and turn them into a list of identities
    //identities include a name and a balance
    var accounts = message.result;
    this.identities.identitiesList = accounts[1].map((accountName, index) => {
      //TODO: We want to see if we already know about this account to carry over the balance.
      return {
        name: accountName,
        balance: -1,
      }
    })
    this.identities.currentIdentity = accounts[0];
    if (this.identities.currentIdentity != null) {
      this.dwGetPockets();
    }
    this.emit("identitiesListReady", this.identities);
  };

  handleCreateAccount = (message) => {
    this.emit("daemonMessageDelete", "creatingIdentity");

    this.identities.identitiesList.push({
      name: this.pendingRequests[message.id].params[0],
      balance: 0,
      pockets: [],
    });

    this.emit("identitiesListReady", this.identities);
  };

  handleRestoreAccount = (message) => {
    this.emit("daemonMessageDelete", "restoringIdentity");

    this.identities.identitiesList.push({
      name: this.pendingRequests[message.id].params[0],
      balance: 0,
      pockets: [],
    });

    this.emit("identitiesListReady", this.identities);
  };

  handleSetAccount = (message) => {
    this.emit("daemonMessageDelete", "loggingIn");
    this.pockets = [];
    this.identities.currentIdentity = this.pendingRequests[message.id].params[0];
    this.dwGetPockets();
    this.emit("currentAccountReady", this.identities.currentIdentity);
  };

  handleDeleteAccount = (message) => {
    let identitiesList = this.identities.identitiesList;

    for(let i in identitiesList) {
      console.log(identitiesList[i]);
      if(identitiesList[i].name == this.pendingRequests[message.id].params[0]) {
        delete identitiesList[i];
      }
    }
    this.emit("identitiesListReady", this.identities);
    console.log(this.identities);
  };

  handleListPockets = (message) => {
    var pocketList = message.result[0]

    if(pocketList.length <= 0) {
      console.log("Empty Pocket List from Daemon");
      return;
    }

    for(let i = 0; i < pocketList.length; i++) {
      this.dwGetPocketBalance(pocketList[i]);
      this.dwGetPocketAddresses(pocketList[i]);
      this.dwGetPocketHistory(pocketList[i]);
      this.dwGetPocketStealthAddress(pocketList[i])
      this.pockets[i] = {
        name: pocketList[i],
        balance: -1,
        addresses: [],
      }
    }
    this.emit("pocketsListReady", this.pockets)
  };

  handleBalance = (message) => {
    let pocketName = this.pendingRequests[message.id].params[0]
    for(let i = 0; i < this.pockets.length; i++) {
      if(this.pockets[i].name == pocketName) {
        this.pockets[i] = {
          name: pocketName,
          balance: message.result[0],
        };
      }
    }

    this.shouldEmitPocketsReady(message.id);
  };

  handleCreatePocket = (message) => {
    this.emit("daemonMessageDelete", "creatingPocket");

/*    this.pockets.push({
      name: this.pendingRequests[message.id].params[0],
      balance: 0,
      addresses: [],
      history: [],
    }); */

    this.dwGetPockets();
  };

  handleReceive = (message) => {
    let addresses = message.result[0];
    let currentPocketName = this.pendingRequests[message.id].params[0];
    for(let id in this.pockets) {
      let pocket = this.pockets[id];
      if(pocket.name == currentPocketName) {
        pocket.addresses = addresses;
      }
    }
    this.shouldEmitPocketsReady(message.id);
  }

  handleValidate = (message) => {
    if(message.result[0] != "invalid") {
      this.emit("validAddress", message.result[0]);
      return;
    }
    this.emit("invalidAddress");
  }

  handleStealth = (message) => {
    let stealthAddress = message.result[0];
    let currentPocketName = this.pendingRequests[message.id].params[0];
    for(let id in this.pockets) {
      let pocket = this.pockets[id];
      if(pocket.name == currentPocketName) {
        pocket.stealthAddress = stealthAddress;
      }
    }
    this.shouldEmitPocketsReady(message.id);
  }

  handleHistory = (message) => {
    let history = message.result;
    let currentPocketName = this.pendingRequests[message.id].params[0];
    for(let id in this.pockets) {
      let pocket = this.pockets[id];
      if(pocket.name == currentPocketName) {
        pocket.history = history;
        if(typeof pocket.history == 'undefined') {
          pocket.history = [];
        }
      }
    }

    this.shouldEmitPocketsReady(message.id);
  }

  handleSendCoins = (message) => {
    this.emit("daemonMessageDelete", "sendingCoins");
  }

  handleBackup = (message) => {
    // best function in here
    alert("Backup: \n\n" + message.result.join(" "));
  }

  /*************/
  /*  DW calls */
  /*  Accounts */
  /*************/
  dwCreateAccount(accountName, accountPassword, useTestNet){
    this.sendMessage({
      "command":"dw_create_account",
      "id": this.generateTransactionId(),
      "params": [accountName, accountPassword, useTestNet]});
  }

  /* Restore wallet from Seed */
  dwRestoreAccount(accountName, brainwallet, accountPassword, useTestNet) {
    this.sendMessage({
      "command":"dw_restore_account",
      "id": this.generateTransactionId(),
      "params": [accountName, brainwallet, accountPassword, useTestNet],
    });
  }

  dwSetAccount(accountName, accountPassword){
    this.sendMessage({
      "command": "dw_set_account",
      "id": this.generateTransactionId(),
      "params" : [accountName, accountPassword]
    });
  }

  dwGetAccounts(){
    this.sendMessage({
      "command":"dw_list_accounts",
      "id": this.generateTransactionId(),
      "params": []
    });
  }

  dwDeleteAccount(accountName){
    this.sendMessage({
      "command": "dw_delete_account",
      "id": this.generateTransactionId(),
      "params": [accountName],
    });
  }

  /* Pockets */
  dwCreatePocket(pocket){
    this.sendMessage({
      "command": "dw_create_pocket",
      "id": this.generateTransactionId(),
      "params": [pocket],
    });
  }

  dwGetPockets(){
    this.sendMessage({
      "command": "dw_list_pockets",
      "id": this.generateTransactionId(),
      "params": []
    });
  }

  dwGetPocketBalance(pocket) {
    this.sendMessage({
      "command": "dw_balance",
      "id": this.generateTransactionId(),
      "params": [pocket]
    });
  }

  dwGetPocketAddresses(pocket){
    this.sendMessage({
      "command": "dw_receive",
      "id": this.generateTransactionId(),
      "params": [pocket],
    });
  }

  dwValidateAddress(address){
    this.sendMessage({
      "command": "dw_validate_address",
      "id": this.generateTransactionId(),
      "params": [address],
    });
  }

  dwGetPocketStealthAddress(pocket) {
    this.sendMessage({
      "command": "dw_stealth",
      "id": this.generateTransactionId(),
      "params": [pocket],
    });
  }

  dwGetPocketHistory(pocket) {
    this.sendMessage({
      "command": "dw_history",
      "id": this.generateTransactionId(),
      "params": [pocket],
    })
  }
  dwDeletePocket(pocket){}

  /* Send Bitcoin */
  dwSend(address, amount, pocket, fee){
    this.sendMessage({
      "command": "dw_send",
      "id": this.generateTransactionId(),
      "params": [[[address , parseInt(amount)]], pocket, parseInt(fee)],
    });
  }

  /* Get Backup Seed */
  dwSeed(){
    this.sendMessage({
      "command": "dw_seed",
      "id": this.generateTransactionId(),
      "params": [],
    });
  }
}
