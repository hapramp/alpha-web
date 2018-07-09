import Cookies from 'js-cookie';

import steemAPI from '../utils/steem';
import { actionTypes as allUserActionTypes } from './allUserActions';
import { authRequired } from '../utils/decorators';

export const actionTypes = {
  ADD_POSTS: 'ALL_POSTS.ADD',
  DELETE_POSTS: 'ALL_POSTS.DELETE',
  VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
  VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
  VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const addPosts = posts => dispatch => dispatch({ type: actionTypes.ADD_POSTS, posts });

export const deletePosts = posts => dispatch => dispatch({ type: actionTypes.DELETE_POSTS, posts });

export const ratePost = (author, permlink, vote) => authRequired((dispatch) => {
  console.log(author, permlink, vote, dispatch);
  dispatch({
    type: actionTypes.VOTE_POST_INIT, author, permlink, vote,
  });
  return steemAPI.sc2Operations.vote(Cookies.get('username'), author, permlink, vote * 20)
    .then(() => {
      dispatch({ type: actionTypes.VOTE_POST_DONE, author, permlink });
    }).catch((reason) => {
      dispatch({
        type: actionTypes.VOTE_POST_ERROR, reason: reason.toString(), author, permlink,
      });
    });
});

export const loadPost = (username, permlink) => dispatch => steemAPI.loadPost('hapramp', username, permlink)
  .then((result) => {
    dispatch({ type: actionTypes.ADD_POSTS, posts: result.posts });
    dispatch({ type: allUserActionTypes.LOAD_USERS_DONE, results: result.users });
  });
