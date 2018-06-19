export const setLocalUser = (user) => {
  if (user.json_metadata) {
    const metadata = JSON.parse(user.json_metadata);
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

export const getLocalUser = () => ({
  username: localStorage.getItem('username'),
  avatar: localStorage.getItem('avatar'),
  name: localStorage.getItem('name'),
  website: localStorage.getItem('website'),
  location: localStorage.getItem('location'),
});
