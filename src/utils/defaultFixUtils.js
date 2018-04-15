import _ from 'lodash';

import userPlaceholder from '../components/userProfile/user-placeholder.jpg';

export const fixUser = (user, username) => {
	user = _.cloneDeep(user);
	if (!user || !user.json_metadata) {
		!user && (user = {});
		!user.json_metadata && (user.json_metadata = {});
		user.json_metadata.profile = {name: username, profile_image: userPlaceholder};
	} else {
		user = _.clone(user);
		!user.json_metadata.profile.name && (user.json_metadata.profile.name = username);
		!user.json_metadata.profile.profile_image && (user.json_metadata.profile.profile_image = userPlaceholder);
	}
	return user;
};
