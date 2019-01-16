import React from 'react';
import Helmet from 'react-helmet-async';
import PropTypes from 'prop-types';

const MicroCommunityMetaTags = ({ community }) => {
  const { name, description, tag } = community;
  const image = community.image_url;
  return (
    <Helmet>
      <title>{name} | Communities | 1Ramp</title>
      <meta name="title" content={`${name} | Communities | 1Ramp`} />
      <meta name="og:title" content={`${name} | Communitites | 1Ramp`} />
      <meta name="twitter:title" content={`${name} | Communitites | 1Ramp`} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:url" content={image} />
      <meta name="og:url" content={`https://alpha.1ramp.io/communities/${tag}`} />
    </Helmet>
  );
};

MicroCommunityMetaTags.propTypes = {
  community: PropTypes.shape().isRequired,
};

export default MicroCommunityMetaTags;
