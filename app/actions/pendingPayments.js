import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_PENDING_PAYMENTS = 'SET_PENDING_PAYMENTS';

export function setPendingPayments(pendingPayments) {
  let newPendingPayments = [];
  newPendingPayments = update(newPendingPayments, {$set: pendingPayments});
  return {
    type: SET_PENDING_PAYMENTS,
    pendingPayments: newPendingPayments,
  }
}
