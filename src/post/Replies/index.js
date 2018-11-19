import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadReplies } from './actions';
import Reply from './Reply';
import styles from './styles.scss';
// import PendingReply from './PendingReply';
// import { getRepliesForPermlink } from './reducer';
import { getPostByPermlink } from '../reducer';

class Replies extends React.Component {
  static propTypes = {
    // loadReplies: PropTypes.func,
    replies: PropTypes.shape({
      length: PropTypes.number,
      loading: PropTypes.bool,
      replies: PropTypes.shape({}),
      pendingReplies: PropTypes.arrayOf(PropTypes.shape()),
    }),
    permlinks: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
  };

  static defaultProps = {
    // loadReplies: () => { },
    replies: {
      replies: {},
      pendingReplies: [],
    },
    permlinks: [],
  };

  render() {
    return (
      <div className={styles.repliesContainer}>
        {
          Object.values(this.props.replies)
            .map(reply => <Reply reply={reply} key={reply.id} />)
        }
        {
          /*
          this.props.replies.pendingReplies
            .map(reply => <PendingReply reply={reply} key={reply.body} />)
          */
        }
        {
          !Object.keys(this.props.replies).length
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
    replies: ownProps.permlinks.map(permlink => getPostByPermlink(state, permlink)),
    rootPost: getPostByPermlink(state, key),
  };
};

export default connect(mapStateToProps, {
  loadReplies,
})(Replies);
