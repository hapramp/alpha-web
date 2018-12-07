import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const MicroCommunityInfo = ({ microCommunity }) => (
  <div className={styles.infoContainer}>
    <div>
      <img src={microCommunity.image_url} alt={microCommunity.tag} />
      <div className={styles.tag}>#{microCommunity.tag}</div>
      <div className={styles.description}>{microCommunity.description}</div>
    </div>
  </div>
);

MicroCommunityInfo.propTypes = {
  microCommunity: PropTypes.shape({}),
};

MicroCommunityInfo.defaultProps = {
  microCommunity: {},
};

export default MicroCommunityInfo;
