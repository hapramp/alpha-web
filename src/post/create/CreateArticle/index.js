import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Editor from './Editor';
import styles from './styles.scss';
import indexStyles from '../../../styles/globals.scss';
import { setTitle, setContent, uploadImage } from './actions';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  getEditorSection() {
    return (
      <div>
        <input
          placeholder="Title"
          className={`uk-input uk-form-large ${styles.titleInput}`}
          type="text"
          onChange={this.handleTitleChange}
          value={this.props.createArticle.title}
        />
        <div className="uk-margin-top uk-position-relative">
          <Editor
            handleContentChange={this.handleContentChange}
            uploadCallback={this.uploadCallback}
            editorState={this.props.createArticle.content}
          />
          <Link to="/create/article/next">
            <PrimaryButton className={styles.nextButton}>
              Next
            </PrimaryButton>
          </Link>
        </div>
      </div>);
  }

  uploadCallback = e => this.props.uploadImage(e)
    .then(({ url }) => ({
      data: { link: url },
    }));

  handleContentChange(content) {
    this.props.setContent(content);
  }

  handleTitleChange(e) {
    this.props.setTitle(e.target.value);
  }

  render() {
    return (
      <div className={['uk-container', 'uk-margin-large-top'].join(' ')}>
        <div className={['uk-padding', indexStyles.white].join(' ')}>
          {this.getEditorSection()}
        </div>
      </div>);
  }
}

CreateArticle.propTypes = {
  setContent: PropTypes.func,
  setTitle: PropTypes.func,
  createArticle: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.shape({}),
  }),
  uploadImage: PropTypes.func.isRequired,
};

CreateArticle.defaultProps = {
  setContent: () => {},
  setTitle: () => {},
  createArticle: {
    title: '',
    content: {},
  },
};

const mapStateToProps = state => ({
  createArticle: state.createArticle,
});

export default connect(mapStateToProps, {
  setTitle, setContent, uploadImage,
})(CreateArticle);
