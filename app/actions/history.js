import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_HISTORY = 'SET_HISTORY';

export function setHistory(history) {
  let newHistory = [];
  newHistory = update(newHistory, {$set: history});
  return {
    type: SET_HISTORY,
    history: newHistory,
  }
}
