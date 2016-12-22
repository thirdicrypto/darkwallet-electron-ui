import { SET_IDENTITIES, SET_CURRENT_IDENTITY, SET_POCKETS, SET_CURRENT_POCKET, SET_POCKET_ADDRESSES, SET_CURRENT_BALANCE } from '../actions/identities';
//TODO: Separate Pockets into its own module ?
//TODO: Move business logic to /actions/* ?

const initialState = {
  identities: [],
  currentIdentity: "Logged Out",
  currentBalance: -1,
};

export default (state = initialState, action) => {

  switch(action.type) {
    case SET_IDENTITIES:
      return {
        ...state,
        identities: action.identities
      }

    case SET_CURRENT_IDENTITY:
      return {
        ...state,
        currentIdentity: action.currentIdentity,
      }

    case SET_CURRENT_BALANCE:
      return {
        ...state,
        currentBalance: action.currentBalance,
      }

    default:
      return state;
  }
}
