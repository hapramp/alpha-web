import _ from 'lodash';

import { actionTypes } from '../actions/loginActions';

const initialState = {
  messages: [], loggingIn: false, loggedIn: false, isRegistered: true,
};

export default (state = initialState, action) => {
  if (action.type.startsWith('LOGIN')) {
    const newState = _.clone(state);
    if (action.message) {
      newState.messages.push(action.message);
    }
    switch (action.type) {
      case actionTypes.LOGIN_INIT:
        newState.loggingIn = true;
        break;
      case actionTypes.SIGNUP_POST_COMMENT_ERROR:
      case actionTypes.LOGIN_UNAUTHORIZED:
        newState.loggingIn = false;
        newState.messages = [];
        break;
      case actionTypes.LOGIN_DONE:
        newState.loggedIn = true;
        localStorage.setItem('username', action.username);
        break;

      case actionTypes.LOG_OUT_DONE:
        newState.loggedIn = false;
        break;

      case actionTypes.REGISTERED:
        newState.isRegistered = true;
        break;

      case actionTypes.NOT_REGISTERED:
        newState.isRegistered = false;
        break;

      default:
        // No problem
    }
    return newState;
  }
  return state;
};
