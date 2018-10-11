/* eslint-disable */
export const getIconReal = path => require(__dirname + path);
/* eslint-enable */

const getIcon = (name, type) => getIconReal(`/${type}/${name}.svg`);

const communityIconMap = {
  art: 'art',
  dance: 'dance',
  travel: 'travel',
  design: 'design',
  literature: 'literature',
  film: 'film',
  photography: 'camera',
  fashion: 'fashion',
};

export const getIconForCommunity = (community) => {
  const actualIconFileSuffix = communityIconMap[community] || community;
  return {
    outline: getIcon(actualIconFileSuffix, 'outline'),
    solid: getIcon(actualIconFileSuffix, 'solid'),
  };
};
