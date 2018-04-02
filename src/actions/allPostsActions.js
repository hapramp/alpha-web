import HaprampAPI from '../utils/haprampAPI';
import steemAPI from '../utils/steem';

export const actionTypes = {
	ADD_POSTS: 'ALL_POSTS.ADD',
	DELETE_POSTS: 'ALL_POSTS.DELETE',
	VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
	VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
	VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const addPosts = posts => dispatch => dispatch({type: actionTypes.ADD_POSTS, posts});

export const deletePosts = posts => dispatch => dispatch({type: actionTypes.DELETE_POSTS, posts});

export const ratePost = (author, permlink, currentVote, vote, power = 100) => dispatch => {
	dispatch({type: actionTypes.VOTE_POST_INIT, permlink, vote});
	HaprampAPI.v2.post.rate(permlink, vote)
		.then(response => {
			vote >= 3 && steemAPI.vote(localStorage.getItem('username'), author, permlink, power, currentVote)
				.then(response => dispatch({type: actionTypes.VOTE_POST_DONE, author, permlink}))
				.catch(reason => dispatch({type: actionTypes.VOTE_POST_ERROR, reason, permlink}));
		})
		.catch(reason => dispatch({type: actionTypes.VOTE_POST_ERROR, permlink, reason}));
}
