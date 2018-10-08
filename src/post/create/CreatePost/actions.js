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

// TODO: More improvements
const enhancePost = post => post.split('\n').join('<br />'); // Replace all

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

/**
 * Returns all the tags applicable.
 *
 * - Community tags (hapramp-*)
 * - Manual tags
 * - Strippe community tags (XYZ from hapramp-XYZ)
 *
 * @param {array} communities Communities included for the post
 * @param {array} hashtags Hashtags entered by the user
 * @param {array} allCommunities All the communities available
 */
export const getAllTags = (communities, hashtags, allCommunities) => {
  const findCommunity = id => allCommunities.filter(i => i.id === id)[0].tag;
  const findCommunityStripTag = id => findCommunity(id).replace('hapramp-', '');

  return _.uniq([
    'hapramp', // hapramp is the first tag
    ...communities.map(findCommunity), // all the communities (hapramp-*)
    ...hashtags, // hashtags entered by user
    ...communities.map(findCommunityStripTag), // extract tags from communities
  ]);
};

export const createPost = post => (dispatch, getState, { steemAPI }) => {
  const enhancedPost = enhancePost(post);

  const { hashtags, community } = getState().createPost;
  const { communities } = getState().communities;

  const tags = getAllTags(community, hashtags, communities);
  const author = getState().authUser.username;

  dispatch({ type: actionTypes.POST_CREATE_INIT });

  if (community.length === 0) {
    return dispatch({ type: actionTypes.CREATE_ERROR, reason: 'Please select atleast one community' });
  }

  // TODO: Generate a better permlink
  const permlink = `${new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}-post`;

  const fullPermlink = `${author}/${permlink}`;
  return steemAPI.sc2Operations.createPost(author, enhancedPost, tags, post, permlink)
    .then(() => dispatch({ type: actionTypes.POST_CREATED, fullPermlink }))
    .catch((e) => {
      console.error('Steem error', e);
      return dispatch({ type: actionTypes.CREATE_ERROR, message: e, element: 'top' });
    });
};

export const resetPostCreate = () => ({ type: actionTypes.POST_CREATE_RESET });
