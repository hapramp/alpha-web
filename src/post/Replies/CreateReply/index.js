import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryButton from '../../../components/buttons/PrimaryButton';
import UserAvatar from '../../../components/UserAvatar';
import MarkdownEditor from '../../create/CreateArticle/MarkdownEditor';

import styles from './styles.scss';
import { addReply } from '../actions';
import { getAuthUsername } from '../../../reducers/authUserReducer';

class CreateReply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replyContent: `@${this.props.post.author} `,
      postingReply: false,
    };

    this.setReplyContent = this.setReplyContent.bind(this);
    this.postReply = this.postReply.bind(this);
  }

  setReplyContent(text) {
    this.setState({ ...this.state, replyContent: text });
  }

  postReply() {
    if (!this.state.replyContent) {
      return;
    }
    let body = this.state.replyContent;
    body = body.trim();
    if (!body.length) {
      return;
    }
    this.setState({ ...this.state, postingReply: true });
    this.props.addReply(this.props.post.author, this.props.post.permlink, body)
      .then(() => {
        this.setState({ ...this.state, postingReply: false });
        this.setReplyContent('');
        this.props.onReplyPosted(body);
      });
  }

  render() {
    return (
      <div className="uk-flex">
        <UserAvatar
          className={`uk-border-circle ${styles.postingUserImage}`}
          username={this.props.authUsername}
        />
        <span className={styles.commentInputContainer}>
          <MarkdownEditor
            bodyMarkdown={this.state.replyContent}
            onChange={this.setReplyContent}
            startRows={1}
            hidePreviewText
          />
        </span>
        <PrimaryButton
          className={styles.sendButton}
          onClick={this.postReply}
          disabled={this.state.postingReply}
        >
          Send
        </PrimaryButton>
      </div>
    );
  }
}

CreateReply.propTypes = {
  addReply: PropTypes.func,
  post: PropTypes.shape({
    author: PropTypes.string,
    permlink: PropTypes.string,
  }),
  authUsername: PropTypes.string,
  onReplyPosted: PropTypes.func,
};

CreateReply.defaultProps = {
  addReply: () => { },
  post: {
    author: '',
    permlink: '',
  },
  authUsername: null,
  onReplyPosted: () => { },
};

const mapStateToProps = state => ({
  authUsername: getAuthUsername(state),
});

export default connect(mapStateToProps, { addReply })(CreateReply);
