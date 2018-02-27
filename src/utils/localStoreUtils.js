export const setLocalUser = user => {
	if (user.json_metadata) {
		let metadata = JSON.parse(user.json_metadata);
		if (metadata.profile) {
			// Avatar
			localStorage.setItem('avatar', metadata.profile.profile_image);

			// Cover
			localStorage.setItem('cover', metadata.profile.cover_image);

			// Name
			localStorage.setItem('name', metadata.profile.name);

			// Location
			localStorage.setItem('location', metadata.profile.location);

			// Website
			localStorage.setItem('website', metadata.profile.website);
		}
	}
};

export const getLocalUser = () => {
	return {
		username: localStorage.getItem('username'),
		postingKey: localStorage.getItem('posting_key'),
		ppkHash: localStorage.getItem('ppk_hash'),
		avatar: localStorage.getItem('avatar'),
		name: localStorage.getItem('name'),
		website: localStorage.getItem('website'),
		location: localStorage.getItem('location'),
	}
};
