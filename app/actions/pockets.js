import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';
import { setIdentities, setCurrentBalance } from './identities';
import { setAddresses } from './addresses';
import { setHistory } from './history';

export const SET_POCKETS = 'SET_POCKETS';
export const CREATE_POCKET = 'CREATE_POCKET';
export const SET_CURRENT_POCKET = 'SET_CURRENT_POCKET';

export function handleNewPockets(pockets) {
  return (dispatch, getState) => {
    let newPockets = []
    newPockets = update(newPockets, {$set: pockets});

    let newIdentities = [];
    newIdentities = update(newIdentities, {$set: getState().identities.identities.slice()});

    let newBalance = getState().identities.currentBalance;
    let currentIdentity = getState().identities.currentIdentity;

    for (let i in newIdentities) {
      if(newIdentities[i].name == currentIdentity) {
        console.log(currentIdentity);
        newIdentities[i].balance = 0;
        for(let j in newPockets) {
          if(newPockets[j].balance >= 0){
            newIdentities[i].balance += newPockets[j].balance;
          }
        }
        newBalance = newIdentities[i].balance;
      }
    }
    console.log(newPockets);
    dispatch(setPockets(newPockets)); //Update the current pockets
    dispatch(handleSetCurrentPocket(newPockets[0].name)); //Set the default Pocket as the first
    dispatch(setIdentities(newIdentities)); //Update Identities with new balance info
    dispatch(setCurrentBalance(newBalance)); //Update currentBalance
  }
}

export function setPockets(pockets) {
  let newPockets = [];
  newPockets = update(newPockets, {$set: pockets.slice()});

  for(let i in newPockets) {
    newPockets[i] = update(newPockets[i], {$set: pockets[i]});
    newPockets[i].addresses = update(newPockets[i].addresses, {$set: pockets[i].addresses.slice()});
  }
  return {
    type: SET_POCKETS,
    pockets: newPockets,
  }
}

export function handleSetCurrentPocket(pocketName) {
  return (dispatch, getState) => {
    console.log(pocketName);
    let pockets = getState().pockets.pockets.slice();
    let newAddresses = [];
    let newHistory = [];
    for(let i in pockets) {
      if(pockets[i].name == pocketName) {
        newAddresses = update(newAddresses, {$set: pockets[i].addresses});
        newHistory = update(newHistory, {$set: pockets[i].history});
      }
    }
    dispatch(setCurrentPocket(pocketName));
    dispatch(setAddresses(newAddresses));
    dispatch(setHistory(newHistory));
  }
}

export function setCurrentPocket(pocketName) {
  return {
    type: SET_CURRENT_POCKET,
    pocketName,
  }
}

