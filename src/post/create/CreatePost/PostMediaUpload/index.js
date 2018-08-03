import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../../../index.scss';
import { changeMedia } from '../actions';
import PostMediaViewer from '../PostMediaViewer';

class PostMediaUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMediaChooser: null,
    };
    this.onYoutubeInputKeyPress = this.onYoutubeInputKeyPress.bind(this);
    this.handleUploadImageClick = this.handleUploadImageClick.bind(this);
    this.activateYoutubeChooser = this.activateYoutubeChooser.bind(this);
  }

  onYoutubeInputKeyPress(event) {
    if (event.keyCode === 13) {
      const link = event.target.value;
      let videoId = link.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      this.props.changeMedia(videoId, 'youtube');
      this.setState({ ...this.state, activeMediaChooser: null });
      /* eslint no-param-reassign: "off" */
      event.target.value = '';
    }
  }

  activateYoutubeChooser() {
    this.setState({ ...this.state, activeMediaChooser: { type: 'youtube' } });
  }

  handleUploadImageClick() {
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
  }

  render() {
    const activeMediaType = this.state.activeMediaChooser && this.state.activeMediaChooser.type;
    return (
      <div className={['uk-margin-top', styles.mediaUpload].join(' ')}>
        <div uk-grid="true" className="uk-margin-remove">
          <div
            className={[styles.upload].join(' ')}
            onClick={this.handleUploadImageClick}
            onKeyUp={this.handleUploadImageClick}
            role="button"
            tabIndex={0}
          >
            <span className={[indexStyles.marginRightSmall].join(' ')}>
              <i className="fas fa-image" />
            </span>
            <span>Image</span>
          </div>
          <div
            className={[styles.upload, activeMediaType === 'youtube' ? ['uk-margin-remove', styles.mediaActive].join(' ') : ''].join(' ')}
            onClick={this.activateYoutubeChooser}
            onKeyUp={this.activateYoutubeChooser}
            role="button"
            tabIndex={0}
          >
            <span className={[indexStyles.marginRightSmall].join(' ')}>
              <i className="fab fa-youtube" />
            </span>
            <span>YouTube</span>
          </div>
          {this.state.activeMediaChooser && this.state.activeMediaChooser.type === 'youtube' &&
            <div className={['uk-padding-remove'].join(' ')}>
              <input type="text" className={[styles.linkInput].join(' ')} onKeyUp={this.onYoutubeInputKeyPress} />
            </div>}
        </div>
        <PostMediaViewer className={['uk-margin-top'].join(' ')} />
      </div>);
  }
}

PostMediaUpload.propTypes = {
  changeMedia: PropTypes.func.isRequired,
};

export default connect(null, { changeMedia })(PostMediaUpload);
