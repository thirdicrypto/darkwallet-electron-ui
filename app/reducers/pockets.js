import { SET_POCKETS, SET_CURRENT_POCKET, SET_POCKET_ADDRESSES } from '../actions/pockets';

const initialState = {
  pockets: [],
  currentPocket: "",
};

export default (state = initialState, action) => {

  switch(action.type) {

    case SET_CURRENT_POCKET:
      return {
        ...state,
        currentPocket: action.pocketName,
      }

    case SET_POCKETS:
      return {
        ...state,
        pockets: action.pockets,
      }

    default:
      return state;
  }
}
