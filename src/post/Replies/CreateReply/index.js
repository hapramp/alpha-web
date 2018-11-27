import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../../styles/globals.scss';
import { addReply } from '../actions';
import { getIcon } from '../../../icons';


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

  render() {
    /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <div className={['uk-flex', styles.createReplyContainer].join(' ')}>
        <img className={['uk-border-circle', styles.postingUserImage].join(' ')} alt={localStorage.getItem('username')} src={localStorage.getItem('avatar')} />
        <span className={[styles.commentInputContainer].join(' ')}>
          <input ref={this.setInputRef} className={[styles.commentInput].join(' ')} />
          <img
            src={getIcon('comment_add', 'outline')}
            alt="Send"
            className={['far', 'fa-paper-plane', indexStyles.pointer, styles.sendIcon].join(' ')}
            onClick={this.postReply}
            onKeyDown={this.postReply}
            role="button"
            tabIndex={0}
          />
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
};

CreateReply.defaultProps = {
  addReply: () => { },
  post: {
    author: '',
    permlink: '',
  },
};

export default connect(null, { addReply })(CreateReply);
