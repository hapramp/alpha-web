import React from 'react';
import PropTypes from 'prop-types';

import { getIcon } from '.';

const Icon = ({
  name, type, format, ...props
}) => {
  // Type must be solid or outline
  const realType = ['solid', 'outline'].find(i => type === i) ? type : 'outline';
  return (
    <img
      src={getIcon(name, realType, format)}
      alt={name}
      {...props}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  format: PropTypes.string,
};

Icon.defaultProps = {
  type: 'outline',
  format: 'svg',
};

export default Icon;
