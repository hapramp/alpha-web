export const getEditorConfig = ({ uploadCallback }) => ({
  options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'image', 'history'],
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
    isDropdown: true,
  },
  embedded: {
    defaultSize: {
      height: 315,
      width: 560,
    },
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    uploadCallback,
    previewImage: true,
    alignmentEnabled: false,
  },
  emoji: {
  },
});

export default undefined;
