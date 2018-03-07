import haprampAPI from '../utils/haprampAPI';

export const actionTypes = {
	LOADING_COMMUNITIES: 'COMMUNITIES.LOAD.INIT',
	LOADED_COMMUNITIES: 'COMMUNITIES.LOAD.DONE',
	LOADING_COMMUNITIES_FAILED: 'COMMUNITIES.LOAD.FAILED'
};

export const loadCommunities = () => dispatch => {
	dispatch({type: actionTypes.LOADING_COMMUNITIES});
	haprampAPI.v2.communities.getAllCommunities()
		.then(result => dispatch({type: actionTypes.LOADED_COMMUNITIES, result}))
		.catch(reason => dispatch({type: actionTypes.LOADING_COMMUNITIES_FAILED, reason}));
};
