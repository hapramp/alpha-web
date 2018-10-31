import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fixUser } from '../../../utils/defaultFixUtils';
import styles from './styles.scss';

const Reply = props => (
  <div className="uk-margin-medium-bottom">
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
        __html: window.markdownToHtmlConverter.makeHtml(props.reply.body),
      }}
    />
  </div>
);

Reply.propTypes = {
  postingUser: PropTypes.shape({
    name: PropTypes.string,
    json_metadata: PropTypes.shape({
      profile: PropTypes.shape({
        profile_image: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  }),
  reply: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
};

Reply.defaultProps = {
  postingUser: null,
};

const mapStateToprops = (state, ownprops) => {
  let postingUser = state.allUsers.users[ownprops.reply.author];
  postingUser = fixUser(postingUser, ownprops.reply.author);
  return {
    postingUser,
  };
};

export default connect(mapStateToprops)(Reply);
