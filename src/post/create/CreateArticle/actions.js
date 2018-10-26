export const actionTypes = {
  SET_CONTENT: 'CREATE_ARTICLE.CONTENT.SET',
  SET_TITLE: 'CREATE_ARTICLE.TITLE.SET',
  CHANGE_COMMUNITY: 'CREATE_ARTICLE.COMMUNITIES.CHANGE',
  ADD_TAG: 'CREATE_ARTICLE.TAGS.ADD',
  REMOVE_TAG: 'CREATE_ARTICLE.TAGS.REMOVE',
};

export const setContent = content => ({ type: actionTypes.SET_CONTENT, content });

export const setTitle = title => ({ type: actionTypes.SET_TITLE, title });

export const uploadImage = image => (dispatch, getState, { haprampAPI }) =>
  haprampAPI.v2.uploadImage(image);

export const changeCommunity = community => ({
  type: actionTypes.CHANGE_COMMUNITY,
  community,
});

export const addTag = tag => ({
  type: actionTypes.ADD_TAG,
  tag,
});

export const removeTag = tag => ({
  type: actionTypes.REMOVE_TAG,
  tag,
});
