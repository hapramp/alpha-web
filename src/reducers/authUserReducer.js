import {actionTypes as loginActionTypes} from "../actions/loginActions";

const initialState = {name: null, avatar: null, location: null, cover: null, website: null};

export const authUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case loginActionTypes.SET_AUTH_USER:
			return {...state, name: action.name, avatar: action.avatar,
				location: action.location, cover: action.cover, website: action.website}
		default:
			return state;
	}
};
