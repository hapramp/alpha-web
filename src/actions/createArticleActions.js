export const actionTypes = {
  SET_CONTENT: 'CREATE_ARTICLE.CONTENT.SET',
  SET_TITLE: 'CREATE_ARTICLE.TITLE.SET',
};

export const setContent = content => dispatch =>
  dispatch({ type: actionTypes.SET_CONTENT, content });

export const setTitle = title => dispatch => dispatch({ type: actionTypes.SET_TITLE, title });
