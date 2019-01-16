import React from 'react';
import _ from 'lodash';
import Helmet from 'react-helmet-async';
import PropTypes from 'prop-types';

const UserProfileMetaTags = ({ user }) => {
  const { json_metadata, name } = user; // name is username

  const fullName = _.get(json_metadata, 'profile.name', false);
  const description = _.get(json_metadata, 'profile.about', '');
  const twitterHandle = _.get(json_metadata, 'profile.twitter', false);
  const title = fullName ? `${fullName} (@${name})` : `@${name}`;
  const image = `https://steemitimages.com/u/${name}/avatar`;

  return (
    <Helmet>
      <title>{title} | 1Ramp</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} | 1Ramp`} />
      <meta name="twitter:description" content={description} />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      <meta name="twitter:img:src" content={image} />
      <meta name="og:title" content={`${title} | 1Ramp`} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={`https://alpha.1ramp.io/@${name}`} />
      <meta name="og:image" content={image} />
      <meta name="og:description" content={description} />
    </Helmet>
  );
};

UserProfileMetaTags.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default UserProfileMetaTags;
