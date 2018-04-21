import _ from 'lodash';

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
	POST_CREATE_RESET: 'POST.CREATE.RESET',
	POST_CREATE_INIT: 'POST.CREATE.INIT',
};

export const changeCommunity = community => dispatch => dispatch({type: actionTypes.CHANGE_COMMUNITY, community});

export const changeMedia = (content, type) => dispatch => dispatch({type: actionTypes.CHANGE_MEDIA, content, mediaType: type});

export const removeMedia = () => dispatch => dispatch({type: actionTypes.REMOVE_MEDIA});

export const postCreateError = err => dispatch => dispatch({
	type: actionTypes.CREATE_ERROR, element: err.element,
	message: err.message
});

export const clearError = () => dispatch => dispatch({type: actionTypes.CLEAR_ERROR});

export const setHashtags = hashtags => dispatch => dispatch({type: actionTypes.SET_HASHTAGS, hashtags});

export const createPost = data => dispatch => {
	// Deep copy
	data = _.cloneDeep(data);
	let {tags, post, community} = data;

	dispatch({type: actionTypes.POST_CREATE_INIT});

	let author = getStore().getState().authUser.username;
	let permlink = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase() + '-post';

	let fullPermlink = author + '/' + permlink;
	let wif = localStorage.getItem('posting_key');
	haprampAPI.v2.post.prepare(post, fullPermlink)
		.then(body => {
			Steem.createPost(wif, author, body, tags, post, permlink, community)
				.then(response => {
					console.log(response);
					haprampAPI.v2.post.confirm(fullPermlink)
						.then(response => dispatch({type: actionTypes.POST_CREATED, fullPermlink: fullPermlink}))
						.catch(e => dispatch({type: actionTypes.CREATE_ERROR, message: e, element: 'top'}))
				})
				.catch(e => {
					console.log('Steem error', e);
					dispatch({type: actionTypes.CREATE_ERROR, message: e, element: 'top'});
				})
		})
		.catch(e => {
			console.log('Hapramp API Error', e);
			dispatch({type: actionTypes.CREATE_ERROR, message: e, element: 'top'})
		})
};

export const resetPostCreate = () => dispatch => dispatch({type: actionTypes.POST_CREATE_RESET});
