import React from 'react';
import PropTypes from 'prop-types';

import CreateReply from './CreateReply';
import Replies from './';

import styles from './styles.scss';

class RootReplies extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    rootPost: PropTypes.shape().isRequired,
    permlinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={`${this.props.className} uk-margin-large-top uk-margin-bottom ${styles.rootRepliesStyle}`}>
        <CreateReply post={this.props.rootPost} />
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
