import { SET_HISTORY } from '../actions/history';

const initialState = {
  history:[],
};

export default (state = initialState, action) => {

  switch(action.type) {

    case SET_HISTORY:
      return {
        ...state,
        history: action.history,
      }

    default:
      return state;
  }
}
