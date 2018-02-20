import {sha256} from "../utils/crypto";
import constants from '../utils/constants';
import haprampAPI from '../utils/haprampAPI';
import steemAPI from '../utils/steem';
import {setLocalUser} from "../utils/localStoreUtils";

export const actionTypes = {
	LOGIN_INIT: 'LOGIN.INIT',
	LOGIN_CHECK: 'LOGIN.CHECK',
	LOGIN_DONE: 'LOGIN.DONE',
	LOGIN_UNAUTHORIZED: 'LOGIN.UNAUTHORIZED',
	SIGNUP_INIT: 'LOGIN.SIGNUP.INIT',
	SIGNUP_POST_COMMENT_INIT: 'LOGIN.SIGNUP.COMMENT.INIT',
	SIGNUP_POST_COMMENT_DONE: 'LOGIN.SIGNUP.CONNENT.DONE',
	SIGNUP_POST_COMMENT_ERROR: 'LOGIN.SIGNUP.COMMENT.ERROR'
};

export const login = (username, postingKey) => {
	return dispatch => {
		dispatch({type: actionTypes.LOGIN_INIT, message: constants.MESSAGES.AUTH.HASHING_POSTING_KEY});
		const ppkHash = sha256(postingKey);
		dispatch({type: actionTypes.LOGIN_CHECK, message: constants.MESSAGES.AUTH.USER_CHECK});
		haprampAPI.v2.login(username, ppkHash)
			.then(json => {
				steemAPI.getUserAccount(username).then(result => setLocalUser(result));
				dispatch({type: actionTypes.LOGIN_DONE, username, postingKey, ppkHash});
			})
			.catch(e => {
				if (e.reason === constants.MESSAGES.AUTH.INVALID_CREDENTIALS) {
					dispatch({type: actionTypes.LOGIN_UNAUTHORIZED, reason: e.reason})
				} else {
					// New user
					dispatch({type: actionTypes.SIGNUP_INIT, message: constants.MESSAGES.AUTH.SIGNUP_INIT});
					haprampAPI.v2.signup(username)
						.then(token => {
							dispatch({
								type: actionTypes.SIGNUP_POST_COMMENT_INIT,
								message: constants.MESSAGES.AUTH.SIGNUP_COMMENT_INIT
							});
							steemAPI.comment(postingKey, 'the-dragon', 'say-hello-to-hapramp', username, token, [])
								.then(result => {
									dispatch({
										type: actionTypes.SIGNUP_POST_COMMENT_DONE,
										message: constants.MESSAGES.AUTH.SIGNUP_COMMENT_DONE
									});
									console.log(result);
									haprampAPI.v2.signupDone(username, ppkHash)
										.then(json => {
											steemAPI.getUserAccount(username).then(result => setLocalUser(result));
											steemAPI.deleteComment(postingKey, username, result.comment.permlink);
											dispatch({type: actionTypes.LOGIN_DONE, username, postingKey, ppkHash});
										})
										.catch(e => dispatch({type: actionTypes.LOGIN_UNAUTHORIZED, reason: e.reason}))
								})
								.catch(e => {
									console.log('Error creating comment: ', e);
									dispatch({
										type: actionTypes.SIGNUP_POST_COMMENT_ERROR,
										message: constants.MESSAGES.AUTH.SIGNUP_COMMENT_ERROR
									});
								})
						})
				}
			})
	}
};

export const fakeLogin = data => {
	return dispatch => dispatch({
		type: actionTypes.LOGIN_DONE, username: data.username,
		postingKey: data.postingKey, ppkHash: data.ppkHash
	});
};
