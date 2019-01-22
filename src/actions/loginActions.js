import Cookie from 'js-cookie';

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
  REGISTERED: 'LOGIN.REGISTER.REGISTERED',
  NOT_REGISTERED: 'LOGIN.REGISTER.NOT_REGISTERED',
  LOGIN_HAPRAMP_DONE: 'LOGIN.HAPRAMP.DONE',
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

export const setUserRegistered = registrationStatus => ({
  type: registrationStatus ? actionTypes.REGISTERED : actionTypes.NOT_REGISTERED,
});

export const update1RampUser = user => ({
  type: actionTypes.LOGIN_HAPRAMP_DONE,
  result: user,
});

export const check1RampRegistrationStatus = () => (dispatch, getState, { haprampAPI }) =>
  haprampAPI.v2.users.getCurrentUserDetails()
    .then(result => dispatch(update1RampUser(result)))
    .catch(() => dispatch(setUserRegistered(false)));

export const login1Ramp = () => (dispatch, getState, { haprampAPI }) => {
  if (Cookie.get('1ramp_token')) { // Token already present
    return Promise.resolve();
  }
  const username = Cookie.get('username');
  const accessToken = Cookie.get('access_token');
  return haprampAPI.v2.login(username, accessToken)
    .then(({ token }) => Cookie.set('1ramp_token', token));
};

export const fakeLogin = () => async (dispatch, getState, { steemAPI }) => {
  const username = Cookie.get('username');
  dispatch({
    type: actionTypes.LOGIN_DONE, username,
  });
  dispatch(check1RampRegistrationStatus()); // See if current user is registered
  // Update profile changes
  await dispatch(login1Ramp());
  return steemAPI.getUserAccount(username).then(result => setAuthUser(result, dispatch));
};

export const logout = () => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.LOG_OUT_INIT });
  Cookie.remove('username');
  Cookie.remove('access_token');
  Cookie.remove('1ramp_token');
  dispatch({ type: actionTypes.LOG_OUT_DONE });
  return steemAPI.sc2Api.revokeToken();
};
