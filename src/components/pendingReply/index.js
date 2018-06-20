import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import styles from './styles.scss';
import { fixUser } from '../../utils/defaultFixUtils';

const PendingReply = props => (
  <div className={['uk-margin-bottom', styles.pendingReply].join(' ')}>
    <div>
      <img
        className={['uk-border-circle', styles.userImage].join(' ')}
        src={this.props.postingUser.json_metadata.profile.profile_image}
        alt={this.props.postingUser.name}
      />
      <span className={[styles.userName].join(' ')}>{this.props.postingUser.json_metadata.profile.name}</span>
    </div>
    <div
      className={[styles.replyBody].join(' ')}
      dangerouslySetInnerHTML={{
        __html: window.markdownToHtmlConverter.makeHtml(props.reply.body),
      }}
    />
  </div>
);

PendingReply.propTypes = {
  reply: Proptypes.shape({
    body: Proptypes.string,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let postingUser = state.allUsers.users[ownProps.reply.author];
  postingUser = fixUser(postingUser, ownProps.reply.author);
  return {
    postingUser,
  };
};

export default connect(mapStateToProps)(PendingReply);
