import SteemAPI from '../utils/steem';
import {authRequired} from '../utils/decorators';

export const actionTypes = {
	FOLLOWER_LOAD_INIT: 'FOLLOW.FOLLOWER.LOAD.INIT',
	FOLLOWER_LOAD_DONE: 'FOLLOW.FOLLOWER.LOAD.DONE',
	FOLLOWER_LOAD_ERROR: 'FOLLOW.FOLLOWER.LOAD.ERROR',
	FOLLOWING_LOAD_INIT: 'FOLLOW.FOLLOWING.LOAD.INIT',
	FOLLOWING_LOAD_DONE: 'FOLLOW.FOLLOWING.LOAD.DONE',
	FOLLOWING_LOAD_ERROR: 'FOLLOW.FOLLOWING.LOAD.ERROR',
	FOLLOW_INIT: 'FOLLOW.FOLLOW.INIT',
	FOLLOW_DONE: 'FOLLOW.FOLLOW.DONE',
	FOLLOW_ERROR: 'FOLLOW.FOLLOW.ERROR',
	UNFOLLOW_INIT: 'FOLLOW.UNFOLLOW.INIT',
	UNFOLLOW_DONE: 'FOLLOW.UNFOLLOW.DONE',
	UNFOLLOW_ERROR: 'FOLLOW.UNFOLLOW.ERROR',
};

export const getFollowers = (username, count = 1000) => dispatch => {
	dispatch({type: actionTypes.FOLLOWER_LOAD_INIT, username, count});
	return SteemAPI.getFollowers(username, count)
		.then(results => {
			dispatch({type: actionTypes.FOLLOWER_LOAD_DONE, username, count, results});
		})
		.catch(reason => {
			console.log(reason);
			dispatch({type: actionTypes.FOLLOWER_LOAD_ERROR, username, count, reason});
		})
};

export const getFollowing = (username, count = 1000) => dispatch => {
	dispatch({type: actionTypes.FOLLOWING_LOAD_INIT, username, count});
	return SteemAPI.getFollowing(username, count)
		.then(results => {
			dispatch({type: actionTypes.FOLLOWING_LOAD_DONE, username, count, results});
		})
		.catch(reason => {
			console.log(reason);
			dispatch({type: actionTypes.FOLLOWING_LOAD_ERROR, username, count, reason});
		})
};

// TODO: Refresh followers/following of relevant users after follow/unfollow

export const follow = authRequired(username => dispatch => {
	dispatch({type: actionTypes.FOLLOW_INIT, username});
	return SteemAPI.sc2Operations.follow(localStorage.getItem('username'), username)
		.then(result => {
			dispatch({type: actionTypes.FOLLOW_DONE, username});
		})
		.catch(reason => {
			dispatch({type: actionTypes.FOLLOW_ERROR, username});
		})
});

export const unfollow = authRequired(username => dispatch => {
	dispatch({type: actionTypes.UNFOLLOW_INIT, username});
	return SteemAPI.sc2Operations.follow(localStorage.getItem('username'), username, true)
		.then(result => {
			dispatch({type: actionTypes.UNFOLLOW_DONE, username});
		})
		.catch(reason => {
			dispatch({type: actionTypes.UNFOLLOW_ERROR, username});
		})
});
