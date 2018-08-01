import _ from 'lodash';

export const actionTypes = {
  CHANGE_COMMUNITY: 'POST.CREATE.COMMUNITY.CHANGE',
  CHANGE_MEDIA: 'POST.CREATE.MEDIA.CHANGE',
  REMOVE_MEDIA: 'POST.CREATE.MEDIA.REMOVE',
  CREATE_ERROR: 'POST.CREATE.ERROR.NEW',
  CLEAR_ERROR: 'POST.CREATE.ERROR.CLEAR',
  SET_HASHTAGS: 'POST.CREATE.HASHTAGS.SET',
  POST_CREATED: 'POST.CREATE.DONE',
  POST_CREATE_RESET: 'POST.CREATE.RESET',
  POST_CREATE_INIT: 'POST.CREATE.INIT',
};

export const changeCommunity = community => ({ type: actionTypes.CHANGE_COMMUNITY, community });

export const changeMedia = (content, type) => ({
  type: actionTypes.CHANGE_MEDIA, content, mediaType: type,
});

export const removeMedia = () => ({ type: actionTypes.REMOVE_MEDIA });

export const postCreateError = err => ({
  type: actionTypes.CREATE_ERROR,
  element: err.element,
  message: err.message,
});

export const clearError = () => ({ type: actionTypes.CLEAR_ERROR });

export const setHashtags = hashtags => ({ type: actionTypes.SET_HASHTAGS, hashtags });

export const createPost = oldData => (dispatch, getState, { haprampAPI, steemAPI }) => {
  // Deep copy
  const data = _.cloneDeep(oldData);
  const { tags, post, community } = data;

  dispatch({ type: actionTypes.POST_CREATE_INIT });

  const author = getState().authUser.username;
  // TODO: Generate a better permlink
  const permlink = `${new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}-post`;

  const fullPermlink = `${author}/${permlink}`;
  return haprampAPI.v2.post.prepare(post, fullPermlink)
    .then(body => steemAPI.sc2Operations.createPost(author, body, tags, post, permlink, community)
      .then(() => dispatch({ type: actionTypes.POST_CREATED, fullPermlink }))
      .catch((e) => {
        console.error('Steem error', e);
        return dispatch({ type: actionTypes.CREATE_ERROR, message: e, element: 'top' });
      }))
    .catch((e) => {
      console.error('Hapramp API Error', e);
      return dispatch({ type: actionTypes.CREATE_ERROR, message: e, element: 'top' });
    });
};

export const resetPostCreate = () => ({ type: actionTypes.POST_CREATE_RESET });
