import SteemAPI from '../utils/steem';

export const actionTypes = {
	LOAD_USERS_INIT: 'ALL_USERS.LOAD.INIT',
	LOAD_USERS_DONE: 'ALL_USERS.LOAD.DONE',
	LOAD_USERS_ERROR: 'ALL_USERS.LOAD.ERROR',
};

export const loadUserAccounts = usernames => dispatch => {
	dispatch({type: actionTypes.LOAD_USERS_INIT, usernames});
	SteemAPI.getUserAccounts(usernames)
		.then(results => dispatch({type: actionTypes.LOAD_USERS_DONE, results}))
		.catch(error => dispatch({type: actionTypes.LOAD_USERS_ERROR, reason: error}))
};
