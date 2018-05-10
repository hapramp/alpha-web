import steemAPI from '../utils/steem';
import haprampAPI from '../utils/haprampAPI';
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

export const ratePost = (author, permlink, vote) => dispatch => {
	dispatch({type: actionTypes.VOTE_POST_INIT, author, permlink, vote});
	steemAPI.vote(localStorage.getItem('username'), author, permlink, vote * 20)
		.then(response => {
			dispatch({type: actionTypes.VOTE_POST_DONE, author, permlink});
			haprampAPI.v2.post.confirm(vote, `${author}/${permlink}`);
		}).catch(reason => {
			dispatch({type: actionTypes.VOTE_POST_ERROR, reason: reason.toString(), author, permlink})
		});
}

export const loadPost = (username, permlink) => dispatch => {
	steemAPI.loadPost('hapramp', username, permlink)
		.then(result => {
			dispatch({type: actionTypes.ADD_POSTS, posts: result.posts});
			dispatch({type: allUserActionTypes.LOAD_USERS_DONE, results: result.users});
		})
}
