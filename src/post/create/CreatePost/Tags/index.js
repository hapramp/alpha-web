import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags }) => (
  <div className="uk-margin-small-bottom uk-flex uk-flex-wrap">
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
            className="uk-margin-small-bottom"
            key={tag}
            style={{
              backgroundColor: '#fafafa',
              color: 'rgba(0, 0, 0, 0.54)',
              marginRight: 8,
              padding: '4px 10px',
              borderRadius: '40px',
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
