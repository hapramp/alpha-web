import _ from 'lodash';

export const fixUser = (user, username) => {
	user = _.cloneDeep(user);
	if (!user || !user.json_metadata) {
		!user && (user = {});
		!user.json_metadata && (user.json_metadata = {});
		user.json_metadata.profile = {name: username};
	} else {
		user = _.clone(user);
		!user.json_metadata.profile.name && (user.json_metadata.profile.name = username);
	}
	let profileImageUrl = `https://steemitimages.com/u/${username}/avatar`;
	user.json_metadata.profile.profile_image = profileImageUrl;
	return user;
};
