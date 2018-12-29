import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';
import PostLoading from '../post/PostLoading';

class ExploreFeed extends React.Component {
  static propTypes = {
    userFeed: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape),
      loading: PropTypes.bool,
    }),
    loadExplorePosts: PropTypes.func.isRequired,
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
    this.props.loadExplorePosts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.props.loadExplorePosts();
    }
  }

  render() {
    return (
      <div className={styles.feedPosts}>
        {
          this.props.userFeed.posts && this.props.userFeed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
        {
          this.props.userFeed.loading && <PostLoading />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userFeed: state.userFeed.explore,
  username: state.authUser.username,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadExplorePosts: userFeedActions.loadExplorePosts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFeed);
