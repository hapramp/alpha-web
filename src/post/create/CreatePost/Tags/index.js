import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags }) => (
  <div style={{ height: 28 }}>
    {
      tags.length === 0
      ? (
        <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.38)' }}>
          Your tags will appear here
        </span>
      )
      : (
        tags.map(tag => (
          <span
            key={tag}
            style={{
              backgroundColor: '#fafafa',
              color: 'rgba(0, 0, 0, 0.54)',
              marginRight: 8,
              padding: '4px 10px',
            }}
          >
            {tag}
          </span>
        ))
      )
    }
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
