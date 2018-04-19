import _ from 'lodash';

import getStore from './storeUtils';

export const getCommunitiesForPost = post => {
	let allCommunities = getStore().getState().communities.communities;
	return allCommunities.filter(community =>
		_.some(post.json_metadata.tags, i => i === community.tag));
}

export const getOtherTags = tags => {
	let allCommunities = getStore().getState().communities.communities.concat([{tag: 'hapramp'}]);
	return tags.filter(tag =>
		!_.some(allCommunities, i => i.tag === tag));
}
