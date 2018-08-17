import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss';
import * as userFeedActions from '../actions/userFeedActions';
import PostCard from '../post/PostCard';

class TagFeed extends React.Component {
  static propTypes = {
    feed: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape)),
    loadFeedsForTag: PropTypes.func,
    match: PropTypes.shape(),
  };

  static defaultProps = {
    feed: {
      posts: [],
    },
    loadFeedsForTag: () => {},
    match: {
      params: {
        tag: '',
      },
    },
  };

  constructor(props) {
    super(props);
    this.props.loadFeedsForTag(this.props.match.params.tag.replace('hapramp-', ''));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.tag !== this.props.match.params.tag) {
      this.props.loadFeedsForTag(newProps.match.params.tag.replace('hapramp-', ''));
    }
  }

  render() {
    return (
      <div className={`uk-margin-top ${styles.feedPosts}`}>
        {
          this.props.feed.posts && this.props.feed.posts.map(post =>
            <PostCard key={post} postPermlink={post} />)
        }
      </div>
    );
  }
}

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
