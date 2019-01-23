import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutosizeTextarea from 'react-autosize-textarea';

import MediaSelector from '../../CreatePost/MediaSelector';
import PostBody from '../../../PostBody';
import styles from './styles.scss';
import { uploadImage } from '../actions';

class MarkdownEditor extends React.Component {
  static propTypes = {
    bodyMarkdown: PropTypes.string,
    onChange: PropTypes.func,
    onImageUpload: PropTypes.func,
    hidePreviewText: PropTypes.bool,
    noBorder: PropTypes.bool,
    startRows: PropTypes.number,
  };

  static defaultProps = {
    bodyMarkdown: '',
    onChange: '',
    onImageUpload: () => { },
    hidePreviewText: false,
    noBorder: false,
    startRows: 5,
  };

  constructor(props) {
    super(props);

    this.textAreaRef = null;
    this.state = {
      isImageUploading: false,
    };

    this.onImageSelected = this.onImageSelected.bind(this);
  }

  onImageSelected(file) {
    if (!this.textAreaRef) {
      return;
    }
    const { onImageUpload, onChange, bodyMarkdown } = this.props;
    this.setState({ ...this.state, isImageUploading: true });
    onImageUpload(file)
      .then(({ url, error }) => {
        if (error) {
          return;
        }
        /**
         * Find out the current cursor status and insert the image
         * markdown accordingly
         */
        const startPos = this.textAreaRef.selectionStart;
        const endPos = this.textAreaRef.selectionEnd;
        const imageText = `![](${url})\n`;
        // Update the editor state based on new text
        onChange(`${bodyMarkdown.substring(0, startPos)}${imageText}${bodyMarkdown.substring(endPos, bodyMarkdown.length)}`);
      })
      .finally(() => this.setState({ ...this.state, isImageUploading: false }));
  }

  render() {
    const {
      bodyMarkdown, onChange, noBorder, startRows,
    } = this.props;
    const { isImageUploading } = this.state;
    return (
      <div className={styles.editorWrite}>
        <AutosizeTextarea
          value={bodyMarkdown}
          onChange={event => onChange(event.target.value)}
          className={`uk-textarea uk-margin-bottom ${noBorder ? styles.noBorder : ''}`}
          rows={startRows}
          innerRef={(ref) => { this.textAreaRef = ref; }}
        />
        <div className={styles.imageUploadContainer}>
          <MediaSelector changeMedia={this.onImageSelected} />
          { isImageUploading && <span className={styles.uploadingText}>Uploading image...</span>}
        </div>
        <div className={styles.previewContainer}>
          {!this.props.hidePreviewText && <span>Preview</span>}
          <PostBody className={`${styles.previewBody} ${noBorder ? styles.noBorder : ''}`} body={bodyMarkdown} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onImageUpload: uploadImage,
}, dispatch);

export default connect(null, mapDispatchToProps)(MarkdownEditor);
