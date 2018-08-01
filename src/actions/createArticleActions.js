export const actionTypes = {
  SET_CONTENT: 'CREATE_ARTICLE.CONTENT.SET',
  SET_TITLE: 'CREATE_ARTICLE.TITLE.SET',
};

export const setContent = content => ({ type: actionTypes.SET_CONTENT, content });

export const setTitle = title => ({ type: actionTypes.SET_TITLE, title });
