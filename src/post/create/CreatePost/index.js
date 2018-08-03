import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import twitter from 'twitter-text';
import * as firebase from 'firebase';
import _ from 'lodash';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../../index.scss';
import {
  changeCommunity, changeMedia, clearError, createPost, setHashtags,
  postCreateError, removeMedia, resetPostCreate,
} from './actions';
import PostMediaUpload from './PostMediaUpload';
import UserAvatar from '../../../components/UserAvatar';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.handlePostCreate = this.handlePostCreate.bind(this);
    this.parseHashTags = this.parseHashTags.bind(this);
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  getUserSection() {
    return (
      <div className={['uk-flex', 'uk-flex-between', 'uk-margin-bottom'].join(' ')}>
        <div>
          <UserAvatar username={this.props.username} size="small" />
          <span className={['uk-margin-left'].join(' ')} style={{ opacity: 0.87 }}>{this.props.userFullName}</span>
        </div>
        <div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
          {!this.props.creating
            ? (
              <span
                className={[styles.publishButton, indexStyles.hoverEffect, indexStyles.transition].join(' ')}
                onClick={this.handlePostCreate}
                role="button"
                onKeyDown={this.handlePostCreate}
                tabIndex={0}
              >
              Publish
              </span>
             )
            : (
              <span className={`${styles.publishButton} ${indexStyles.hoverEffect} ${indexStyles.transition}`}>
                Publishing...
              </span>
            )
          }
        </div>
      </div>
    );
  }

  getTextView() {
    return (
      <div className={['uk-margin-top'].join(' ')}>
        <textarea
          autoComplete="false"
          rows={5}
          placeholder="Share photos, videos, music or anything you like..."
          className={['uk-textarea', styles.textArea].join(' ')}
          id="post-create-text"
          onChange={this.parseHashTags}
        />
      </div>
    );
  }

  getCommunitySelector() {
    return (
      <div className={['uk-margin-top'].join(' ')}>
        <div className={['uk-margin-bottom', styles.communityHeading].join(' ')}>Select Communities (max 3)</div>
        <div uk-grid="true" className="uk-margin-remove">
          {this.props.communities.map((community) => {
            const isActive = _.some(this.props.activeCommunity, i => i === community.id);
            return (
              <div
                key={community.id}
                onClick={this.changeCommunity(community.id)}
                className={[styles.communitySingle, isActive ? styles.active : ''].join(' ')}
                onKeyDown={this.changeCommunity(community.id)}
                role="checkbox"
                tabIndex={0}
                aria-checked={isActive}
              >
                {community.name}
              </div>);
            })}
        </div>
      </div>);
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

  showHashtags() {
    return (
      <div uk-grid="true" className={['uk-margin-remove'].join(' ')}>
        {this.props.hashtags.length ?
          this.props.hashtags.map(i => (
            <span
              key={i}
              className={['uk-margin-remove', styles.communitySingle].join(' ')}
            >#{i}
            </span>)) :
          <span className={[styles.hashtagInfo].join(' ')}>
            Your tags will appear here.
          </span>}
      </div>);
  }

  changeCommunity(id) {
    return () => this.props.changeCommunity(id);
  }

  parseHashTags() {
    const content = document.getElementById('post-create-text').value;
    const hashtags = twitter.extractHashtags(content);
    if (hashtags.length > 0) {
      this.props.setHashtags(hashtags);
    }
  }

  handlePostCreate() {
    // Clear error messages
    this.props.clearError();

    // Content
    const content = document.getElementById('post-create-text').value;
    // TODO: Validation?

    // Community
    let community = this.props.activeCommunity;
    if (!community.length) {
      this.props.postCreateError({ element: 'community', message: 'Please select at least one community' });
      return;
    }

    community = this.props.communities
      .filter(i => _.some(community, j => j === i.id))
      .map(i => i.tag);

    let post;

    if (this.props.media) {
      if (this.props.media.type === 'image') {
        const imageElement = document.getElementById('media-image');
        const uploadTask = window.firebaseStorage
          .ref()
          .child(`images/${new Date().toISOString()}${this.props.media.content.name}`)
          .put(this.props.media.content);

        const onUploadProgress = (snapshot) => {
          console.log('Progress - ', snapshot);
          // TODO: Show an indicator
        };
        const onUploadError = (error) => {
          console.log(error);
          // TODO: Show some error
        };
        const onUploadComplete = () => {
          const { downloadURL } = uploadTask.snapshot;
          console.log('Image uploaded', downloadURL);
          post = {
            type: 'post',
            data: [
              {
                type: 'image', content: downloadURL, height: imageElement.height, width: imageElement.width,
              },
              { type: 'text', content },
            ],
          };
          this.props.createPost({ post, tags: this.props.hashtags, community });
        };
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          onUploadProgress,
          onUploadError,
          onUploadComplete,
        );
      } else if (this.props.media.type === 'youtube') {
        post = {
          type: 'post',
          data: [
            { type: 'youtube', content: this.props.media.content },
            { type: 'text', content },
          ],
        };
        this.props.createPost({ post, tags: this.props.hashtags, community });
      }
    } else {
      post = {
        type: 'post',
        data: [
          { type: 'text', content },
        ],
      };
      this.props.createPost({ post, tags: this.props.hashtags, community });
    }
  }

  render() {
    // The post is created, go to the post
    if (this.props.postCreated) {
      this.props.resetPostCreate();
      return <Redirect to={`/@${this.props.fullPermlink}`} />;
    }

    return (
      <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
        <div className={styles.createPostModal}>
          {this.getUserSection()}
          <div className={indexStyles.separator} />
          {this.getTextView()}
          {this.showHashtags()}
          <div className={['uk-margin-top', indexStyles.separator].join(' ')} />
          {this.getCommunitySelector()}
          <div className={['uk-margin-top', indexStyles.separator].join(' ')} />
          <PostMediaUpload />
          {this.getErrors()}
        </div>
      </div>);
  }
}

CreatePost.propTypes = {
  resetPostCreate: PropTypes.func,
  postCreated: PropTypes.bool,
  fullPermlink: PropTypes.string,
  createPost: PropTypes.func,
  media: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  }),
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
  })),
  postCreateError: PropTypes.func,
  setHashtags: PropTypes.func,
  clearError: PropTypes.func,
  username: PropTypes.string.isRequired,
  userFullName: PropTypes.string,
  creating: PropTypes.bool,
  activeCommunity: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
  })),
  errors: PropTypes.arrayOf(PropTypes.shape),
  hashtags: PropTypes.arrayOf(PropTypes.string),
  changeCommunity: PropTypes.func,
};

CreatePost.defaultProps = {
  resetPostCreate: () => {},
  postCreated: false,
  fullPermlink: '',
  createPost: () => {},
  media: {
    type: '',
    content: '',
  },
  communities: [],
  postCreateError: () => {},
  setHashtags: () => {},
  clearError: () => {},
  userFullName: '',
  creating: false,
  activeCommunity: [],
  errors: [],
  hashtags: [],
  changeCommunity: () => {},
};

const mapStateToProps = state => ({
  userFullName: state.authUser.name,
  username: state.authUser.username,
  communities: state.communities.communities,
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
