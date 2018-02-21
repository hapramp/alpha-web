export const actionTypes = {
	CHANGE_COMMUNITY: 'POST.CREATE.COMMUNITY.CHANGE',
	CHANGE_MEDIA: 'POST.CREATE.MEDIA.CHANGE',
	REMOVE_MEDIA: 'POST.CREATE.MEDIA.REMOVE',
};

export const changeCommunity = community => dispatch => dispatch({type: actionTypes.CHANGE_COMMUNITY, community});

export const changeMedia = file => dispatch => dispatch({type: actionTypes.CHANGE_MEDIA, file});

export const removeMedia = () => dispatch => dispatch({type: actionTypes.REMOVE_MEDIA});
