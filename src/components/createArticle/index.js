import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
// import draftToHtml from 'draftjs-to-html';  // To convert to HTML

import styles from './styles.scss';
import createPostStyles from '../../post/create/CreatePost/styles.scss';
import userProfilePlaceholder from '../userProfile/user-placeholder.jpg';
import indexStyles from '../../styles/_variables.scss';
import { setTitle, setContent } from '../../actions/createArticleActions';

/*
TODO:
 - Implement draft saving
 */

class CreateArticle extends React.Component {
  static getContinueSection() {
    return (
      <div className={['uk-flex'].join(' ')}>
        <div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
          <span className={[createPostStyles.publishButton, indexStyles.hoverEffect, indexStyles.transition].join(' ')}>
            CONTINUE
          </span>
        </div>
      </div>);
  }

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  getUserSection() {
    /* User details */
    const name = this.props.authUser.name ? this.props.authUser.name : this.props.authUser.username;
    const image = this.props.authUser.avatar || userProfilePlaceholder;

    return (
      <div className={['uk-flex', 'uk-flex-center', 'uk-margin', styles.userSection].join(' ')}>
        <div className={['uk-margin-right'].join(' ')}>
          <img src={image} alt="" className={['uk-border-circle', createPostStyles.userAvatar].join(' ')} />
        </div>
        <div className={['uk-align-center'].join(' ')}>{name}</div>
      </div>);
  }

  getTopSection() {
    return (
      <div className={['uk-flex', 'uk-flex-between', 'uk-margin-bottom', styles.topSection].join(' ')}>
        {this.getUserSection()}
        {CreateArticle.getContinueSection()}
      </div>);
  }

  getEditorSection() {
    return (
      <div>
        <input
          placeholder="Title"
          className={['uk-input', 'uk-form-large', styles.titleInput].join(' ')}
          type="text"
          onChange={this.handleTitleChange}
          value={this.props.createArticle.title}
        />
        <div className={['uk-margin-large-top'].join(' ')}>
          <Editor
            placeholder="Write your story here..."
            onChange={this.handleContentChange}
          />
        </div>
      </div>);
  }

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
          {this.getTopSection()}
          {this.getEditorSection()}
        </div>
      </div>);
  }
}

CreateArticle.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  setContent: PropTypes.func,
  setTitle: PropTypes.func,
  createArticle: PropTypes.shape({
    title: PropTypes.string,
  }),
};

CreateArticle.defaultProps = {
  authUser: {
    name: '',
    username: '',
    avaar: '',
  },
  setContent: () => {},
  setTitle: () => {},
  createArticle: {
    title: '',
  },
};

const mapStateToProps = state => ({
  authUser: state.authUser,
  createArticle: state.createArticle,
});

export default connect(mapStateToProps, {
  setTitle, setContent,
})(CreateArticle);
