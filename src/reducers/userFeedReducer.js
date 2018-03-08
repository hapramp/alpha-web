import {actionTypes} from "../actions/userFeedActions";

const initialState = {user: {}, hot: {}, trending: {}, created: {}};

export const userFeedReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FEED_LOADED:
			if (action.feedType === 'user') {
				return {...state, user: {posts: action.results}};
			}
			break;
		default:
			// No problem
	}
	return state;
};
