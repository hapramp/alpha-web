import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';

import { follow, unfollow } from '../actions';

import { isFollowing } from '../reducer';
import { getAuthUsername } from '../../reducers/authUserReducer';

class FollowButton extends React.Component {
  static propTypes = {
    isFollowing: PropTypes.bool.isRequired,
    following: PropTypes.string,
    follower: PropTypes.string.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
  };

  static defaultProps = {
    following: null,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.follower !== nextProps.follwer
      || this.props.following !== nextProps.following
    );
  }

  follow = () => this.props.follow(this.props.following);

  unfollow = () => this.props.unfollow(this.props.following);

  render() {
    return (
      <div className={`uk-text-center ${styles.followButton}`}>
        {
          this.props.isFollowing
            ? (
              <button
                className="uk-button uk-button-default"
                onClick={this.unfollow}
              >
                Unfollow
              </button>
            )
            : (
              <button
                className="uk-button uk-button-primary"
                onClick={this.follow}
              >
                Follow
              </button>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const follower = getAuthUsername(state);
  const { following } = ownProps;
  return {
    isFollowing: isFollowing(state, follower, following),
    follower,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  follow, unfollow,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
