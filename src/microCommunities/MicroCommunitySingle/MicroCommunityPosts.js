import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';

import PostCard from '../../post/PostCard';
import PostLoading from '../../post/PostLoading';
import { getMicroCommunityPosts } from '../actions';
import { getPostsForMicroCommunity } from '../reducer';
import styles from './styles.scss';

// Component for the top label (trending, hot, new) in posts section
const TabLabel = ({ tab, activeTab, changeTab }) => (
  <div
    className={tab === activeTab ? styles.active : ''}
    onClick={() => changeTab(tab)}
    onKeyUp={() => { }}
    role="button"
    tabIndex={0}
  >
    {tab.toUpperCase()}
  </div>
);

TabLabel.propTypes = {
  tab: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

const MicroCommunityPosts = ({
  tag, posts, fetchPosts, communityUsername,
}) => {
  const [tab, changeTab] = useState('selects'); // Handles logic for tab change

  useEffect(
    () => {
      fetchPosts(tag, tab);
    },
    [tab, tag], // Fetch posts when tag or tag changes
  );

  // Get permlinks for current tab
  const tabReal = tab === 'new' ? 'created' : tab;
  const permlinks = get(posts, `${tabReal}.posts`, []);
  const hasMore = get(posts, `${tabReal}.hasMore`, false);

  return (
    <div>
      <div className={styles.tabContainer}>
        <TabLabel activeTab={tab} changeTab={changeTab} tab="selects" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="trending" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="new" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="hot" />
      </div>
      <div className={styles.postCardListContainer}>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchPosts(tag, tab, false)}
          hasMore={hasMore}
          loader={<PostLoading key={0} />}
        >
          {
            permlinks.map(permlink => (
              <PostCard
                postPermlink={permlink}
                key={permlink}
                showPercentByUser={communityUsername}
              />
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

MicroCommunityPosts.propTypes = {
  tag: PropTypes.string.isRequired,
  posts: PropTypes.shape().isRequired,
  fetchPosts: PropTypes.func.isRequired,
  communityUsername: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  posts: getPostsForMicroCommunity(state, ownProps.tag),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { fetchPosts: getMicroCommunityPosts },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MicroCommunityPosts);
