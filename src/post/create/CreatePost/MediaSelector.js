import React from 'react';
import PropTypes from 'prop-types';

const MediaSelector = ({ onImageClick, onVideoClick, ...props }) => (
  <div {...props}>
    <span
      onClick={onImageClick}
      uk-icon="icon: image"
      style={{ marginLeft: 4, cursor: 'pointer' }}
      role="button"
      tabIndex="-1"
      onKeyUp={() => {}}
    />
    <span
      onClick={onVideoClick}
      uk-icon="icon: play-circle"
      style={{ marginLeft: 22, cursor: 'pointer' }}
      role="button"
      tabIndex="-1"
      onKeyUp={() => {}}
    />
  </div>
);

MediaSelector.propTypes = {
  onImageClick: PropTypes.func,
  onVideoClick: PropTypes.func,
};

MediaSelector.defaultProps = {
  onImageClick: () => {},
  onVideoClick: () => {},
};

export default MediaSelector;
