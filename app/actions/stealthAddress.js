import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_STEALTH_ADDRESS = 'SET_STEALTH_ADDRESS';

export function setStealthAddress(stealthAddress) {
  return {
    type: SET_STEALTH_ADDRESS,
    stealthAddress: stealthAddress,
  }
}
