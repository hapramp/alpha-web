import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';

import { getEditorConfig } from '../constants';
import styles from './styles.scss';

import Inline from './Inline';
import BlockToggle from './BlockToggle';
import ListToggle from './ListToggle';

const CustomEditor = ({ handleContentChange, uploadCallback }) => (
  <Editor
    placeholder="Write your story here..."
    onChange={handleContentChange}
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
    toolbarClassName={styles.editorActionBar}
  />
);

CustomEditor.propTypes = {
  handleContentChange: PropTypes.func,
  uploadCallback: PropTypes.func,
};

CustomEditor.defaultProps = {
  handleContentChange: () => {},
  uploadCallback: () => {},
};

export default CustomEditor;
