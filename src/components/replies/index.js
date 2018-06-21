import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadReplies } from '../../actions/repliesActions';
import Reply from '../reply';
import styles from './styles.scss';
import CreateReply from '../createReply';
import PendingReply from '../pendingReply';

class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadReplies(this.props.parentAuthor, this.props.parentPermlink);
  }

  render() {
    if (!this.props.replies || this.props.replies.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className={[this.props.className, 'uk-margin-large-top', 'uk-margin-bottom'].join(' ')}>
        {this.props.replies.loading && <div className={['uk-text-center', styles.status].join(' ')}>Loading...</div>}
        {Object.values(this.props.replies.replies)
          .map(reply => <Reply reply={reply} key={reply.id} />)}
        {this.props.replies.pendingReplies
          .map(reply => <PendingReply reply={reply} key={reply.body} />)}
        {!this.props.replies.loading &&
          !Object.keys(this.props.replies.replies).length &&
          !this.props.replies.pendingReplies.length &&
          <div className={['uk-text-center', styles.status].join(' ')}>No replies</div>}
        <CreateReply post={this.props.rootPost} />
      </div>);
  }
}

Replies.propTypes = {
  loadReplies: PropTypes.func,
  parentAuthor: PropTypes.string.isRequired,
  parentPermlink: PropTypes.string.isRequired,
  replies: PropTypes.shape({
    length: PropTypes.number,
    loading: PropTypes.bool,
    replies: PropTypes.shape({}),
    pendingReplies: PropTypes.arrayOf(PropTypes.shape()),
  }),
  className: PropTypes.string,
  rootPost: PropTypes.shape().isRequired,
};

Replies.defaultProps = {
  loadReplies: () => {},
  replies: {
    replies: {},
    pendingReplies: [],
  },
  className: '',
};

const mapStateToProps = (state, ownProps) => {
  const key = `${ownProps.parentAuthor}/${ownProps.parentPermlink}`;
  const replies = state.replies[key];
  return {
    replies,
    rootPost: state.allPosts.posts[key],
  };
};

export default connect(mapStateToProps, {
  loadReplies,
})(Replies);
