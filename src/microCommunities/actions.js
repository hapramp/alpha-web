import { addPosts } from '../post/actions';
import { update1RampUser } from '../actions/loginActions';
import { getAuthUsername } from '../reducers/authUserReducer';
import { isFeedLoading, getLastPost } from './reducer';

const PAGINATION_SIZE = 30;

const baseName = '@microCommunities';
export const actionTypes = {
  getAll: {
    init: `${baseName}/getAll/init`,
    done: `${baseName}/getAll/done`,
    error: `${baseName}/getAll/error`,
  },
  getPosts: {
    init: `${baseName}/getPosts/init`,
    done: `${baseName}/getPosts/done`,
    error: `${baseName}/getPosts/error`,
  },
  join: {
    init: `${baseName}/join/init`,
    done: `${baseName}/join/done`,
    error: `${baseName}/join/error`,
  },
};

/**
 * Fetches all micro-communities registered
 */
export const getAllMicroCommunities = () => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.getAll.init });
  return haprampAPI.v2.microCommunities.getAll()
    .then(results => dispatch({ type: actionTypes.getAll.done, results }))
    .catch((reason) => {
      console.error('[Micro Communities] Error loading micro communities', reason);
      return dispatch({
        type: actionTypes.getAll.error,
        reason,
      });
    });
};

/**
 * Fetches posts for a given micro-community tag and sort order
 * @param {string} tag Hashtag for the community
 * @param {string} order Sort order (any of trending, hot, created)
 */
export const getMicroCommunityPosts = (tag, _order) => (dispatch, getState, { haprampAPI }) => {
  const state = getState();
  const order = _order === 'new' ? 'created' : _order;

  if (isFeedLoading(state, tag, order)) {
    return Promise.resolve();
  }

  const [startAuthor, startPermlink] = getLastPost(state, tag, order);

  dispatch({ type: actionTypes.getPosts.init, tag, order });
  return haprampAPI.v2.microCommunities.getPosts(
    tag,
    order === 'new' ? 'created' : order,
    PAGINATION_SIZE,
    startAuthor,
    startPermlink,
  )
    .then((result) => {
      // Add all the posts to redux state
      dispatch(addPosts(result.posts));
      return dispatch({
        type: actionTypes.getPosts.done,
        // Save post reference only with concerned redux state
        posts: result.posts.map(post => `${post.author}/${post.permlink}`),
        tag,
        order,
        lastAuthor: result.last_author,
        lastPermlink: result.last_permlink,
      });
    });
};

/**
 * Join/leave a community
 * @param {string} tag Hashtag for the community
 * @param {bool} leave If true, leave the community
 */
export const joinMicroCommunity = (tag, leave = false) =>
  (dispatch, getState, { haprampAPI, notify }) => {
    dispatch({ type: actionTypes.join.init, tag });
    if (!getAuthUsername(getState())) {
      notify.danger('Please login first!');
      return dispatch({ type: actionTypes.join.error, tag });
    }
    // Decide whether to call leave or join API method
    const method = leave
      ? haprampAPI.v2.microCommunities.leave
      : haprampAPI.v2.microCommunities.join;
    return method(tag)
      .then((user) => {
        // Update the current user state with latest micro-communities
        dispatch(update1RampUser(user));
        return dispatch({
          type: actionTypes.join.done,
          tag,
        });
      });
  };
