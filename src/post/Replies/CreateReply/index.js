import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserAvatar from '../../../components/UserAvatar';

import styles from './styles.scss';
import indexStyles from '../../../styles/globals.scss';
import { addReply } from '../actions';
import { getAuthUsername } from '../../../reducers/authUserReducer';


class CreateReply extends React.Component {
  constructor(props) {
    super(props);
    this.replyInput = null;
    this.postReply = this.postReply.bind(this);
    this.setInputRef = (element) => { this.replyInput = element; };
    this.replyInput = null;
  }

  postReply() {
    if (!this.replyInput) {
      return;
    }
    let body = this.replyInput.value;
    body = body.trim();
    if (!body.length) {
      return;
    }
    this.props.addReply(this.props.post.author, this.props.post.permlink, body)
      .then(() => {
        this.replyInput.value = '';
      });
  }

  handleInputKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.postReply();
    }
  }

  render() {
    /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <div className="uk-flex">
        <UserAvatar
          className={`uk-border-circle ${styles.postingUserImage}`}
          username={this.props.authUsername}
        />
        <span className={styles.commentInputContainer}>
          <input
            ref={this.setInputRef}
            className={styles.commentInput}
            onKeyUp={this.handleInputKeyUp}
          />
          <span
            className={`${indexStyles.pointer} ${styles.sendIcon}`}
            onClick={this.postReply}
            onKeyDown={this.postReply}
            role="button"
            tabIndex={0}
          >
            Send
          </span>
        </span>
      </div>);
    /* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}

CreateReply.propTypes = {
  addReply: PropTypes.func,
  post: PropTypes.shape({
    author: PropTypes.string,
    permlink: PropTypes.string,
  }),
  authUsername: PropTypes.string,
};

CreateReply.defaultProps = {
  addReply: () => { },
  post: {
    author: '',
    permlink: '',
  },
  authUsername: null,
};

const mapStateToProps = state => ({
  authUsername: getAuthUsername(state),
});

export default connect(mapStateToProps, { addReply })(CreateReply);
