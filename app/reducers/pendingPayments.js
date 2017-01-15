import { SET_PENDING_PAYMENTS } from '../actions/pendingPayments';

const initialState = {
  pendingPayments:[],
};

export default (state = initialState, action) => {

  switch(action.type) {

    case SET_PENDING_PAYMENTS:
      return {
        ...state,
        pendingPayments: action.pendingPayments,
      }

    default:
      return state;
  }
}
