import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_IDENTITIES = 'SET_IDENTITIES';
export const CREATE_IDENTITY = 'CREATE_IDENTITY';
export const SET_CURRENT_IDENTITY = 'SET_CURRENT_IDENTITY';
export const START_LOGIN = 'START_LOGIN';
export const SET_CURRENT_BALANCE = 'SET_CURRENT_BALANCE';

export function setIdentities(identities) {
  let newIdentities = []
  newIdentities = update(newIdentities, {$set: identities.slice()});
  return {
    type: SET_IDENTITIES,
    identities: newIdentities,
  }
}

export function startLogin() {
  return {
    type: START_LOGIN,
  }
}

export function setCurrentIdentity(identity) {
  return {
    type: SET_CURRENT_IDENTITY,
    currentIdentity: identity,
  }
}


export function setCurrentBalance(currentBalance) {
  return {
    type: SET_CURRENT_BALANCE,
    currentBalance,
  }
}
