import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';
import PostLoading from '../post/PostLoading';

const ExploreFeed = ({
  loadExplorePosts, location, userFeed, hasMore,
}) => {
  useEffect(
    () => {
      loadExplorePosts();
    },
    [location.pathname],
  );
  return (
    <div className={styles.feedPosts}>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => loadExplorePosts(false)}
        hasMore={hasMore}
        loader={<PostLoading />}
        threshold={800}
      >
        {
          userFeed.posts && userFeed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
      </InfiniteScroll>
    </div>
  );
};

ExploreFeed.propTypes = {
  userFeed: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape),
    loading: PropTypes.bool,
  }),
  loadExplorePosts: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  hasMore: PropTypes.bool,
};

ExploreFeed.defaultProps = {
  userFeed: {
    posts: [],
    loading: false,
  },
  hasMore: true,
};

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
