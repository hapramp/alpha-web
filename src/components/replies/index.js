import React from 'react';
import { connect } from 'react-redux';

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
    if (!this.props.replies) {
      return (<div>
				Loading...
              </div>);
    }
    return (<div className={[this.props.className, 'uk-margin-large-top', 'uk-margin-bottom'].join(' ')}>
      {this.props.replies.loading && <div className={['uk-text-center', styles.status].join(' ')}>Loading...</div>}
      {Object.values(this.props.replies.replies).map(reply => <Reply reply={reply} key={reply.id} />)}
      {this.props.replies.pendingReplies.map((reply, idx) => <PendingReply reply={reply} key={idx} />)}
      {!this.props.replies.loading && !Object.keys(this.props.replies.replies).length && !this.props.replies.pendingReplies.length
				&& <div className={['uk-text-center', styles.status].join(' ')}>No replies</div>}
      <CreateReply post={this.props.rootPost} />
            </div>);
  }
}

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
