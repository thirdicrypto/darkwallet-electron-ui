import ReduxThunk from 'redux-thunk';
import update from 'immutability-helper';

export const SET_APP_MESSAGES = 'SET_APP_MESSAGES';

export function createAppMessage(message) {
  console.log(message);
  return (dispatch, getState) => {
    let newAppMessages = [];
    newAppMessages = update(newAppMessages, {$set: getState().app.appMessages.slice()});
    for(let i in newAppMessages) {
      console.log(newAppMessages)
      console.log(message)
      if (newAppMessages[i].name == message.name){
        //we already have this message
        return;
      }
    }
    newAppMessages.push(message);
    dispatch(setAppMessages(newAppMessages));
  }
}

export function deleteAppMessage(messageName) {
  return (dispatch, getState) => {
    let newAppMessages = [];
    newAppMessages = update(newAppMessages, {$set: getState().app.appMessages.slice()});

    for(let i in newAppMessages) {
      if(newAppMessages[i].name == messageName) {
        newAppMessages.splice(i,1);
      }
    }

    dispatch(setAppMessages(newAppMessages));
  }
}

export function setAppMessages(newAppMessages) {
    return {
      type: SET_APP_MESSAGES,
      appMessages: newAppMessages,
    }
}
