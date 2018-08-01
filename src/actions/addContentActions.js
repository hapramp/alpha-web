export const actionTypes = {
  TOGGLE_CONTENT_TYPE: 'ADD_CONTENT_BUTTON.TOGGLE',
  RESET_CONTENT_TYPE: 'ADD_CONTENT_BUTTON.RESET',
};

export const toggleClicked = () => ({ type: actionTypes.TOGGLE_CONTENT_TYPE });

export const resetClicked = () => ({ type: actionTypes.RESET_CONTENT_TYPE });
