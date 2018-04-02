import SteemAPI from '../utils/steem';
import haprampAPI from "../utils/haprampAPI";
import {actionTypes as allUserActionTypes} from './allUserActions';

export const actionTypes = {
	LOAD_USER_INFO: 'USER_PROFILE.LOAD.INIT',
	LOADED_USER_INFO: 'USER_PROFILE.LOAD.DONE',
	LOAD_USER_INFO_FAILED: 'USER_PROFILE.LOAD.FAILED',
	RESET_USER_INFO: 'USER_PROFILE.RESET',
	FOLLOW_COUNT_DONE: 'USER_PROFILE.FOLLOW.COUNT.DONE',
	FOLLOW_COUNT_FAILED: 'USER_PROFILE.FOLLOW.COUNT.FAILED',
	USER_BLOG_LOADING: 'USER_PROFILE.BLOG.LOAD.INIT',
	USER_BLOG_LOADED: 'USER_PROFILE.BLOG.LOAD.DONE',
	USER_BLOG_LOAD_FAILED: 'USER_PROFILE.BLOG.LOAD.FAILED',
};

export const loadUserProfileInfo = username => dispatch => {
	dispatch({type: actionTypes.LOAD_USER_INFO, username});
	SteemAPI.getUserAccount(username)
		.then(result => {
			dispatch({type: actionTypes.LOADED_USER_INFO, username, result});
			dispatch({type: allUserActionTypes.LOAD_USERS_DONE, results: [result]})
		})
		.catch(e => dispatch({type: actionTypes.LOAD_USER_INFO_FAILED, username, reason: e}))
};

export const resetUserProfileInfo = () => dispatch => dispatch({type: actionTypes.RESET_USER_INFO});

export const getFollowCount = username => dispatch => {
	SteemAPI.getFollowCount(username)
		.then(result => dispatch({type: actionTypes.FOLLOW_COUNT_DONE, result}))
		.catch(reason => dispatch({type: actionTypes.FOLLOW_COUNT_FAILED, reason}))
};

export const getUserFeeds = username => dispatch => {
	dispatch({type: actionTypes.USER_BLOG_LOADING, username});
	haprampAPI.v2.feed.getFeedsByBlog(username)
		.then(results => {
			dispatch({type: actionTypes.USER_BLOG_LOADED, results, username});
			dispatch({type: allUserActionTypes.ADD_POSTS, posts: results});
		})
		.catch(reason => dispatch({type: actionTypes.USER_BLOG_LOAD_FAILED, reason}));
};
