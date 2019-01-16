import React from 'react';
import Helmet from 'react-helmet-async';
import PropTypes from 'prop-types';

const CompetitionMetaTags = ({ competition }) => {
  const {
    image, description, title, id,
  } = competition;

  return (
    <Helmet>
      <title>{title} | Competitions | 1Ramp</title>
      <meta name="title" content={`${title} | Competitions | 1Ramp`} />
      <meta name="og:title" content={`${title} | Competitions | 1Ramp`} />
      <meta name="twitter:title" content={`${title} | Competitions | 1Ramp`} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:url" content={image} />
      <meta name="og:url" content={`https://alpha.1ramp.io/competitions/${id}`} />
    </Helmet>
  );
};

CompetitionMetaTags.propTypes = {
  competition: PropTypes.shape().isRequired,
};

export default CompetitionMetaTags;
