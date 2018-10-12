import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getFollowCount } from '../../actions';
import { getPostCount, getFollowerCount, getFollowingCount } from '../../reducer';

class UserDataCount extends React.Component {
  static propTypes = {
    getFollowCount: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    followingCount: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.getFollowCount(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.getFollowCount(nextProps.username);
  }

  render() {
    return (
      <div className="uk-margin-top uk-text-center">
        <span>{this.props.postCount} Post{this.props.postCount === 1 ? '' : 's'}</span>
        <span
          className={['uk-margin-small-left'].join(' ')}
        >
          {this.props.followerCount} Follower{this.props.followerCount === 1 ? '' : 's'}
        </span>
        <span
          className={['uk-margin-small-left'].join(' ')}
        >
          {this.props.followingCount} Following
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  postCount: getPostCount(state, ownProps.username),
  followerCount: getFollowerCount(state, ownProps.username),
  followingCount: getFollowingCount(state, ownProps.username),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFollowCount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserDataCount);
