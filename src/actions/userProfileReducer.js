import SteemAPI from '../utils/steem';

export const actionTypes = {
	LOAD_USER_INFO: 'USER_PROFILE.LOAD.INIT',
	LOADED_USER_INFO: 'USER_PROFILE.LOAD.DONE',
	LOAD_USER_INFO_FAILED: 'USER_PROFILE.LOAD.FAILED',
	RESET_USER_INFO: 'USER_PROFILE.RESET'
};

export const loadUserProfileInfo = username => dispatch => {
	dispatch({type: actionTypes.LOAD_USER_INFO, username});
	SteemAPI.getUserAccount(username)
		.then(result => dispatch({type: actionTypes.LOADED_USER_INFO, username, result}))
		.catch(e => dispatch({type: actionTypes.LOAD_USER_INFO_FAILED, username, reason: e}))
};

export const resetUserProfileInfo = () => dispatch => dispatch({type: actionTypes.RESET_USER_INFO});
