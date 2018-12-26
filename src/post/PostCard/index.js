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

import Icon from '../../icons/Icon';
import ActionBar from '../ActionBar';
import PostCardBody from '../../post/PostCard/PostCardBody';


const PrizeSection = ({ rank, prize }) => {
  if (!rank) {
    return <div />;
  }
  return (
    <div className={styles.prizeContainer}>
      <Icon name="award" />
      <span className={styles.rank}>#{rank}</span>
      <span>{prize}</span>
    </div>
  );
};
PrizeSection.propTypes = {
  rank: PropTypes.number.isRequired,
  prize: PropTypes.string.isRequired,
};


const Post = (props) => {
  if (!props.post) {
    return <div>Loading...</div>;
  }

  /* Author details */
  const user = props.postingUser;
  const { author } = props.post;

  /* Render */
  return (
    <LazyLoad height={700} once>
      <div className={`uk-margin-bottom ${props.border ? styles.postContainerBorder : ''} ${indexStyles.white} ${styles.postContainer}`}>
        {
          props.showPrize
          && props.post.rank
          && <PrizeSection rank={props.post.rank} prize={props.post.prize} />
        }
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
  showPrize: PropTypes.bool,
};

Post.defaultProps = {
  border: false,
  postingUser: {},
  maintainAspectRatio: false,
  showPrize: false,
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
