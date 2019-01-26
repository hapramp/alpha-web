import { showSignIn } from '../../onboard/actions';

export const actionTypes = {
  ADD_POSTS: 'ALL_POSTS.ADD',
  DELETE_POSTS: 'ALL_POSTS.DELETE',
  VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
  VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
  VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const ratePost = (author, permlink, vote) => (dispatch, getState, { steemAPI, notify }) => {
  const { username } = getState().authUser;
  if (!username) {
    notify.danger('Please log in first!');
    return dispatch(showSignIn());
  }
  dispatch({
    type: actionTypes.VOTE_POST_INIT, author, permlink, vote,
  });
  return steemAPI.sc2Operations.vote(username, author, permlink, vote * 20)
    .then(() => {
      dispatch({ type: actionTypes.VOTE_POST_DONE, author, permlink });
    }).catch((reason) => {
      dispatch({
        type: actionTypes.VOTE_POST_ERROR, reason: reason.toString(), author, permlink,
      });
    });
};
