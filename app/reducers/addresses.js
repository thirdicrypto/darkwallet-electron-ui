import { SET_ADDRESSES } from '../actions/addresses';

const initialState = {
  addresses:[],
  currentAddress: "",
};

export default (state = initialState, action) => {

  switch(action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.addresses,
      }

    default:
      return state;
  }
}
