export const actionTypes = {
	CHANGE_COMMUNITY: 'POST.CREATE.COMMUNITY.CHANGE',
};

export const changeCommunity = community => dispatch => dispatch({type: actionTypes.CHANGE_COMMUNITY, community});
