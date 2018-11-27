import { loadState } from '../actions';

export const actionTypes = {
  REPLIES_LOAD_INIT: 'REPLIES.LOAD.INIT',
  REPLIES_LOAD_DONE: 'REPLIES.LOAD.DONE',
  REPLIES_LOAD_ERROR: 'REPLIES.LOAD.ERROR',
  ADD_REPLY_INIT: 'REPLIES.ADD.INIT',
  ADD_REPLY_DONE: 'REPLIES.ADD.DONE',
  ADD_REPLY_ERROR: 'REPLIES.ADD.ERROR',
};

export const loadReplies = (parentAuthor, parentPermlink) => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.REPLIES_LOAD_INIT, parentAuthor, parentPermlink });
  return steemAPI.getReplies(parentAuthor, parentPermlink)
    .then((results) => {
      dispatch({
        type: actionTypes.REPLIES_LOAD_DONE, parentAuthor, parentPermlink, results,
      });
      return results;
    }).catch((reason) => {
      dispatch({
        type: actionTypes.REPLIES_LOAD_ERROR, parentAuthor, parentPermlink, reason,
      });
      return reason;
    });
};

export const addReply = (parentAuthor, parentPermlink, body) =>
  (dispatch, getState, { steemAPI, notify }) => {
    const { username } = getState().authUser;
    if (!username) {
      notify.danger('Please login first!');
      return Promise.reject();
    }
    dispatch({
      type: actionTypes.ADD_REPLY_INIT, parentAuthor, parentPermlink, body, username,
    });
    return steemAPI.sc2Operations.createReply(parentAuthor, parentPermlink, username, body)
      .then((result) => {
        dispatch(loadReplies(parentAuthor, parentPermlink));
        return dispatch({
          type: actionTypes.ADD_REPLY_DONE, parentAuthor, parentPermlink, body, result, username,
        });
      })
      .then(() => dispatch(loadState('hapramp', parentAuthor, parentPermlink)))
      .then(() => notify.success('Reply posted.'))
      .catch(reason => dispatch({
        type: actionTypes.ADD_REPLY_ERROR,
        parentAuthor,
        parentPermlink,
        body,
        username,
        reason: reason.toString(),
      }));
  };
