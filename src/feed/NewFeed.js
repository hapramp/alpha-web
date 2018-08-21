import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';

class UserFeed extends React.Component {
  static propTypes = {
    userFeed: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape),
      loading: PropTypes.bool,
    }),
    loadNewPosts: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    userFeed: {
      posts: [],
      loading: false,
    },
  };

  constructor(props) {
    super(props);
    this.props.loadNewPosts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.props.loadNewPosts();
    }
  }

  render() {
    return (
      <div className={`uk-margin-top ${styles.feedPosts}`}>
        {
          this.props.userFeed.posts && this.props.userFeed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userFeed: state.userFeed.new,
  username: state.authUser.username,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadNewPosts: userFeedActions.loadNewPosts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);
