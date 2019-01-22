import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';

/* eslint-disable import/prefer-default-export */
export const fixUser = (oldUser, username) => {
  let user = cloneDeep(oldUser);
  if (!user || !user.json_metadata) {
    user = user || {};
    user.json_metadata = user.json_metadata || {};
    user.json_metadata.profile = { name: username };
  } else {
    if (!user.json_metadata.profile) {
      user.json_metadata.profile = {};
    }
    user = clone(user);
    user.json_metadata.profile.name = user.json_metadata.profile.name || username;
  }
  const profileImageUrl = `https://steemitimages.com/u/${username}/avatar`;
  user.json_metadata.profile.profile_image = profileImageUrl;
  return user;
};
