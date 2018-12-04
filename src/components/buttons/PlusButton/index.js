import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import Icon from '../../../icons/Icon';

const PlusButton = ({ className, style, ...remainingProps }) => (
  <div className={`${styles.container} ${className}`} style={{ ...style }} {...remainingProps}>
    <Icon name="plus" className={styles.communityIcon} />
  </div>
);

PlusButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

PlusButton.defaultProps = {
  className: '',
  style: {},
};

export default PlusButton;
