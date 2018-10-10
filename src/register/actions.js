import { setUserRegistered } from '../actions/loginActions';

export const actionTypes = {
  start: '@REGISTER/START',
  done: '@REGISTER/DONE',
  error: '@REGISTER/ERROR',
};

export const register = communities => (dispatch, getState, { haprampAPI, notify }) => {
  dispatch({
    type: actionTypes.start,
    communities,
  });
  return haprampAPI.v2.users.updateCommunities(communities)
    .then(() => {
      notify.success('Communities updated!');
      dispatch(setUserRegistered(true));
      return dispatch({
        type: actionTypes.done,
        communities,
      });
    })
    .catch((error) => {
      const reason = error.toString ? error.toString() : error;
      notify.error(reason);
      return dispatch({
        type: actionTypes.error,
        reason,
      });
    });
};
