import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getIcon } from '../../../icons';

const PlusButton = ({ className, style, ...remainingProps }) => (
  <div className={`${styles.container} ${className}`} style={{ ...style }} {...remainingProps}>
    <img src={getIcon('plus', 'outline')} className={styles.communityIcon} alt="+" />
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
