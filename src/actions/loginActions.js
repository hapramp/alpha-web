import Cookie from 'js-cookie';

import steemAPI from '../utils/steem';
import { getLocalUser, setLocalUser } from '../utils/localStoreUtils';

export const actionTypes = {
  LOGIN_INIT: 'LOGIN.INIT',
  LOGIN_CHECK: 'LOGIN.CHECK',
  LOGIN_DONE: 'LOGIN.DONE',
  LOGIN_UNAUTHORIZED: 'LOGIN.UNAUTHORIZED',
  SIGNUP_INIT: 'LOGIN.SIGNUP.INIT',
  SIGNUP_POST_COMMENT_INIT: 'LOGIN.SIGNUP.COMMENT.INIT',
  SIGNUP_POST_COMMENT_DONE: 'LOGIN.SIGNUP.CONNENT.DONE',
  SIGNUP_POST_COMMENT_ERROR: 'LOGIN.SIGNUP.COMMENT.ERROR',
  SET_AUTH_USER: 'LOGIN.DONE.USER.SET',
  LOG_OUT_INIT: 'LOGIN.LOGOUT.DONE.INIT',
  LOG_OUT_DONE: 'LOGIN.LOGOUT.DONE.DONE',
};

const updateUser = (data, dispatch) => {
  dispatch({
    type: actionTypes.SET_AUTH_USER,
    username: data.username,
    name: data.name,
    avatar: data.avatar,
    location: data.location,
    website: data.website,
    cover: data.cover,
  });
};

const setAuthUser = (result, dispatch) => {
  setLocalUser(result);
  const data = getLocalUser();
  updateUser(data, dispatch);
};

export const fakeLogin = () => (dispatch) => {
  const username = Cookie.get('username');
  dispatch({
    type: actionTypes.LOGIN_DONE, username,
  });
  // Update profile changes
  return steemAPI.getUserAccount(username).then(result => setAuthUser(result, dispatch));
};

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.LOG_OUT_INIT });
  Cookie.remove('username');
  Cookie.remove('access_token');
  return steemAPI.sc2Api.revokeToken()
    .finally(() => dispatch({ type: actionTypes.LOG_OUT_DONE }));
};
