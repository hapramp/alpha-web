import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostLoading from '../post/PostLoading';
import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';

const TagFeed = (props) => {
  const tag = props.match.params.tag.replace('hapramp-', '');

  useEffect(
    () => {
      props.loadFeedsForTag(tag);
    },
    [tag],
  );
  return (
    <div className={styles.feedPosts}>
      {
        props.feed.posts && props.feed.posts.map(post =>
          <PostCard key={post} postPermlink={post} />)
      }
      {
        props.feed.loading && <PostLoading />
      }
    </div>
  );
};

TagFeed.propTypes = {
  feed: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape)),
  loadFeedsForTag: PropTypes.func,
  match: PropTypes.shape(),
};

TagFeed.defaultProps = {
  feed: {
    posts: [],
  },
  loadFeedsForTag: () => { },
  match: {
    params: {
      tag: '',
    },
  },
};

const mapStateToProps = (state, ownProps) => ({
  feed: state.userFeed[ownProps.match.params.tag.replace('hapramp-', '')],
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadFeedsForTag: userFeedActions.loadFeedsForTag,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(TagFeed);
