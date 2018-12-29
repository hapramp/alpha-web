import { addPosts } from '../post/actions';
import { getLastPost, isLoading } from '../reducers/userFeedReducer';

const PAGINATION_SIZE = 30;

export const actionTypes = {
  FEED_LOADING: 'FEED.LOAD.INIT',
  FEED_LOADED: 'FEED.LOAD.DONE',
  FEED_LOADING_FAILED: 'FEED.LOAD.FAILED',
};

export const loadFeedsForUser = username => (dispatch, getState, { haprampAPI }) => {
  const state = getState();
  const feedType = 'user';

  if (isLoading(state, feedType)) {
    return Promise.resolve();
  }

  const [startAuthor, startPermlink] = getLastPost(state, feedType);

  dispatch({ type: actionTypes.FEED_LOADING, feedType });
  return haprampAPI.v2.feed.getUserFeed(username, PAGINATION_SIZE, startAuthor, startPermlink)
    .then((result) => {
      dispatch(addPosts(result.posts));
      return dispatch({
        type: actionTypes.FEED_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        feedType,
        lastAuthor: result.last_author,
        lastPermlink: result.last_permlink,
        username,
      });
    })
    .catch(reason => dispatch({
      type: actionTypes.FEED_LOADING_FAILED,
      reason,
      feedType,
      username,
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
    { tag: 'hapramp', limit: '50' },
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
