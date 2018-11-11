import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Replies from '../';
import { fixUser } from '../../../utils/defaultFixUtils';
import styles from './styles.scss';

const Reply = props => (
  <div className="uk-margin-bottom">
    <div>
      <img
        className={`uk-border-circle ${styles.userImage}`}
        src={props.postingUser.json_metadata.profile.profile_image}
        alt={props.postingUser.name}
      />
      <span className={styles.userName}>
        {props.postingUser.json_metadata.profile.name}
      </span>
    </div>
    <div
      className={styles.replyBody}
      dangerouslySetInnerHTML={{
        __html: window.markdownToHtmlConverter.makeHtml(props.reply.body),
      }}
    />
    {
      props.reply.children > 0 && (
        <Replies
          showNoReplies={false}
          parentAuthor={props.reply.author}
          parentPermlink={props.reply.permlink}
        />
      )
    }
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
    body: PropTypes.string,
    children: PropTypes.number,
    author: PropTypes.string,
    permlink: PropTypes.string,
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
