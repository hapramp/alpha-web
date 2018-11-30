import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const GrayButton = ({
  className, style, disabled, onClick, onKeyUp, tabIndex,
  ...props
}) => (
  <div
    className={`${className} ${styles.grayButton} ${disabled ? styles.disabled : ''}`}
    style={{ ...style }}
    onClick={disabled ? () => {} : onClick}
    onKeyUp={onKeyUp}
    role="button"
    tabIndex={tabIndex}
    {...props}
  >
    {props.children}
  </div>
);

GrayButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  tabIndex: PropTypes.number,
};

GrayButton.defaultProps = {
  className: '',
  style: {},
  disabled: false,
  onClick: () => {},
  onKeyUp: () => {},
  tabIndex: -1,
};

export default GrayButton;
