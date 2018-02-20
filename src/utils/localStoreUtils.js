export const setLocalUser = user => {
	console.log(user);
	if (user.json_metadata) {
		let metadata = JSON.parse(user.json_metadata);
		metadata.profile && localStorage.setItem('avatar', metadata.profile.profile_image);
		// TODO: Add other information to cache
	}
};
