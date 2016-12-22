import { SET_APP_MESSAGES } from '../actions/app';
import DaemonInterface from '../DaemonInterface';

const initialState = {
  appMessages:[],
  dwDaemon: new DaemonInterface(),
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_APP_MESSAGES:
      return {...state,
        appMessages: action.appMessages,
      };

    default:
      return {...state};
  }
}
