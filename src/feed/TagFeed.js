import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet-async';

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
  const capitalizedTag = tag[0].toUpperCase() + tag.slice(1);
  return (
    <div className={styles.feedPosts}>
      <Helmet>
        <title>{capitalizedTag} | 1Ramp</title>
        <meta name="description" content={`${capitalizedTag} on 1Ramp`} />
        <meta name="twitter:title" content={`${capitalizedTag} | 1Ramp`} />
        <meta name="og:title" content={`${capitalizedTag} | 1Ramp`} />
        <meta name="twitter:description" content={`${capitalizedTag} on 1Ramp`} />
        <meta name="og:description" content={`${capitalizedTag} on 1Ramp`} />
        <meta name="og:url" content={`https://alpha.1ramp.io/feed/${props.match.params.tag}`} />
      </Helmet>
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
