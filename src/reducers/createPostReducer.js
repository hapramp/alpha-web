import _ from 'lodash';

import {actionTypes} from "../actions/createPostActions";

const initialState = {community: {active: null}, media: null, errors: [], hashtags: [],
	created: false, fullPermlink: null};

export const createPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_COMMUNITY:
			return {...state, community: {active: action.community}};

		case actionTypes.CHANGE_MEDIA:
			return {...state, media: action.file};

		case actionTypes.REMOVE_MEDIA:
			return {...state, media: null};

		case actionTypes.CREATE_ERROR:
			let errors = state.errors.slice();
			errors.push({element: action.element, message: action.message});
			return {...state, errors};

		case actionTypes.CLEAR_ERROR:
			return {...state, errors: []};

		case actionTypes.SET_HASHTAGS:
			return {...state, hashtags: _.uniqBy(action.hashtags, i => i)};

		case actionTypes.POST_CREATED:
			return {...state, created: true, fullPermlink: action.fullPermlink};

		default:
			return state;
	}
};
