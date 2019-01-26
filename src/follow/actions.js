import { showSignIn } from '../onboard/actions';
import { getAuthUsername } from '../reducers/authUserReducer';

export const actionTypes = {
  FOLLOWER_LOAD_INIT: 'FOLLOW.FOLLOWER.LOAD.INIT',
  FOLLOWER_LOAD_DONE: 'FOLLOW.FOLLOWER.LOAD.DONE',
  FOLLOWER_LOAD_ERROR: 'FOLLOW.FOLLOWER.LOAD.ERROR',
  FOLLOWING_LOAD_INIT: 'FOLLOW.FOLLOWING.LOAD.INIT',
  FOLLOWING_LOAD_DONE: 'FOLLOW.FOLLOWING.LOAD.DONE',
  FOLLOWING_LOAD_ERROR: 'FOLLOW.FOLLOWING.LOAD.ERROR',
  FOLLOW_INIT: 'FOLLOW.FOLLOW.INIT',
  FOLLOW_DONE: 'FOLLOW.FOLLOW.DONE',
  FOLLOW_ERROR: 'FOLLOW.FOLLOW.ERROR',
  UNFOLLOW_INIT: 'FOLLOW.UNFOLLOW.INIT',
  UNFOLLOW_DONE: 'FOLLOW.UNFOLLOW.DONE',
  UNFOLLOW_ERROR: 'FOLLOW.UNFOLLOW.ERROR',
};

export const getFollowers = (username, count = 1000) => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.FOLLOWER_LOAD_INIT, username, count });
  return steemAPI.getFollowers(username, count)
    .then(results => dispatch({
      type: actionTypes.FOLLOWER_LOAD_DONE, username, count, results,
    }))
    .catch(reason => dispatch({
      type: actionTypes.FOLLOWER_LOAD_ERROR, username, count, reason,
    }));
};

export const getFollowing = (username, count = 1000) => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.FOLLOWING_LOAD_INIT, username, count });
  return steemAPI.getFollowing(username, count)
    .then(results => dispatch({
      type: actionTypes.FOLLOWING_LOAD_DONE, username, count, results,
    }))
    .catch(reason => dispatch({
      type: actionTypes.FOLLOWING_LOAD_ERROR, username, count, reason,
    }));
};

// TODO: Refresh followers/following of relevant users after follow/unfollow

export const follow = username => (dispatch, getState, { steemAPI, notify }) => {
  const currentUser = getAuthUsername(getState());
  if (!currentUser) {
    notify.danger('Please login first!');
    return dispatch(showSignIn());
  }

  dispatch({ type: actionTypes.FOLLOW_INIT, following: username, follower: currentUser });
  return steemAPI.sc2Operations.follow(currentUser, username)
    .then(() => dispatch({
      type: actionTypes.FOLLOW_DONE,
      following: username,
      follower: currentUser,
    }))
    .catch(reason => dispatch({
      type: actionTypes.FOLLOW_ERROR,
      following: username,
      reason,
      follower: currentUser,
    }));
};

export const unfollow = username => (dispatch, getState, { steemAPI, notify }) => {
  const currentUser = getAuthUsername(getState());
  if (!currentUser) {
    notify.danger('Please log in first!');
    return dispatch(showSignIn());
  }

  dispatch({ type: actionTypes.UNFOLLOW_INIT, following: username, follower: currentUser });
  return steemAPI.sc2Operations.follow(localStorage.getItem('username'), username, true)
    .then(() => dispatch({
      type: actionTypes.UNFOLLOW_DONE,
      following: username,
      follower: currentUser,
    }))
    .catch(reason => dispatch({
      type: actionTypes.UNFOLLOW_ERROR,
      following: username,
      reason,
      follower: currentUser,
    }));
};
