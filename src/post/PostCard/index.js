import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';
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
    <LazyLoad height={600} once>
      <div className={`uk-margin-bottom ${props.border ? styles.postContainerBorder : ''} ${indexStyles.white} ${styles.postContainer}`}>
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
        <PostCardBody post={props.post} maintainAspectRatio={props.maintainAspectRatio} />
        <ActionBar post={props.post} withLink />
      </div>
    </LazyLoad>
  );
};

Post.propTypes = {
  post: PropTypes.shape().isRequired,
  postingUser: PropTypes.shape(),
  border: PropTypes.bool,
  maintainAspectRatio: PropTypes.bool,
};

Post.defaultProps = {
  border: false,
  postingUser: {},
  maintainAspectRatio: false,
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
