export const actionTypes = {
	TOGGLE_CONTENT_TYPE: 'ADD_CONTENT_BUTTON.TOGGLE',
	RESET_CONTENT_TYPE: 'ADD_CONTENT_BUTTON.RESET',
};

export const toggleClicked = () => {
	return dispatch => dispatch({type: actionTypes.TOGGLE_CONTENT_TYPE});
};

export const resetClicked = () => dispatch => dispatch({type:  actionTypes.RESET_CONTENT_TYPE});
