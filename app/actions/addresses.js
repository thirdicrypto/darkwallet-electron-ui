import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_ADDRESSES = 'SET_ADDRESSES';

export function setAddresses(addresses) {
  let newAddresses = [];
  newAddresses = update(newAddresses, {$set: addresses});
  return {
    type: SET_ADDRESSES,
    addresses: newAddresses,
  }
}
