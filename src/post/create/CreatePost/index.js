import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import twitter from 'twitter-text';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import {
  changeCommunity, changeMedia, clearError, createPost, setHashtags,
  postCreateError, removeMedia, resetPostCreate,
} from './actions';
import UserAvatar from '../../../components/UserAvatar';
import InputArea from './InputArea';
import MediaSelector from './MediaSelector';
import Tags from './Tags';
import CommunitySelector from './CommunitySelector';
import PublishButton from './PublishButton';
import PostMediaViewer from './PostMediaViewer';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postInputValue: '',
    };

    this.setPostInputValue = this.setPostInputValue.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  getErrors() {
    return (
      <div className={['uk-margin-top', styles.errorContainer].join(' ')}>
        {this.props.errors.map(err => (
          <div
            key={err.toString()}
            className={['uk-alert', 'uk-alert-danger'].join(' ')}
          >
            {(typeof err.message === 'string') ? err.message : 'An error occurred, check console!'}
          </div>))}
      </div>);
  }

  setPostInputValue(value) {
    this.setState(state => ({ ...state, postInputValue: value }));
    const hashtags = twitter.extractHashtags(value) || [];
    this.props.setHashtags(hashtags);
  }

  createPost() {
    this.props.createPost(this.state.postInputValue);
  }

  render() {
    // The post is created, go to the post
    if (this.props.postCreated) {
      this.props.resetPostCreate();
      return <Redirect to={`/@${this.props.fullPermlink}`} />;
    }

    const { activeCommunity, hashtags } = this.props;

    return (
      <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
        <div className={styles.createPostModal}>
          {/* Avatar and editor section */}
          <div className="uk-flex">
            <UserAvatar username={this.props.username} size="small" className={styles.userAvatar} />
            <InputArea
              className={styles.postInputArea}
              onChange={this.setPostInputValue}
              value={this.state.postInputValue}
            />
          </div>

          <PostMediaViewer media={this.props.media} style={{ paddingLeft: 88 }} />

          {/* Media selection section */}
          <MediaSelector style={{ marginBottom: 24 }} changeMedia={this.props.changeMedia} />

          {/* Tags section */}
          <Tags tags={hashtags} style={{ marginBottom: 24 }} />

          {/* Community section */}
          <CommunitySelector
            selectedCommunities={activeCommunity}
            onClick={c => this.props.changeCommunity(c.id)}
            style={{ marginBottom: 24 }}
          />

          <PublishButton onClick={this.createPost} />
        </div>
      </div>);
  }
}

CreatePost.propTypes = {
  resetPostCreate: PropTypes.func,
  postCreated: PropTypes.bool,
  fullPermlink: PropTypes.string,
  setHashtags: PropTypes.func,
  clearError: PropTypes.func,
  username: PropTypes.string.isRequired,
  activeCommunity: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
  })),
  errors: PropTypes.arrayOf(PropTypes.shape),
  hashtags: PropTypes.arrayOf(PropTypes.string),
  changeCommunity: PropTypes.func,
  createPost: PropTypes.func,
  changeMedia: PropTypes.func.isRequired,
  media: PropTypes.shape({}),
};

CreatePost.defaultProps = {
  resetPostCreate: () => {},
  postCreated: false,
  fullPermlink: '',
  setHashtags: () => {},
  clearError: () => {},
  activeCommunity: [],
  errors: [],
  hashtags: [],
  changeCommunity: () => {},
  createPost: () => {},
  media: null,
};

const mapStateToProps = state => ({
  userFullName: state.authUser.name,
  username: state.authUser.username,
  activeCommunity: state.createPost.community,
  media: state.createPost.media,
  hashtags: state.createPost.hashtags,
  postCreated: state.createPost.created,
  fullPermlink: state.createPost.fullPermlink,
  postCreating: state.createPost.creating,
  errors: state.createPost.errors,
  creating: state.createPost.creating,
});

export default withRouter(connect(mapStateToProps, {
  changeCommunity,
  changeMedia,
  removeMedia,
  postCreateError,
  clearError,
  setHashtags,
  createPost,
  resetPostCreate,
})(CreatePost));
