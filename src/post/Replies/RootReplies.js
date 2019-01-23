import React from 'react';
import PropTypes from 'prop-types';

import CreateReply from './CreateReply';
import Replies from './';

import styles from './styles.scss';
import PrimaryButton from '../../components/buttons/PrimaryButton';

class RootReplies extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    rootPost: PropTypes.shape().isRequired,
    permlinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    displayReplyInput: false,
  };

  render() {
    const { displayReplyInput } = this.state;
    return (
      <div className={`${this.props.className} uk-margin-bottom ${styles.rootRepliesStyle}`}>
        {
          displayReplyInput ? (
            <CreateReply
              post={this.props.rootPost}
              onReplyPosted={() => this.setState({ ...this.state, displayReplyInput: false })}
            />
          ) : (
            <PrimaryButton
              className={styles.addReplyButton}
              onClick={() => this.setState({ ...this.state, displayReplyInput: true })}
            >
              Add Reply
            </PrimaryButton>
          )
        }
        <Replies
          showNoReplies
          permlinks={this.props.permlinks}
          bottomMargin
        />
      </div>
    );
  }
}

export default RootReplies;
