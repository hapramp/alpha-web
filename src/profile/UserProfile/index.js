import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';
import PostCard from '../../post/PostCard';
import {
  getUserFeeds, loadUserProfileInfo,
} from '../actions';
import { loadHaprampUserDetails } from '../../actions/allUserActions';
import { getFollowers, getFollowing, follow, unfollow } from '../../follow/actions';
import UserCoverImage from '../UserCoverContainer';
import FollowButton from '../../follow/FollowButton';
import { getAuthUsername } from '../../reducers/authUserReducer';
import UserDataCount from './UserDataCount';
import { getUserProfile } from '../reducer';
import UserCommunities from './UserCommunities';

class UserProfile extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.loadUserProfileInfo(username);
    this.props.getUserFeeds(username);
    this.props.getFollowers(username);
    this.props.getFollowing(username);
    this.props.loadHaprampUserDetails(username);
  }

  render() {
    if (!this.props.userProfile.user) {
      return (
        <div className={['uk-position-center'].join(' ')}>
          LOADING
        </div>
      );
    }
    const jsonMetadata = this.props.userProfile.user.json_metadata;

    jsonMetadata.profile = _.get(jsonMetadata, 'profile', {});
    const { username } = this.props.match.params;

    return (
      <div className={`uk-container uk-margin-top uk-padding uk-padding-remove-top ${indexStyles.white}`}>
        {/* Cover image and user avatar */}
        <UserCoverImage username={username} coverImageUrl={jsonMetadata.profile.cover_image} />

        {/* Name and username */}
        <div className={['uk-text-center', 'uk-margin-top'].join(' ')}>
          <div>
            <span className={styles.userName}>{jsonMetadata.profile.name}</span>
            <span className="uk-margin-small-left">@{this.props.userProfile.user.name}</span>
          </div>
        </div>

        {/* (Un)Follow button */}
        {this.props.match.params.username !== this.props.authUsername &&
          <FollowButton following={this.props.match.params.username} />}

        {/* Data count */}
        <UserDataCount username={username} />

        {/* User Bio */}
        <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-flex', 'uk-flex-center'].join(' ')}>
          <div className={['uk-text-center', styles.bio].join(' ')}>
            {jsonMetadata.profile.about || 'No bio provided.'}
          </div>
        </div>

        <UserCommunities username={username} />

        {/* User posts */}
        <div className={['uk-flex', 'uk-flex-center', indexStyles.white, styles.userPostsContainer].join(' ')}>
          <div className={[styles.blogContainer].join(' ')}>
            <div className={['uk-margin-medium-top', 'uk-margin-medium-bottom', styles.blogHeader].join(' ')}>LATEST</div>
            {this.props.userProfile
              .blog
              .posts
              .map(item => <PostCard key={item} postPermlink={item} border />)}
          </div>
        </div>
      </div>);
  }
}

UserProfile.propTypes = {
  loadUserProfileInfo: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  getUserFeeds: PropTypes.func,
  getFollowers: PropTypes.func,
  getFollowing: PropTypes.func,
  loadHaprampUserDetails: PropTypes.func,
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      json_metadata: PropTypes.shape({
        name: PropTypes.string,
      }),
      name: PropTypes.string.isRequired,
      post_count: PropTypes.number.isRequired,
    }),
    blog: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  authUsername: PropTypes.string.isRequired,
};

UserProfile.defaultProps = {
  loadUserProfileInfo: () => { },
  getUserFeeds: () => { },
  getFollowers: () => { },
  getFollowing: () => { },
  loadHaprampUserDetails: () => { },
  userProfile: {},
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: getUserProfile(state, ownProps.match.params.username),
  authUsername: getAuthUsername(state),
});

export default withRouter(connect(mapStateToProps, {
  loadUserProfileInfo,
  getUserFeeds,
  loadHaprampUserDetails,
  getFollowers,
  getFollowing,
  follow,
  unfollow,
})(UserProfile));
