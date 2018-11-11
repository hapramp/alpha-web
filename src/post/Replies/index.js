import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadReplies } from './actions';
import Reply from './Reply';
import styles from './styles.scss';
import PendingReply from './PendingReply';
import { getRepliesForPermlink } from './reducer';
import { getPostByPermlink } from '../reducer';

class Replies extends React.Component {
  static propTypes = {
    loadReplies: PropTypes.func,
    parentAuthor: PropTypes.string.isRequired,
    parentPermlink: PropTypes.string.isRequired,
    replies: PropTypes.shape({
      length: PropTypes.number,
      loading: PropTypes.bool,
      replies: PropTypes.shape({}),
      pendingReplies: PropTypes.arrayOf(PropTypes.shape()),
    }),
  };

  static defaultProps = {
    loadReplies: () => { },
    replies: {
      replies: {},
      pendingReplies: [],
    },
  };

  componentDidMount() {
    this.props.loadReplies(this.props.parentAuthor, this.props.parentPermlink);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.parentAuthor !== nextProps.parentAuthor
      || this.props.parentPermlink !== nextProps.parentPermlink
    ) {
      this.props.loadReplies(nextProps.parentAuthor, nextProps.parentPermlink);
    }
  }

  render() {
    if (!this.props.replies) {
      return <div>Loading...</div>;
    }
    return (
      <div className={styles.repliesContainer}>
        {
          this.props.replies.loading && (
            <div className={`uk-text-center ${styles.status}`}>
              Loading...
            </div>
          )
        }
        {
          Object.values(this.props.replies.replies)
            .map(reply => <Reply reply={reply} key={reply.id} />)
        }
        {
          this.props.replies.pendingReplies
            .map(reply => <PendingReply reply={reply} key={reply.body} />)
        }
        {
          !this.props.replies.loading
          && !Object.keys(this.props.replies.replies).length
          && !this.props.replies.pendingReplies.length
          && (
            <div className={`uk-text-center ${styles.status}`}>
              No replies
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const key = `${ownProps.parentAuthor}/${ownProps.parentPermlink}`;
  return {
    replies: getRepliesForPermlink(state, key),
    rootPost: getPostByPermlink(state, key),
  };
};

export default connect(mapStateToProps, {
  loadReplies,
})(Replies);
