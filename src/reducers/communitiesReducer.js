import {actionTypes} from "../actions/communityActions";

const initialState = {loading: false, communities: [], error: null};

export const communitiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOADING_COMMUNITIES:
			return {...state, loading: true};

		case actionTypes.LOADED_COMMUNITIES:
			return {...state, communities: action.result, loading: false};

		case actionTypes.LOADING_COMMUNITIES_FAILED:
			return {...state, error: action.reason, loading: false};

		default:
			return state;
	}
};
