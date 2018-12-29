import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import * as allUserActions from '../actions/allUserActions';
import { hasMoreFeed } from '../reducers/userFeedReducer';
import PostCard from '../post/PostCard';
import { getAuthUsername } from '../reducers/authUserReducer';

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
      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.loadFeedsForUser(props.authUsername)}
        hasMore={props.hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
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
