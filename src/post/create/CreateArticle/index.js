import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html'; // To convert to HTML

import Editor from './Editor';
import styles from './styles.scss';
import indexStyles from '../../../styles/globals.scss';
import { setTitle, setContent, uploadImage } from './actions';
import UserAvatar from '../../../components/UserAvatar';

class CreateArticle extends React.Component {
  static getContinueSection() {
    return (
      <div className={['uk-flex'].join(' ')}>
        <div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
          <span className={[indexStyles.hoverEffect, indexStyles.transition].join(' ')}>
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

    return (
      <div className={['uk-flex', 'uk-flex-center', 'uk-margin', styles.userSection].join(' ')}>
        <div className={['uk-margin-right'].join(' ')}>
          <UserAvatar username={this.props.authUser.username} />
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
        <div className={['uk-margin-top'].join(' ')}>
          <Editor
            handleContentChange={this.handleContentChange}
            uploadCallback={this.uploadCallback}
          />
        </div>
      </div>);
  }

  uploadCallback = e => this.props.uploadImage(e)
    .then(({ url }) => ({
      data: { link: url },
    }));

  handleContentChange(content) {
    console.log(draftToHtml(content));
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
  uploadImage: PropTypes.func.isRequired,
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
  setTitle, setContent, uploadImage,
})(CreateArticle);
