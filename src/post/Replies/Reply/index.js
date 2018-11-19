import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';

import Replies from '../';
import CommentActionBar from './CommentActionBar';
import { fixUser } from '../../../utils/defaultFixUtils';
import styles from './styles.scss';

const Reply = props => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>
      <Link to={`/@${props.reply.author}`}>
        <img
          className={`uk-border-circle ${styles.userImage}`}
          src={props.postingUser.json_metadata.profile.profile_image}
          alt={props.postingUser.name}
        />
        <span className={styles.userName}>
          {props.postingUser.json_metadata.profile.name}
        </span>
      </Link>
      &nbsp;|&nbsp;<TimeAgo>{new Date(`${props.reply.created}Z`)}</TimeAgo>
    </div>
    <div
      className={styles.replyBody}
      dangerouslySetInnerHTML={{
        __html: window.markdownToHtmlConverter.makeHtml(props.reply.body),
      }}
    />
    <CommentActionBar post={props.reply} />
    {
      props.reply.replies.length > 0 && (
        <div className="uk-flex">
          <div style={{ width: 40 }} key={0} />
          <Replies
            showNoReplies={false}
            permlinks={props.reply.replies}
            key={props.reply.permlink}
          />
        </div>
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
    replies: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.string,
    permlink: PropTypes.string,
    created: PropTypes.string,
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
