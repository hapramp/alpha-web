import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';

import { getEditorConfig } from '../constants';
import styles from './styles.scss';

import Inline from './Inline';
import BlockToggle from './BlockToggle';
import ListToggle from './ListToggle';

const CustomEditor = ({ handleContentChange, uploadCallback, editorState }) => (
  <Editor
    placeholder="Write your story here..."
    onEditorStateChange={handleContentChange}
    editorState={editorState}
    wrapperClassName={styles.editorWrapper}
    toolbar={{
      ...getEditorConfig({ uploadCallback }),
      inline: {
        component: Inline,
      },
      blockType: {
        component: BlockToggle,
      },
      list: {
        component: ListToggle,
      },
    }}
    toolbarClassName={`${styles.editorActionBar} uk-container`}
  />
);

CustomEditor.propTypes = {
  handleContentChange: PropTypes.func,
  uploadCallback: PropTypes.func,
  editorState: PropTypes.shape({}),
};

CustomEditor.defaultProps = {
  handleContentChange: () => {},
  uploadCallback: () => {},
  editorState: {},
};

export default CustomEditor;
