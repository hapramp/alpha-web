import HaprampAPI from '../utils/haprampAPI';
import steemAPI from '../utils/steem';
import {actionTypes as allUserActionTypes} from './allUserActions';

export const actionTypes = {
	ADD_POSTS: 'ALL_POSTS.ADD',
	DELETE_POSTS: 'ALL_POSTS.DELETE',
	VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
	VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
	VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const addPosts = posts => dispatch => dispatch({type: actionTypes.ADD_POSTS, posts});

export const deletePosts = posts => dispatch => dispatch({type: actionTypes.DELETE_POSTS, posts});

export const ratePost = (author, permlink, currentVote, vote) => dispatch => {
	dispatch({type: actionTypes.VOTE_POST_INIT, author, permlink, vote});
	HaprampAPI.v2.post.rate(author + '/' + permlink, vote)
		.then(response => {
			steemAPI.vote(localStorage.getItem('username'), author, permlink, vote * 20)
				.then(response => dispatch({type: actionTypes.VOTE_POST_DONE, author, permlink}))
				.catch(reason => {console.log(reason); dispatch({type: actionTypes.VOTE_POST_ERROR, reason, author, permlink})});
		})
		.catch(reason => dispatch({type: actionTypes.VOTE_POST_ERROR, author, permlink, reason}));
}

export const loadPost = fullPermlink => dispatch => {
	steemAPI.loadPost('hapramp-test', fullPermlink)
		.then(result => {
			dispatch({type: actionTypes.ADD_POSTS, posts: [result.post]});
			dispatch({type: allUserActionTypes.LOAD_USERS_DONE, results: [result.user]});
		})
}
