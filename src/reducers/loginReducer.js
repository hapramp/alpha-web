import _ from 'lodash';

import { actionTypes } from '../actions/loginActions';

const initialState = { messages: [], loggingIn: false, loggedIn: false };

export const loginReducer = (state = initialState, action) => {
  if (action.type.startsWith('LOGIN')) {
    const newState = _.clone(state);
    action.message && newState.messages.push(action.message);
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
      default:
			// No problem
    }
    return newState;
  }
  return state;
};
