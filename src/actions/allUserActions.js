import SteemAPI from '../utils/steem';
import HaprampAPI from '../utils/haprampAPI';

export const actionTypes = {
  LOAD_USERS_INIT: 'ALL_USERS.STEEM.LOAD.INIT',
  LOAD_USERS_DONE: 'ALL_USERS.STEEM.LOAD.DONE',
  LOAD_USERS_ERROR: 'ALL_USERS.STEEM.LOAD.ERROR',
  LOAD_HAPRAMP_USER_INIT: 'ALL_USERS.HAPRAMP.LOAD.INIT',
  LOAD_HAPRAMP_USER_DONE: 'ALL_USERS.HAPRAMP.LOAD.DONE',
  LOAD_HAPRAMP_USER_ERROR: 'ALL_USERS.HAPRAMP.LOAD.ERROR',
};

export const loadUserAccounts = usernames => (dispatch) => {
  dispatch({ type: actionTypes.LOAD_USERS_INIT, usernames });
  return SteemAPI.getUserAccounts(usernames)
    .then(results => dispatch({ type: actionTypes.LOAD_USERS_DONE, results }))
    .catch(error => dispatch({ type: actionTypes.LOAD_USERS_ERROR, reason: error }));
};

export const loadHaprampUserDetails = username => (dispatch) => {
  dispatch({ type: actionTypes.LOAD_HAPRAMP_USER_INIT, username });
  return HaprampAPI.v2.users.getUserDetailsByUsername(username)
    .then(result => dispatch({ type: actionTypes.LOAD_HAPRAMP_USER_DONE, result }))
    .catch(reason => dispatch({ type: actionTypes.LOAD_HAPRAMP_USER_ERROR, reason }));
};
