import {actionTypes} from "../actions/createPostActions";

const initialState = {community: {active: null}, media: null};

export const createPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_COMMUNITY:
			return {...state, community: {active: action.community}};

		case actionTypes.CHANGE_MEDIA:
			return {...state, media: action.file};

		case actionTypes.REMOVE_MEDIA:
			return {...state, media: null};

		default:
			return state;
	}
};
