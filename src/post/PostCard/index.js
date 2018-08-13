import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import PostUserMeta from '../PostUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';
import { fixUser } from '../../utils/defaultFixUtils';
import ActionBar from '../ActionBar';
import PostCardBody from '../../post/PostCard/PostCardBody';

const Post = (props) => {
  if (!props.post) {
    return <div>Loading...</div>;
  }

  /* Author details */
  const user = props.postingUser;

  /* Render */
  return (
    <div className={['uk-margin-bottom', props.border ? styles.postContainerBorder : '', indexStyles.white].join(' ')}>
      {/* Top section */}
      <PostUserMeta
        profile={{
          name: user.json_metadata.profile.name,
          image: user.json_metadata.profile.profile_image,
          username: user.name,
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
  postingUser: PropTypes.shape().isRequired,
  border: PropTypes.bool,
};

Post.defaultProps = {
  border: false,
};

const mapStateToProps = (state, ownProps) => {
  const post = state.allPosts.posts[ownProps.postPermlink];
  const postingUsername = post.author;
  return {
    post,
    postingUser: fixUser(state.allUsers.users[postingUsername], postingUsername),
  };
};

export default withRouter(connect(mapStateToProps)(Post));
