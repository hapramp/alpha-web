import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import { changeMedia } from '../../actions/createPostActions';
import PostMediaViewer from '../postMediaViewer';

class PostMediaUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMediaChooser: null,
    };
    this.onYoutubeInputKeyPress = this.onYoutubeInputKeyPress.bind(this);
    this.handleUploadImageClick = this.handleUploadImageClick.bind(this);
  }

  handleUploadImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (e) => {
      // Send the details to action
      let file;
      if (input.files.length > 0) {
        file = input.files[0];
      }
      this.props.changeMedia(file, 'image');
    });
    input.click();
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
      event.target.value = '';
    }
  }

  render() {
    let activeMediaType = null;
    this.state.activeMediaChooser && (activeMediaType = this.state.activeMediaChooser.type);
    return (<div className={['uk-margin-top', styles.mediaUpload].join(' ')}>
      <div uk-grid="true" className="uk-margin-remove">
        <div className={[styles.upload].join(' ')} onClick={this.handleUploadImageClick}>
          <span className={[indexStyles.marginRightSmall].join(' ')}>
            <i className="fas fa-image" />
          </span>
          <span>Image</span>
        </div>
        {/* <div className={[styles.upload].join(' ')}>
			<span className={[indexStyles.marginRightSmall].join(' ')}>
				<svg fill="#444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
				</svg>
			</span>
				<span>Music</span>
			</div> */}
        <div
          className={[styles.upload, activeMediaType === 'youtube' ? ['uk-margin-remove', styles.mediaActive].join(' ') : ''].join(' ')}
          onClick={() => this.setState({ ...this.state, activeMediaChooser: { type: 'youtube' } })}
        >
          <span className={[indexStyles.marginRightSmall].join(' ')}>
            <i className="fab fa-youtube" />
          </span>
          <span>YouTube</span>
        </div>
        {this.state.activeMediaChooser && this.state.activeMediaChooser.type === 'youtube' && <div className={['uk-padding-remove'].join(' ')}>
          <input type="text" className={[styles.linkInput].join(' ')} onKeyUp={this.onYoutubeInputKeyPress} />
        </div>}
      </div>
      <PostMediaViewer className={['uk-margin-top'].join(' ')} />
    </div>);
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { changeMedia })(PostMediaUpload);
