import getStore from '../utils/storeUtils';
import haprampAPI from "../utils/haprampAPI";
import Steem from "../utils/steem";

export const actionTypes = {
	CHANGE_COMMUNITY: 'POST.CREATE.COMMUNITY.CHANGE',
	CHANGE_MEDIA: 'POST.CREATE.MEDIA.CHANGE',
	REMOVE_MEDIA: 'POST.CREATE.MEDIA.REMOVE',
	CREATE_ERROR: 'POST.CREATE.ERROR.NEW',
	CLEAR_ERROR: 'POST.CREATE.ERROR.CLEAR',
	SET_HASHTAGS: 'POST.CREATE.HASHTAGS.SET',
	POST_CREATED: 'POST.CREATE.DONE',
	POST_CREATE_FAILED: 'POST.CREATE.FAILED',
};

export const changeCommunity = community => dispatch => dispatch({type: actionTypes.CHANGE_COMMUNITY, community});

export const changeMedia = file => dispatch => dispatch({type: actionTypes.CHANGE_MEDIA, file});

export const removeMedia = () => dispatch => dispatch({type: actionTypes.REMOVE_MEDIA});

export const postCreateError = err => dispatch => dispatch({
	type: actionTypes.CREATE_ERROR, element: err.element,
	message: err.message
});

export const clearError = () => dispatch => dispatch({type: actionTypes.CLEAR_ERROR});

export const setHashtags = hashtags => dispatch => dispatch({type: actionTypes.SET_HASHTAGS, hashtags});

export const createPost = data => dispatch => {
	let {tags, post, community} = data;
	let author = getStore().getState().authUser.username;
	let permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase() + '-post';

	let full_permlink = author + '/' + permlink;
	let wif = localStorage.getItem('posting_key');
	haprampAPI.v2.post.prepare(post, full_permlink)
		.then(body => {
			Steem.createPost(wif, author, body, tags, post, permlink, community)
				.then(response => {
					console.log(response);
					haprampAPI.v2.post.confirm(full_permlink)
						.then(response => dispatch({type: actionTypes.POST_CREATED}))
						.catch(e => dispatch({type: actionTypes.POST_CREATE_FAILED, reason: e}))
				})
				.catch(e => {
					console.log(e);
					dispatch({type: actionTypes.POST_CREATE_FAILED, reason: e});
				})
		})
		.catch(e => {
			console.log(e);
			dispatch({type: actionTypes.POST_CREATE_FAILED, reason: e})
		})
};
