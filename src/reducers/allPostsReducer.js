import {actionTypes} from '../actions/allPostsActions';
import _ from 'lodash';

const initialState = {posts: {}};

export const allPostsReducer = (state = initialState, action) => {
	let posts, current_vote, key, currentUser;

	switch (action.type) {
		case actionTypes.ADD_POSTS:
			posts = _.cloneDeep(state.posts);
			action.posts.map(post => posts[post.author + '/' + post.permlink] = post);
			return {...state, posts};

		case actionTypes.VOTE_POST_INIT:
			posts = _.cloneDeep(state.posts);  // TODO: Reduce clone depth
			key = action.author + '/' + action.permlink;
			currentUser = localStorage.getItem('username');
			if (_.some(posts[key].active_votes, i => i.voter === currentUser)) {
				posts[key].active_votes = posts[key].active_votes.map(vote => {
					vote.voter === currentUser && (vote.percent = action.vote * 20 * 100);
					return vote;
				})
			} else {
				posts[key].active_votes.push({voter: currentUser, percent: action.vote * 20 * 100});
			}
			// current_vote = posts[key].hapramp_cu_vote;
			// if (action.vote === 0) {  // Remove vote
			// 	posts[key].hapramp_cu_vote = null;
			// 	current_vote && posts[key].net_votes--;
			// 	current_vote && (posts[key].hapramp_rating = (posts[key].hapramp_rating * posts[key].hapramp_votes - current_vote)
			// 		/ (posts[key].hapramp_votes - 1));
			// 	current_vote && posts[key].hapramp_votes--;
			// 	!posts[key].hapramp_votes && (posts[key].hapramp_rating = 0.0);  // Earlier divided by zero, prevent NaN
			// } else if (posts[key].hapramp_cu_vote == null) {  // Not voted earlier
			// 	posts[key].hapramp_cu_vote = action.vote;
			// 	posts[key].net_votes++;
			// 	posts[key].hapramp_rating = (posts[key].hapramp_rating * posts[key].hapramp_votes + action.vote)
			// 		/ (posts[key].hapramp_votes + 1);
			// 	posts[key].hapramp_votes++;
			// } else {  // Updating vote
			// 	let vote_to_deduct = posts[key].hapramp_cu_vote;
			// 	posts[key].hapramp_cu_vote = action.vote;
			// 	posts[key].hapramp_rating = (posts[key].hapramp_rating * posts[key].hapramp_votes + action.vote - vote_to_deduct)
			// 		/ (posts[key].hapramp_votes);
			// }
			return {...state, posts};

		// TODO: Handle post upvote error case

		default:
			return state;
	}
}
