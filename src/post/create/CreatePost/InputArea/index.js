import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const getTargetValue = callback => e => callback(e.target.value);

const InputArea = ({
  onChange, value, className, ...props
}) => (
  <div className={className} {...props}>
    <textarea
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
