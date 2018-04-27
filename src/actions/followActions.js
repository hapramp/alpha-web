import SteemAPI from '../utils/steem';

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
};

export const getFollowers = (username, count = 10000) => dispatch => {
	dispatch({type: actionTypes.FOLLOWER_LOAD_INIT, username, count});
	SteemAPI.getFollowers(username, count)
		.then(results => {
			dispatch({type: actionTypes.FOLLOWER_LOAD_DONE, username, count, results});
		})
		.catch(reason => {
			dispatch({type: actionTypes.FOLLOWER_LOAD_ERROR, username, count, reason});
		})
};

export const getFollowing = (username, count = 10000) => dispatch => {
	dispatch({type: actionTypes.FOLLOWING_LOAD_INIT, username, count});
	SteemAPI.getFollowing(username, count)
		.then(results => {
			dispatch({type: actionTypes.FOLLOWING_LOAD_DONE, username, count, results});
		})
		.catch(reason => {
			dispatch({type: actionTypes.FOLLOWING_LOAD_ERROR, username, count, reason});
		})
};

export const follow = username => dispatch => {
	dispatch({type: actionTypes.FOLLOW_INIT, username});
	SteemAPI.follow(username)
		.then(result => {
			dispatch({type: actionTypes.FOLLOW_DONE, username});
		})
		.catch(reason => {
			dispatch({type: actionTypes.FOLLOW_ERROR, username});
		})
}
