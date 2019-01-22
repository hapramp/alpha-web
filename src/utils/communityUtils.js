import some from 'lodash/some';

import getStore from './storeUtils';

export const getCommunitiesForPost = (post) => {
  const allCommunities = getStore().getState().communities.communities;
  return allCommunities.filter(community =>
    some(post.json_metadata.tags, i => i === community.tag));
};

export const getOtherTags = (tags) => {
  const allCommunities = getStore().getState().communities.communities.concat([{ tag: 'hapramp' }]);
  return tags.filter(tag =>
    !some(allCommunities, i => i.tag === tag));
};
