import {actionTypes} from '../actions/allPostsReducer';
import _ from 'lodash';

const initialState = {posts: {}};

export const allPostsReducer = (state = initialState, action) => {
	let posts, current_vote;

	switch (action.type) {
		case actionTypes.ADD_POSTS:
			posts = _.cloneDeep(state.posts);
			action.posts.map(post => posts[post.author + '/' + post.permlink] = post);
			return {...state, posts};

		case actionTypes.VOTE_POST_INIT:
			posts = _.cloneDeep(state.posts);
			current_vote = posts[action.permlink].hapramp_cu_vote;
			if (action.vote === 0) {  // Remove vote
				posts[action.permlink].hapramp_cu_vote = null;
				current_vote && posts[action.permlink].net_votes--;
				current_vote && (posts[action.permlink].hapramp_rating = (posts[action.permlink].hapramp_rating * posts[action.permlink].hapramp_votes - current_vote)
					/ (posts[action.permlink].hapramp_votes - 1));
				current_vote && posts[action.permlink].hapramp_votes--;
			} else {
				posts[action.permlink].hapramp_cu_vote = action.vote;
				posts[action.permlink].net_votes++;
				posts[action.permlink].hapramp_rating = (posts[action.permlink].hapramp_rating * posts[action.permlink].hapramp_votes + action.vote)
					/ (posts[action.permlink].hapramp_votes + 1);
					posts[action.permlink].hapramp_votes++;
			}
			return {...state, posts};

		default:
			return state;
	}
}
