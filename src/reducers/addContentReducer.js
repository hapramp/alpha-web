import _ from 'lodash';

import {actionTypes} from "../actions/addContentActions";

const initialState = {isClicked: false};

export const addContentReducer = (state = initialState, action) => {
	let newState = _.clone(state);
	switch (action.type) {
		case actionTypes.TOGGLE_CONTENT_TYPE:
			newState.isClicked = !newState.isClicked;
			return newState;
		default:
			return state;
	}
};
