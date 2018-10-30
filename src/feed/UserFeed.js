import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import * as allUserActions from '../actions/allUserActions';
import PostCard from '../post/PostCard';

class UserFeed extends React.Component {
  static propTypes = {
    userFeed: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape),
      loading: PropTypes.bool,
    }),
    loadFeedsForUser: PropTypes.func,
    username: PropTypes.string,
  };

  static defaultProps = {
    userFeed: {
      posts: [],
      loading: false,
    },
    loadFeedsForUser: () => {},
    username: null,
  };

  constructor(props) {
    super(props);
    if (this.props.username) {
      this.props.loadFeedsForUser(this.props.username);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.username !== this.props.username) {
      this.props.loadFeedsForUser(newProps.username);
    }
  }

  render() {
    return (
      <div className={`uk-margin-small-top ${styles.feedPosts}`}>
        {
          this.props.userFeed.posts && this.props.userFeed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userFeed: state.userFeed.user,
  username: state.authUser.username,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadFeedsForUser: userFeedActions.loadFeedsForUser,
    loadUserAccounts: allUserActions.loadUserAccounts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);
