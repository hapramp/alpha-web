import { getIcon } from '../../../icons';

import styles from './styles.scss';

export const getEditorConfig = ({ uploadCallback }) => ({
  options: ['inline', 'blockType', 'list', 'link', 'embedded', 'image', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline'],
  },
  blockType: {
    isDropdown: false,
  },
  list: {
    isDropdown: true,
  },
  link: {
    link: { icon: getIcon('hyperlink', 'outline') },
    options: ['link'],
    defaultTargetOption: '_blank',
    className: styles.toggleButton,
    popupClassName: `uk-position-fixed ${styles.inputBox}`,
  },
  embedded: {
    defaultSize: {
      height: 315,
      width: 560,
    },
    className: styles.toggleButton,
    popupClassName: `uk-position-fixed ${styles.inputBox}`,
    icon: getIcon('text-bar', 'outline'),
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    uploadCallback,
    alignmentEnabled: false,
    icon: getIcon('image', 'outline'),
    className: styles.toggleButton,
    popupClassName: `uk-position-fixed ${styles.inputBox}`,
  },
  history: {
    className: styles.toggleButton,
    undo: { className: styles.toggleButton },
    redo: { className: styles.toggleButton },
  },
});

export default undefined;
