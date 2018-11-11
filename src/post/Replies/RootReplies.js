import React from 'react';
import PropTypes from 'prop-types';

import CreateReply from './CreateReply';
import Replies from './';

class RootReplies extends React.Component {
  static propTypes = {
    parentAuthor: PropTypes.string.isRequired,
    parentPermlink: PropTypes.string.isRequired,
    className: PropTypes.string,
    rootPost: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={`${this.props.className} uk-margin-large-top uk-margin-bottom`}>
        <CreateReply post={this.props.rootPost} />
        <Replies
          showNoReplies
          parentAuthor={this.props.parentAuthor}
          parentPermlink={this.props.parentPermlink}
        />
      </div>
    );
  }
}

export default RootReplies;
