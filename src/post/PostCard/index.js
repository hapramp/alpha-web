import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './styles.scss';
import indexStyles from '../../styles/_variables.scss';
import PostUserMeta from '../PostUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';

import ActionBar from '../ActionBar';
import PostCardBody from '../../post/PostCard/PostCardBody';

const Post = (props) => {
  if (!props.post) {
    return <div>Loading...</div>;
  }

  /* Author details */
  const user = props.postingUser;
  const { author } = props.post;

  /* Render */
  return (
    <div className={['uk-margin-bottom', props.border ? styles.postContainerBorder : '', indexStyles.white].join(' ')}>
      {/* Top section */}
      <PostUserMeta
        profile={{
          name: _.get(user, 'json_metadata.profile.name', author),
          username: author,
        }}
        created={props.post.created}
        communities={getCommunitiesForPost(props.post)}
      />
      {/* Actual post */}
      <PostCardBody post={props.post} />
      <ActionBar post={props.post} withLink />
    </div>);
};

Post.propTypes = {
  post: PropTypes.shape().isRequired,
  postingUser: PropTypes.shape(),
  border: PropTypes.bool,
};

Post.defaultProps = {
  border: false,
  postingUser: {},
};

const mapStateToProps = (state, ownProps) => {
  const post = state.allPosts.posts[ownProps.postPermlink];
  const postingUsername = post.author;
  return {
    post,
    postingUser: state.allUsers.users[postingUsername],
  };
};

export default withRouter(connect(mapStateToProps)(Post));
