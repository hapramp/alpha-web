import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import styles from './styles.scss';

const getTargetValue = callback => e => callback(e.target.value);

const InputArea = ({
  className, value, onChange, ...props
}) => (
  <div className={className} {...props}>
    <TextareaAutosize
      className={styles.inputArea}
      onChange={getTargetValue(onChange)}
      value={value}
      placeholder="Share your thoughts..."
    />
  </div>
);

InputArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

InputArea.defaultProps = {
  className: '',
};

export default InputArea;
