import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const PublishButton = ({ disabled, isProcessing, ...props }) => (
  <div {...props} className={styles.container}>
    <span className={disabled ? styles.disabled : styles.enabled} style={{ borderRadius: 24 }}>
      {isProcessing ? 'PUBLISHING...' : 'PUBLISH'}
    </span>
  </div>
);

PublishButton.propTypes = {
  disabled: PropTypes.bool,
  isProcessing: PropTypes.bool,
};

PublishButton.defaultProps = {
  disabled: false,
  isProcessing: false,
};

export default PublishButton;
