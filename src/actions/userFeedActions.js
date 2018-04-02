import haprampAPI from '../utils/haprampAPI';
import {actionTypes as allPostsActionTypes} from './allPostsActions';

export const actionTypes = {
	FEED_LOADING: 'FEED.LOAD.INIT',
	FEED_LOADED: 'FEED.LOAD.DONE',
	FEED_LOADING_FAILED: 'FEED.LOAD.FAILED',
};

export const loadFeedsForUser = username => dispatch => {
	dispatch({type: actionTypes.FEED_LOADING});
	haprampAPI.v2.feed.getUserFeed(username)
		.then(results => {
			dispatch({type: allPostsActionTypes.ADD_POSTS, posts: results});
			dispatch({type: actionTypes.FEED_LOADED, results: results.map(post => post.author + '/' + post.permlink), feedType: 'user', username});
		})
		.catch(reason => dispatch({type: actionTypes.FEED_LOADING_FAILED, reason}))
};

export const loadFeedsByHot = tag => dispatch => {
	dispatch({type: actionTypes.FEED_LOADING});
	haprampAPI.v2.feed.getFeedsByHot(tag)
		.then(results => {
			dispatch({type: allPostsActionTypes.ADD_POSTS, posts: results});
			dispatch({type: actionTypes.FEED_LOADED, results: results.map(post => post.author + '/' + post.permlink), feedType: 'hot', tag});
		})
		.catch(reason => dispatch({type: actionTypes.FEED_LOADING_FAILED, reason}))
};

export const loadFeedsByTrending = tag => dispatch => {
	dispatch({type: actionTypes.FEED_LOADING});
	haprampAPI.v2.feed.getFeedsByTrending(tag)
		.then(results => {
			dispatch({type: allPostsActionTypes.ADD_POSTS, posts: results});
			dispatch({type: actionTypes.FEED_LOADED, results: results.map(post => post.author + '/' + post.permlink), feedType: 'trending', tag});
		})
		.catch(reason => dispatch({type: actionTypes.FEED_LOADING_FAILED, reason}))
};

export const loadFeedsByCreated = tag => dispatch => {
	dispatch({type: actionTypes.FEED_LOADING});
	haprampAPI.v2.feed.getFeedsByCreated(tag)
		.then(results => {
			dispatch({type: allPostsActionTypes.ADD_POSTS, posts: results});
			dispatch({type: actionTypes.FEED_LOADED, results: results.map(post => post.author + '/' + post.permlink), feedType: 'created', tag});
		})
		.catch(reason => dispatch({type: actionTypes.FEED_LOADING_FAILED, reason}))
};
