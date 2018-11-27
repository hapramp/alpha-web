import React from 'react';
import PropTypes from 'prop-types';

export default class MediaSelector extends React.Component {
  static propTypes = {
    changeMedia: PropTypes.func,
  };

  static defaultProps = {
    changeMedia: () => {},
  };

  onImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      // Send the details to action
      if (input.files.length > 0) {
        const [file] = input.files;
        this.props.changeMedia(file, 'image');
      }
    });
    input.click();
  };

  render() {
    return (
      <div>
        <span
          onClick={this.onImageClick}
          uk-icon="icon: image"
          style={{ cursor: 'pointer' }}
          className="uk-margin-small-bottom"
          role="button"
          tabIndex="-1"
          onKeyUp={() => { }}
        />
        {/*
        <span
          onClick={this.onVideoClick}
          uk-icon="icon: play-circle"
          style={{ marginLeft: 22, cursor: 'pointer' }}
          role="button"
          tabIndex="-1"
          onKeyUp={() => { }}
        />
        */}
      </div>
    );
  }
}
