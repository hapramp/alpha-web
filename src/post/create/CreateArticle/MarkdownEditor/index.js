import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutosizeTextarea from 'react-autosize-textarea';

import PostBody from '../../../PostBody';
import styles from './styles.scss';
import { getMarkdownText } from '../reducer';
import { setMarkdownText } from '../actions';

const MarkdownEditor = ({ bodyMarkdown, onChange }) => (
  <div className={`uk-margin-top ${styles.editorWrite}`}>
    <AutosizeTextarea
      value={bodyMarkdown}
      onChange={event => onChange(event.target.value)}
      className="uk-textarea uk-margin-bottom"
      rows={5}
    />
    <div className={styles.previewContainer}>
      <span>Preview</span>
      <PostBody className={styles.previewBody} body={bodyMarkdown} />
    </div>
  </div>
);

MarkdownEditor.propTypes = {
  bodyMarkdown: PropTypes.string,
  onChange: PropTypes.func,
};

MarkdownEditor.defaultProps = {
  bodyMarkdown: '',
  onChange: '',
};

const mapStateToProps = state => ({
  bodyMarkdown: getMarkdownText(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange: setMarkdownText,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
