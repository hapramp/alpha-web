import {actionTypes} from "../actions/createPostActions";

const initialState = {community: {active: null}, media: null};

export const createPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_COMMUNITY:
			return {...state, community: {active: action.community}};
		default:
			return state;
	}
};
