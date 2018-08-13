import React from 'react';
import PropTypes from 'prop-types';
import ellipsis from 'text-ellipsis';

import { getBodyTextOnly } from '../../utils';

const ShortText = ({ body, className, length }) => {
  const text = getBodyTextOnly(body);
  if (text) {
    return (
      <div
        className={className}
        style={{ margin: '24px 24px 0 24px' }}
        dangerouslySetInnerHTML={{ __html: ellipsis(getBodyTextOnly(body), length, { ellipsis: '…' }) }}
      />
    );
  }
  return false;
};

ShortText.propTypes = {
  className: PropTypes.string,
  body: PropTypes.string,
  length: PropTypes.number,
};

ShortText.defaultProps = {
  className: '',
  body: '',
  length: 140,
};

export default ShortText;
