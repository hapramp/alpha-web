import haprampAPI from '../utils/haprampAPI';
import { actionTypes as allPostsActionTypes } from './allPostsActions';

export const actionTypes = {
  FEED_LOADING: 'FEED.LOAD.INIT',
  FEED_LOADED: 'FEED.LOAD.DONE',
  FEED_LOADING_FAILED: 'FEED.LOAD.FAILED',
};

export const loadFeedsForUser = username => (dispatch) => {
  dispatch({ type: actionTypes.FEED_LOADING });
  return haprampAPI.v2.feed.getUserFeed(username)
    .then((result) => {
      dispatch({ type: allPostsActionTypes.ADD_POSTS, posts: result.posts });
      dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType: 'user',
        username,
      });
    })
    .catch(reason => dispatch({ type: actionTypes.FEED_LOADING_FAILED, reason }));
};

export const loadFeedsByHot = tag => (dispatch) => {
  dispatch({ type: actionTypes.FEED_LOADING });
  return haprampAPI.v2.feed.getFeedsByHot(tag)
    .then((result) => {
      dispatch({ type: allPostsActionTypes.ADD_POSTS, posts: result.posts });
      dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType: 'hot',
        tag,
      });
    })
    .catch(reason => dispatch({ type: actionTypes.FEED_LOADING_FAILED, reason }));
};

export const loadFeedsByTrending = tag => (dispatch) => {
  dispatch({ type: actionTypes.FEED_LOADING });
  return haprampAPI.v2.feed.getFeedsByTrending(tag)
    .then((result) => {
      dispatch({ type: allPostsActionTypes.ADD_POSTS, posts: result.posts });
      dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType: 'trending',
        tag,
      });
    })
    .catch(reason => dispatch({ type: actionTypes.FEED_LOADING_FAILED, reason }));
};

export const loadFeedsByCreated = tag => (dispatch) => {
  dispatch({ type: actionTypes.FEED_LOADING });
  return haprampAPI.v2.feed.getFeedsByCreated(tag)
    .then((result) => {
      dispatch({
        type: allPostsActionTypes.ADD_POSTS,
        posts: result.posts,
      });
      dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType: 'created',
        tag,
      });
    })
    .catch(reason => dispatch({ type: actionTypes.FEED_LOADING_FAILED, reason }));
};
