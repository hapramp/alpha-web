import { addPosts } from '../post/actions';

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
