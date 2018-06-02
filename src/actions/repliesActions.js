import steemAPI from '../utils/steem';
import haprampAPI from '../utils/haprampAPI';
import {authRequired} from '../utils/decorators';

export const actionTypes = {
	REPLIES_LOAD_INIT: 'REPLIES.LOAD.INIT',
	REPLIES_LOAD_DONE: 'REPLIES.LOAD.DONE',
	REPLIES_LOAD_ERROR: 'REPLIES.LOAD.ERROR',
	ADD_REPLY_INIT: 'REPLIES.ADD.INIT',
	ADD_REPLY_DONE: 'REPLIES.ADD.DONE',
	ADD_REPLY_ERROR: 'REPLIES.ADD.ERROR',
};

export const loadReplies = (parentAuthor, parentPermlink) => dispatch => {
	dispatch({type: actionTypes.REPLIES_LOAD_INIT, parentAuthor, parentPermlink});
	getSteemReplies(parentAuthor, parentPermlink, dispatch);
}

export const addReply = authRequired((parentAuthor, parentPermlink, body) => dispatch => {
	dispatch({type: actionTypes.ADD_REPLY_INIT, parentAuthor, parentPermlink, body});
	return steemAPI.createReply(parentAuthor, parentPermlink, body)
		.then(result => {
			dispatch({type: actionTypes.ADD_REPLY_DONE, parentAuthor, parentPermlink, body, result});
			getSteemReplies(parentAuthor, parentPermlink, dispatch);
			haprampAPI.v2.post.confirmComment(`${parentAuthor}/${parentPermlink}`);
			return result;
		})
		.catch(reason => dispatch({type: actionTypes.ADD_REPLY_ERROR, parentAuthor, parentPermlink, body, reason: reason.toString()}));
})

const getSteemReplies = (parentAuthor, parentPermlink, dispatch) => {
	return steemAPI.getReplies(parentAuthor, parentPermlink)
		.then(results => {
			dispatch({type: actionTypes.REPLIES_LOAD_DONE, parentAuthor, parentPermlink, results});
			return results;
		}).catch(reason => {
			dispatch({type: actionTypes.REPLIES_LOAD_ERROR, parentAuthor, parentPermlink, reason});
			return reason;
		});
};
