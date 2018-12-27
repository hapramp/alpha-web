import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostCard from '../../post/PostCard';
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

const MicroCommunityPosts = ({ tag, posts, fetchPosts }) => {
  const [tab, changeTab] = useState('selects'); // Handles logic for tab change

  useEffect(
    () => {
      fetchPosts(tag, tab);
    },
    [tab, tag], // Fetch posts when tag or tag changes
  );

  // Get permlinks for current tab
  const permlinks = _.get(posts, `${tab}.posts`, []);

  return (
    <div>
      <div className={styles.tabContainer}>
        <TabLabel activeTab={tab} changeTab={changeTab} tab="selects" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="trending" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="new" />
        <TabLabel activeTab={tab} changeTab={changeTab} tab="hot" />
      </div>
      <div>
        {
          permlinks.map(permlink => (
            <PostCard postPermlink={permlink} key={permlink} />
          ))
        }
      </div>
    </div>
  );
};

MicroCommunityPosts.propTypes = {
  tag: PropTypes.string.isRequired,
  posts: PropTypes.shape().isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  posts: getPostsForMicroCommunity(state, ownProps.tag),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { fetchPosts: getMicroCommunityPosts },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MicroCommunityPosts);
