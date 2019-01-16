import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Helmet from 'react-helmet-async';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import * as allUserActions from '../actions/allUserActions';
import { hasMoreFeed } from '../reducers/userFeedReducer';
import PostCard from '../post/PostCard';
import { getAuthUsername } from '../reducers/authUserReducer';
import PostLoading from '../post/PostLoading';

const UserFeed = (props) => {
  useEffect(
    () => {
      if (props.authUsername) {
        props.loadFeedsForUser(props.authUsername);
      }
    },
    [props.authUsername],
  );
  return (
    <div className={styles.feedPosts}>
      <Helmet>
        <title>My Feed | 1Ramp</title>
        <meta name="og:url" content="https://alpha.1ramp.io/feed" />
      </Helmet>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.loadFeedsForUser(props.authUsername)}
        hasMore={props.hasMore}
        loader={<PostLoading />}
      >
        {
          props.userFeed.posts && props.userFeed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
      </InfiniteScroll>
    </div>
  );
};


UserFeed.propTypes = {
  userFeed: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape),
    loading: PropTypes.bool,
  }),
  loadFeedsForUser: PropTypes.func,
  authUsername: PropTypes.string,
  hasMore: PropTypes.bool.isRequired,
};

UserFeed.defaultProps = {
  userFeed: {
    posts: [],
    loading: false,
  },
  loadFeedsForUser: () => { },
  authUsername: null,
};

const mapStateToProps = state => ({
  userFeed: state.userFeed.user,
  authUsername: getAuthUsername(state),
  hasMore: hasMoreFeed(state, 'user'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadFeedsForUser: userFeedActions.loadFeedsForUser,
    loadUserAccounts: allUserActions.loadUserAccounts,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);
