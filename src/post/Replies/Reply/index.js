import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';
import { bindActionCreators } from 'redux';

import { ratePost } from '../../ActionBar/actions';
import Replies from '../';
import CommentActionBar from './CommentActionBar';
import { fixUser } from '../../../utils/defaultFixUtils';
import styles from './styles.scss';
import { getAuthUsername } from '../../../reducers/authUserReducer';
import CreateReply from '../CreateReply';

class Reply extends React.Component {
  static propTypes = {
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
    ratePost: PropTypes.func.isRequired,
    authUsername: PropTypes.string,
    bottomMargin: PropTypes.bool,
  };

  static defaultProps = {
    postingUser: null,
    authUsername: '',
    bottomMargin: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showReplyInput: false,
    };
  }

  toggleReplyInput = () => {
    this.setState(state => ({ ...state, showReplyInput: !state.showReplyInput }));
  }

  render() {
    const {
      reply, postingUser, authUsername, ...otherProps
    } = this.props;
    const { showReplyInput } = this.state;
    return (
      <div className={styles.container} style={{ marginBottom: this.props.bottomMargin ? 32 : 0 }}>
        <div className={styles.headerContainer}>
          <Link to={`/@${reply.author}`}>
            <img
              className={`uk-border-circle ${styles.userImage}`}
              src={postingUser.json_metadata.profile.profile_image}
              alt={postingUser.name}
            />
            <span className={styles.userName}>
              {postingUser.json_metadata.profile.name}
            </span>
          </Link>
          &nbsp;|&nbsp;<TimeAgo>{new Date(`${reply.created}Z`)}</TimeAgo>
        </div>
        <div
          className={styles.replyBody}
          dangerouslySetInnerHTML={{
            __html: window.markdownToHtmlConverter.makeHtml(reply.body),
          }}
        />
        <CommentActionBar
          post={reply}
          ratePost={otherProps.ratePost}
          authUsername={authUsername}
          onReplyClick={this.toggleReplyInput}
        />
        {
          showReplyInput && (
            <div className={styles.replyInputContainer}>
              {/** TODO: Insert auth user's avatar here */}
              <CreateReply post={reply} />
            </div>
          )
        }
        {
          reply.replies.length > 0 && (
            <div className="uk-flex">
              <div style={{ width: 40 }} />
              <Replies
                showNoReplies={false}
                permlinks={reply.replies}
                key={reply.permlink}
              />
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToprops = (state, ownprops) => {
  let postingUser = state.allUsers.users[ownprops.reply.author];
  postingUser = fixUser(postingUser, ownprops.reply.author);
  const authUsername = getAuthUsername(state);
  return {
    postingUser,
    authUsername,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ratePost }, dispatch);

export default connect(mapStateToprops, mapDispatchToProps)(Reply);
