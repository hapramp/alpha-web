import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import get from 'lodash/get';

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


const VotePercentByUser = ({ votes, username }) => {
  const voterVote = votes.find(vote => vote.voter === username);
  if (!voterVote) {
    return <div />;
  }
  const percent = voterVote.percent / 100;
  return (
    <progress
      className={`uk-progress ${styles.progressBar}`}
      value={percent}
      max="100"
      uk-tooltip={`${percent.toFixed(2)}% vote by ${username}`}
    />
  );
};
VotePercentByUser.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  username: PropTypes.string.isRequired,
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
    <LazyLoad height={800} once>
      <div
        className={`uk-margin-bottom ${props.border ? styles.postContainerBorder : ''} ${indexStyles.white} ${styles.postContainer} ${props.className}`}
        style={props.style}
      >
        {
          props.showPrize
          && props.post.rank
          && <PrizeSection rank={props.post.rank} prize={props.post.prize} />
        }
        {
          props.showPercentByUser && (
            <VotePercentByUser
              votes={props.post.active_votes}
              username={props.showPercentByUser}
            />
          )
        }
        {/* Top section */}
        <PostUserMeta
          profile={{
            name: get(user, 'json_metadata.profile.name', author),
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
  showPercentByUser: PropTypes.string,
  style: PropTypes.shape(),
  className: PropTypes.string,
};

Post.defaultProps = {
  border: false,
  postingUser: {},
  maintainAspectRatio: false,
  showPrize: false,
  showPercentByUser: null,
  style: {},
  className: '',
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
