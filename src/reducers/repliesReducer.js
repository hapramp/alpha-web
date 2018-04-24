import _ from 'lodash';

import {actionTypes} from '../actions/repliesActions';

const initialState = {};
/*
{
	fullPermlink: {
		error: null,
		loading: false,
		replies: {
			replyFullPermlink: {...},
			...
		},
		pendingReplies: [
			{
				author: ...,
				body: ...,
			}
		]
	},
	...
}
*/

export const repliesReducer = (state = initialState, action) => {
	let key = `${action.parentAuthor}/${action.parentPermlink}`;

	state = _.cloneDeep(state);

	if (key === 'undefined/undefined') {  // TODO: Find out why
		return state;
	}

	// Make sure key exists
	!state[key] && (state[key] = {
		error: null,
		loading: false,
		replies: {},
		pendingReplies: [],
	});

	let postReplies = state[key];

	switch (action.type) {
		case actionTypes.REPLIES_LOAD_INIT:
			postReplies.error = null;
			postReplies.loading = true;
			state[key] = postReplies;
			return state;

		case actionTypes.REPLIES_LOAD_DONE:
			postReplies.error = null;
			postReplies.loading = false;
			action.results.forEach(reply => {
				let innerKey = `${reply.author}/${reply.permlink}`;
				postReplies.replies[innerKey] = reply;
			});
			postReplies.pendingReplies = [];
			state[key] = postReplies;
			return state;

		case actionTypes.REPLIES_LOAD_ERROR:
			postReplies.error = action.reason;
			postReplies.loading = false;
			state[key] = postReplies;
			return state;

		// TODO: Handle cases for creating reply
		case actionTypes.ADD_REPLY_INIT:
			postReplies.pendingReplies.push({author: localStorage.getItem('username'), body: action.body});
			state[key] = postReplies;
			return state;

		case actionTypes.ADD_REPLY_ERROR:
			postReplies.pendingReplies = [];
			state[key] = postReplies;
			return state;

		default:
			return state;
	}
}
