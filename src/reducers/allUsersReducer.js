import _ from 'lodash';

import {actionTypes} from "../actions/allUserActions";

const initialState = {users: {}};

export const allUserReducer = (state = initialState, action) => {
	let users;
	switch (action.type) {
		case actionTypes.LOAD_USERS_DONE:
			users = _.clone(state.users);
			action.results.forEach(userDetail => users[userDetail.name] = userDetail);
			return {...state, users};
		default:
			return state;
	}
};
