import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';
import PostCard from '../../post/PostCard';
import {
  getFollowCount, getUserFeeds, loadUserProfileInfo,
  resetUserProfileInfo,
} from '../actions';
import { loadHaprampUserDetails } from '../../actions/allUserActions';
import { getFollowers, getFollowing, follow, unfollow } from '../../follow/actions';
import UserCoverImage from '../UserCoverContainer';
import FollowButton from '../../follow/FollowButton';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    props.loadUserProfileInfo(props.match.params.username);
    props.getFollowCount(props.match.params.username);
    props.getUserFeeds(props.match.params.username);
    props.getFollowers(props.match.params.username);
    props.getFollowing(props.match.params.username);
    this.props.loadHaprampUserDetails(this.props.match.params.username);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.username !== this.props.match.params.username &&
      !newProps.userProfile.loading) {
      this.props.loadUserProfileInfo(newProps.match.params.username);
      this.props.loadHaprampUserDetails(newProps.match.params.username);
      this.props.getFollowCount(newProps.match.params.username);
      this.props.getUserFeeds(newProps.match.params.username);
    }
  }

  componentWillUnmount() {
    this.props.resetUserProfileInfo();
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
      <div className={['uk-container', 'uk-margin-top', 'uk-padding', 'uk-padding-remove-top', indexStyles.white].join(' ')}>
        {/* User details */}
        <UserCoverImage username={username} coverImageUrl={jsonMetadata.profile.cover_image} />
        <div className={['uk-text-center', 'uk-margin-top'].join(' ')}>
          <div>
            <span className={styles.userName}>{jsonMetadata.profile.name}</span>
            <span className="uk-margin-small-left">@{this.props.userProfile.user.name}</span>
          </div>
        </div>

        {this.props.match.params.username !== localStorage.getItem('username') &&
          <FollowButton following={this.props.match.params.username} />}

        <div className={['uk-margin-top', 'uk-text-center'].join(' ')}>
          <span>{this.props.userProfile.user.post_count} Post{this.props.userProfile.user.post_count === 1 ? '' : 's'}</span>
          <span
            className={['uk-margin-small-left'].join(' ')}
          >{this.props.userProfile.follower.count} Follower{this.props.userProfile.follower.count === 1 ? '' : 's'}
          </span>
          <span className={['uk-margin-small-left'].join(' ')}>{this.props.userProfile.following.count} Following</span>
        </div>

        <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-flex', 'uk-flex-center'].join(' ')}>
          <div className={['uk-text-center', styles.bio].join(' ')}>
            {jsonMetadata.profile.about || 'No bio provided.'}
          </div>
        </div>

        <div className={['uk-flex', 'uk-flex-center', 'uk-margin-large-bottom'].join(' ')}>
          <div className={[].join(' ')}>
            <div className={['uk-margin-top', 'uk-margin-bottom', styles.interestsHeader].join(' ')}>INTERESTS</div>
            <div className={['uk-flex'].join(' ')}>
              {this.props.allUsers.haprampUsers[this.props.match.params.username] &&
                this.props.allUsers.haprampUsers[this.props.match.params.username].communities &&
                this.props.allUsers.haprampUsers[this.props.match.params.username]
                  .communities
                  .map(community => (
                    <div key={community.id} className={['uk-flex', 'uk-flex-column', 'uk-text-center', 'uk-margin-right'].join(' ')}>
                      <div>
                        <img className={[styles.communityImage].join(' ')} src={community.image_uri} alt="" />
                      </div>
                      <div className={['uk-margin-small-top'].join(' ')}>{community.name}</div>
                    </div>))}
            </div>
          </div>
        </div>

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
  getFollowCount: PropTypes.func,
  getUserFeeds: PropTypes.func,
  getFollowers: PropTypes.func,
  getFollowing: PropTypes.func,
  loadHaprampUserDetails: PropTypes.func,
  resetUserProfileInfo: PropTypes.func,
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      json_metadata: PropTypes.shape({
        name: PropTypes.string,
      }),
      name: PropTypes.string.isRequired,
      post_count: PropTypes.number.isRequired,
    }),
    follower: PropTypes.shape({
      count: PropTypes.number,
    }),
    following: PropTypes.shape({
      count: PropTypes.number,
    }),
    blog: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  allUsers: PropTypes.shape({
    haprampUsers: PropTypes.shape({}),
  }),
};

UserProfile.defaultProps = {
  loadUserProfileInfo: () => { },
  getFollowCount: () => { },
  getUserFeeds: () => { },
  getFollowers: () => { },
  getFollowing: () => { },
  loadHaprampUserDetails: () => { },
  resetUserProfileInfo: () => { },
  userProfile: {},
  allUsers: {},
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  allUsers: state.allUsers,
});


export default connect(mapStateToProps, {
  loadUserProfileInfo,
  resetUserProfileInfo,
  getFollowCount,
  getUserFeeds,
  loadHaprampUserDetails,
  getFollowers,
  getFollowing,
  follow,
  unfollow,
})(UserProfile);