'use strict';

import WebSocket from 'ws';
import EventEmitter from 'events';

export default class DaemonInterface extends EventEmitter {

  constructor() {
    super();
    console.log("DaemonInterface constructor start");
    this.daemonAddress = "localhost";
    this.daemonPort = 8888;
    this.wsOpen = false;
    this.useTestNet = true;
    this.pollingInterval = null;
    this.identities = []; // looks like this: [currentIdentity, [list, of, identities]]
    this.pockets = []; //Only remember the pockets of the current identity.
    this.previousPockets = ""; //For comparing when doing polling. It is a JSON.stringify'd version of pockets.
    this.pendingRequests = []; //Requests sent to the daemon to be handled on message

    this.startDaemon(this.address, this.port);

  }

  /* ***************** */
  /* Utility functions */
  /* ***************** */

  startDaemon = (address, port) => {
    //TODO if darkwallet-daemon.py is down need to start it

    // give it a second...

    window.setTimeout(() => {
      this.ws = new WebSocket('ws://'+ address + ':' + port);
      this.initSocket();
    }, 1000);
  }

  initSocket = () => {
    this.ws.on("open", this.wsHandleOpen);
    this.ws.on('message', this.wsHandleMessage);
    this.ws.on('error', this.wsHandleError);
    this.ws.on('close', this.wsHandleClose);

    window.clearInterval(this.pollingInterval);
    this.pollingInterval = window.setInterval(this.pollDaemon, 5000);

    console.log("DaemonInterface socket init complete");
  }

  /* ************************ */
  /* Websocket Event Handlers */
  /* (More utility fns below) */
  /* ************************ */

  wsHandleOpen = () => {
    this.deleteAppMessage("daemonDisconnected");
    this.wsOpen = true;
    this.dwGetAccounts();
  }

  wsHandleMessage = (data, flags) => {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    let message = JSON.parse(data);
    this.handleDaemonMessage(message);
    delete this.pendingRequests[message.id]; //Remove the request from the pending array
  }

  wsHandleError = (error) => {
    error = error.toString();
    console.log(error);
    if(error.indexOf('ECONNREFUSED') >= 0 || error.indexOf('socket hang up') >= 0) {
      this.wsHandleClose();
      this.startDaemon(this.daemonAddress, this.daemonPort);
    }
  }

  wsHandleClose = () => {
    this.sendAppMessage("daemonDisconnected", "info", "Reconnecting...");
    console.log('Daemon Connection Closed');
    this.ws.removeListener("open", this.wsHandleOpen);
    this.ws.removeListener('message', this.wsHandleMessage);
    this.ws.removeListener('error', this.wsHandleError);
    this.ws.removeListener('close', this.wsHandleClose);
    delete this.ws;
    this.wsOpen = false;
  }

  pollDaemon = () => {
    console.log("Polling Daemon");
    if(this.identities === [] || this.pockets === []) {
      return; //Wait for initial load before polling
    }
    if(this.wsOpen) {
      this.dwGetPockets();
    } else {
      this.startDaemon(this.daemonAddress, this.daemonPort);
    }
  }

  sendMessage = (message) => { //Sends a message to the daemon
    if(this.wsOpen){
      this.pendingRequests[message.id] = (message);
      try {
        this.ws.send(JSON.stringify(message), (error) => {
          if(!error) {
            return
          }

          error = error.toString();
          console.log("Error sending message: " + error);
          if(error.indexOf("not opened") >= 0) {
            this.wsOpen = false;
            this.startDaemon(this.daemonAddress, this.daemonPort);
          }
        });
      } catch(e) {
        //TODO: Maybe this never runs because of the error handler above. Consider removing it.
        console.log("Uncaught error sending message: " + e.name);
        if(e.name == "Error") {
          this.sendAppMessage("daemonDisconnected", "error", "Disconnected (try ctrl+r)");
          this.deleteAppMessage("loggingIn");
        }
      }
    } else {
      this.startDaemon(this.daemonAddress, this.daemonPort);
    }
  };

  shouldEmitPocketsReady = (messageId) => {
    for(let id in this.pendingRequests) {
      let request = this.pendingRequests[id];
      if(request.id != messageId && (
          request.command == "dw_receive" ||
          request.command == "dw_balance" ||
          request.command == "dw_history" ||
          request.command == "dw_stealth" ||
          request.command == "dw_pending_payments")
        ) {
        return; //There are other pending pocket requests Don't emit an event.
      }
    }

    if(this.previousPockets === JSON.stringify(this.pockets)) {
        return; //There were no changes to the pockets since the last request.
    }

    //This was the last pocket-related query request and there was a change. Emit a ready event.
    console.log("New Daemon Data!");
    this.emit("pocketsListReady", this.pockets);
  }

  generateTransactionId = () => { //Used for transaction IDs
    return parseInt(Math.random() * 4294967295);
  }

  sendAppMessage = (name, type, text) => {
    this.emit("appMessage", { name, type, text });
  }

  deleteAppMessage = (name) => {
    this.emit("appMessageDelete", name);
  }

  /* ************** */
  /* Public Methods */
  /* ************** */

  startLogin = (accountName, password) => {
      this.deleteAppMessage("wrongPassword");
      this.sendAppMessage("loggingIn", "info", "Logging In...");
      this.dwSetAccount(accountName, password);
  };

  createIdentity = (identityName, password, useTestNet) => {
    this.deleteAppMessage("passwordMismatch");
    this.sendAppMessage("creatingIdentity", "info", "Creating Identity...");
    this.dwCreateAccount(identityName, password, useTestNet);
  }

  restoreIdentity = (identityName, password, brainwallet, useTestNet) => {
    this.sendAppMessage("restoringIdentity", "info", "Restoring Identity...");
    this.dwRestoreAccount(identityName, password, brainwallet, useTestNet);
  }

  deleteIdentity = (identityName) => {
    this.dwDeleteAccount(identityName);
  }

  createPocket = (pocketName) => {
    this.sendAppMessage("creatingPocket", "info", "Creating Pocket...");
    this.dwCreatePocket(pocketName);
  }

  validateAddress = (address) => {
    this.dwValidateAddress(address);
  }

  sendCoins = (address, amount, pocket, fee) => {
    this.deleteAppMessage("notEnoughFunds");
    this.sendAppMessage("sendingCoins", "info", "Sending Coins...");
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
        this.deleteAppMessage("loggingIn");
        this.sendAppMessage("wrongPassword", "error", "Wrong password!");
      }
      if(message.error == "invalid_brainwallet"){
        this.deleteAppMessage("restoringIdentity");
        this.sendAppMessage("invalidBrainwallet", "error", "Invalid Brainwallet!");
      }
      if(message.error == "passwords do not match"){
        this.deleteAppMessage("creatingIdentity");
        this.sendAppMessage("passwordMismatch", "error", "Passwords do not match!");
      }
      if(message.error == "not_enough_funds"){
        this.deleteAppMessage("sendingCoins");
        this.sendAppMessage("notEnoughFunds", "error", "Not Enough Funds");
      }
      if(message.error == "channel_timeout") {
        this.sendAppMessage("channelTimeout", "error", "Error connecting to server.");
      }
      return;
    }

    if(typeof this.pendingRequests[message.id] == "undefined" || this.pendingRequests[message.id].command == "undefined") {
      console.log("Error handling message " + message.id);
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
      case "dw_pending_payments" : this.handlePendingPayments(message);
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
    });
    this.identities.currentIdentity = accounts[0];
    this.dwGetPockets();
    this.emit("identitiesListReady", this.identities);
  };

  handleCreateAccount = (message) => {
    this.deleteAppMessage("creatingIdentity");
    this.dwGetAccounts();
  };

  handleRestoreAccount = (message) => {
    this.deleteAppMessage("restoringIdentity");
    this.dwGetAccounts();
  };

  handleSetAccount = (message) => {
    this.deleteAppMessage("loggingIn");
    delete this.pockets;
    this.identities.currentIdentity = this.pendingRequests[message.id].params[0];
    this.dwGetPockets();
    this.emit("currentAccountReady", this.identities.currentIdentity);
  };

  handleDeleteAccount = (message) => {
    this.dwGetAccounts();
  };

  handleListPockets = (message) => {
    var pocketList = message.result[0]
    delete this.pockets;
    this.pockets = [];

    if(pocketList.length <= 0) {
      console.log("Empty Pocket List from Daemon");
      return;
    }

    for(let i = 0; i < pocketList.length; i++) {
      this.dwGetPocketBalance(pocketList[i]);
      this.dwGetPocketAddresses(pocketList[i]);
      this.dwGetPocketHistory(pocketList[i]);
      this.dwGetPocketStealthAddress(pocketList[i]);
      this.dwGetPocketPendingPayments(pocketList[i]);
      if(typeof this.pockets[i] === "undefined") {
        this.pockets[i] = {
          name: pocketList[i],
          balance: -1,
          addresses: [],
        }
      }
    }
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
    this.deleteAppMessage("creatingPocket");
    this.dwGetPockets();
  };

  handleReceive = (message) => {
    let addresses = message.result[0];
    let currentPocketName = this.pendingRequests[message.id].params[0];
    for(let id in this.pockets) {
      let pocket = this.pockets[id];
      if(pocket.name == currentPocketName) {
        pocket.addresses = addresses;
        if(typeof pocket.addresses == 'undefined') {
          pocket.addresses = [];
        }
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
    this.deleteAppMessage("sendingCoins");
    this.emit("sendCoinsComplete");
  }

  handlePendingPayments = (message) => {
    let pendingPayments = message.result;
    let currentPocketName = this.pendingRequests[message.id].params[0];
    for(let id in this.pockets) {
      let pocket = this.pockets[id];
      if(pocket.name == currentPocketName) {
        pocket.pendingPayments = pendingPayments;
        if(typeof pocket.pendingPayments == 'undefined') {
          pocket.pendingPayments = [];
        }
      }
    }
    this.shouldEmitPocketsReady(message.id);
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
      "params": [accountName, accountPassword, useTestNet]
    });
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
    this.previousPockets = JSON.stringify(this.pockets);
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
    });
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

  dwGetPocketPendingPayments(pocket) {
    this.sendMessage({
      "command": "dw_pending_payments",
      "id": this.generateTransactionId(),
      "params": [pocket],
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
