export const actionTypes = {
  SET_CONTENT: 'CREATE_ARTICLE.CONTENT.SET',
  SET_TITLE: 'CREATE_ARTICLE.TITLE.SET',
};

export const setContent = content => ({ type: actionTypes.SET_CONTENT, content });

export const setTitle = title => ({ type: actionTypes.SET_TITLE, title });

export const uploadImage = image => (dispatch, getState, { haprampAPI }) =>
  haprampAPI.v2.uploadImage(image);
