import { SET_STEALTH_ADDRESS } from '../actions/stealthAddress';

const initialState = {
  stealthAddress: "",
};

export default (state = initialState, action) => {

  switch(action.type) {

    case SET_STEALTH_ADDRESS:
      return {
        ...state,
        stealthAddress: action.stealthAddress,
      }

    default:
      return state;
  }
}
