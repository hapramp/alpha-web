import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';

import PostLoading from '../../../post/PostLoading';
import PostCard from '../../../post/PostCard';

import styles from './styles.scss';
// import indexStyles from '../../../styles/globals.scss';
import { getUserBlogPosts, hasMoreFeed } from '../../reducer';
import { getUserFeeds } from '../../actions';

const UserBlog = (props) => {
  useEffect(
    () => {
      props.getUserFeeds(props.username);
    },
    [props.username],
  );
  return (
    <div className={`uk-flex uk-flex-center ${styles.userPostsContainer}`}>
      <div className={styles.blogContainer}>
        <div className={`uk-margin-medium-top uk-margin-medium-bottom ${styles.blogHeader}`}>LATEST</div>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => props.getUserFeeds(props.username)}
          hasMore={props.hasMore}
          loader={<PostLoading />}
        >
          {props.posts.map(item => (
            <PostCard
              key={item}
              postPermlink={item}
              border
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

UserBlog.propTypes = {
  getUserFeeds: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hasMore: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  posts: getUserBlogPosts(state, ownProps.username),
  hasMore: hasMoreFeed(state, ownProps.username),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserFeeds,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserBlog);
