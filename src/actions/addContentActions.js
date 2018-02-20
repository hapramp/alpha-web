export const actionTypes = {
	TOGGLE_CONTENT_TYPE: 'ADD_CONTENT_BUTTON.TOGGLE'
};

export const toggleClicked = () => {
	return dispatch => dispatch({type: actionTypes.TOGGLE_CONTENT_TYPE});
};
