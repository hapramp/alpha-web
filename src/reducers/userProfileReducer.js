import {actionTypes} from "../actions/userProfileReducer";

const initialState = {loading: false, user: null, error: null, follower: {}, following: {}};

export const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_USER_INFO:
			// TODO: Serve from cache while loading
			return {...state, loading: true, user: null};

		case actionTypes.LOADED_USER_INFO:
			return {...state, loading: false, user: action.result};

		case actionTypes.LOAD_USER_INFO_FAILED:
			return {...state, loading: false, error: action.reason};

		case actionTypes.RESET_USER_INFO:
			return initialState;

		default:
			return state;
	}
};
