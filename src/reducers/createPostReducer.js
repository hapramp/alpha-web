import _ from 'lodash';

import {actionTypes} from "../actions/createPostActions";

const initialState = {community: {active: null}, media: null, errors: [], hashtags: [],
	created: false, fullPermlink: null, creating: false};

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
			let message = action.message;

			// Check for too frequent post error
			if (action.message.data && action.message.data.stack && action.message.data.stack[0]) {
				let index = action.message.data.stack[0].format.indexOf('auth.last_root_post');
				console.log(index);
				if (index > -1) {
					message = 'You need to wait for 5 minutes before creating the next post.';
				}
			}
			errors.push({element: action.element, message});

			// Remove redundancy
			errors = _.uniqBy(errors, i => [i.element, i.message].join());

			return {...state, errors, creating: false};

		case actionTypes.CLEAR_ERROR:
			return {...state, errors: []};

		case actionTypes.SET_HASHTAGS:
			return {...state, hashtags: _.uniqBy(action.hashtags, i => i)};

		case actionTypes.POST_CREATED:
			return {...state, created: true, fullPermlink: action.fullPermlink, creating: false};

		case actionTypes.POST_CREATE_RESET:
			return _.clone(initialState);

		case actionTypes.POST_CREATE_INIT:
			return {...state, creating: true};

		default:
			return state;
	}
};
