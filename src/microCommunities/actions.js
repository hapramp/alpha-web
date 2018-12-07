import { addPosts } from '../post/actions';
import { update1RampUser } from '../actions/loginActions';
import { getAuthUsername } from '../reducers/authUserReducer';

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

export const getMicroCommunityPosts = (tag, order) => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.getPosts.init, tag, order });
  return haprampAPI.v2.microCommunities.getPosts(tag, order === 'new' ? 'created' : order)
    .then((result) => {
      dispatch(addPosts(result.posts));
      return dispatch({
        type: actionTypes.getPosts.done,
        posts: result.posts.map(post => `${post.author}/${post.permlink}`),
        tag,
        order,
      });
    });
};

export const joinMicroCommunity = (tag, leave = false) =>
  (dispatch, getState, { haprampAPI, notify }) => {
    dispatch({ type: actionTypes.join.init, tag });
    if (!getAuthUsername(getState())) {
      notify.danger('Please login first!');
      return dispatch({ type: actionTypes.join.error, tag });
    }
    const method = leave
      ? haprampAPI.v2.microCommunities.leave
      : haprampAPI.v2.microCommunities.join;
    return method(tag)
      .then((user) => {
        dispatch(update1RampUser(user));
        return dispatch({
          type: actionTypes.join.done,
          tag,
        });
      });
  };
