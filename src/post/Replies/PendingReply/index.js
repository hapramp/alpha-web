import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import styles from './styles.scss';
import { getCompleteHTML } from '../../utils';
import { fixUser } from '../../../utils/defaultFixUtils';

const PendingReply = props => (
  <div className={['uk-margin-bottom', styles.pendingReply].join(' ')}>
    <div>
      <img
        className={['uk-border-circle', styles.userImage].join(' ')}
        src={props.postingUser.json_metadata.profile.profile_image}
        alt={props.postingUser.name}
      />
      <span className={[styles.userName].join(' ')}>{props.postingUser.json_metadata.profile.name}</span>
    </div>
    <div
      className={[styles.replyBody].join(' ')}
      dangerouslySetInnerHTML={{
        __html: getCompleteHTML(props.reply.body),
      }}
    />
  </div>
);

PendingReply.propTypes = {
  reply: Proptypes.shape({
    body: Proptypes.string,
  }).isRequired,
  postingUser: Proptypes.shape().isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let postingUser = state.allUsers.users[ownProps.reply.author];
  postingUser = fixUser(postingUser, ownProps.reply.author);
  return {
    postingUser,
  };
};

export default connect(mapStateToProps)(PendingReply);
