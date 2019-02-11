import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Input = ({ className, ...props }) => (
  <input
    className={`${styles.inputNode} ${className} uk-input`}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
