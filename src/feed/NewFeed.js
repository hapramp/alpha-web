import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet-async';

import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';

import styles from './styles.scss';
import PostLoading from '../post/PostLoading';

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
      <div className={`uk-margin-top ${styles.feedContainer}`}>
        <Helmet>
          <title>New Posts | 1Ramp</title>
          <meta name="description" content="See the latest posts on the 1Ramp platform" />
          <meta name="twitter:title" content="New Posts | 1Ramp" />
          <meta name="og:title" content="New Posts | 1Ramp" />
          <meta name="twitter:description" content="See the latest posts on the 1Ramp platform" />
          <meta name="og:description" content="See the latest posts on the 1Ramp platform" />
          <meta name="og:url" content="https://alpha.1ramp.io/search" />
        </Helmet>
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
