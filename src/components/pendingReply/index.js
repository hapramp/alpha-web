import React from 'react';

import styles from './styles.scss';
import { connect } from 'react-redux';
import { fixUser } from '../../utils/defaultFixUtils';

class PendingReply extends React.Component {
  render() {
    console.log(styles);
    return (<div className={['uk-margin-bottom', styles.pendingReply].join(' ')}>
      <div>
        <img className={['uk-border-circle', styles.userImage].join(' ')} src={this.props.postingUser.json_metadata.profile.profile_image} alt={this.props.postingUser.name} />
        <span className={[styles.userName].join(' ')}>{this.props.postingUser.json_metadata.profile.name}</span>
      </div>
      <div
        className={[styles.replyBody].join(' ')}
        dangerouslySetInnerHTML={{ __html: window.markdownToHtmlConverter.makeHtml(this.props.reply.body) }}
      />
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  let postingUser = state.allUsers.users[ownProps.reply.author];
  postingUser = fixUser(postingUser, ownProps.reply.author);
  return {
    postingUser,
  };
};

export default connect(mapStateToProps)(PendingReply);
