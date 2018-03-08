import haprampAPI from '../utils/haprampAPI';

export const actionTypes = {
	FEED_LOADING: 'FEED.LOAD.INIT',
	FEED_LOADED: 'FEED.LOAD.DONE',
	FEED_LOADING_FAILED: 'FEED.LOAD.FAILED',
};

export const loadFeedsForUser = username => dispatch => {
	dispatch({type: actionTypes.FEED_LOADING});
	haprampAPI.v2.feed.getUserFeed(username)
		.then(results => dispatch({type: actionTypes.FEED_LOADED, results, feedType: 'user', username}))
		.catch(reason => dispatch({type: actionTypes.FEED_LOADING_FAILED, reason}))
};
