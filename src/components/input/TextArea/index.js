import React from 'react';
import PropTypes from 'prop-types';
import TextAreaAutosize from 'react-autosize-textarea';

import styles from './styles.scss';

const Input = ({ className, ...props }) => (
  <TextAreaAutosize
    className={`${styles.textAreaNode} ${className} uk-textarea`}
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
