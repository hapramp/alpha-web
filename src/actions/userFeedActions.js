import { addPosts } from '../post/actions';

export const actionTypes = {
  FEED_LOADING: 'FEED.LOAD.INIT',
  FEED_LOADED: 'FEED.LOAD.DONE',
  FEED_LOADING_FAILED: 'FEED.LOAD.FAILED',
};

export const loadFeedsForUser = username => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.FEED_LOADING, feedType: 'user' });
  return haprampAPI.v2.feed.getUserFeed(username)
    .then((result) => {
      dispatch(addPosts(result.posts));
      return dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType: 'user',
        username,
      });
    })
    .catch(reason => dispatch({
      type: actionTypes.FEED_LOADING_FAILED,
      reason,
      feedType: 'user',
    }));
};

export const loadFeedsForTag = tag => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.FEED_LOADING, feedType: tag });
  return haprampAPI.v2.feed.getTagFeed(tag)
    .then((result) => {
      dispatch(addPosts(result));
      return dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.map(post => `${post.author}/${post.permlink}`),
        feedType: tag,
      });
    })
    .catch(reason => dispatch({
      type: actionTypes.FEED_LOADING_FAILED,
      reason,
      feedType: tag,
    }));
};

export const loadNewPosts = () => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.FEED_LOADING, feedType: 'new' });
  return steemAPI.steem.api.getDiscussionsByCreated(
    { tag: 'hapramp', limit: '25' },
    (error, result) => {
      if (error) {
        return dispatch({ type: actionTypes.FEED_LOADING_FAILED, feedType: 'new', reason: error });
      }
      dispatch(addPosts(result));
      return dispatch({
        type: actionTypes.FEED_LOADED,
        feedType: 'new',
        results: result.map(post => `${post.author}/${post.permlink}`),
      });
    },
  );
};

export const loadExplorePosts = () => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.FEED_LOADING, feedType: 'explore' });
  return haprampAPI.v2.feed.getExploreFeed()
    .then((results) => {
      dispatch(addPosts(results));
      return dispatch({
        type: actionTypes.FEED_LOADED,
        results: results.filter(post => !!post.author).map(post => `${post.author}/${post.permlink}`),
        feedType: 'explore',
      });
    })
    .catch((reason) => {
      console.log('[FEED EXPLORE ERROR]', reason);
      return dispatch({ type: actionTypes.FEED_LOADING_FAILED, feedType: 'explore', reason });
    });
};
