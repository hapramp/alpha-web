import React from 'react';
import TimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

class PostUserMeta extends React.Component {
  render() {
    return (<div className={[this.props.className ? this.props.className : '', 'uk-flex', styles.paddingModerate, styles.topSection].join(' ')}>
      <Link to={`/@${this.props.profile.username}`}>
        <img src={this.props.profile.image} className={['uk-border-circle', styles.userImage].join(' ')} alt="" />
      </Link>
      <div className={['uk-margin-left'].join(' ')}>
        <div className={[styles.userNameContainer].join(' ')}>
          <Link to={`/@${this.props.profile.username}`}>
            <span className={styles.userName}>{this.props.profile.name}</span>
          </Link> | <TimeAgo>{new Date(`${this.props.created}Z`)}</TimeAgo>
        </div>
        <div>
          {this.props.communities.map((community, idx) => <span key={idx} style={{ backgroundColor: community.color }} className={[styles.communityLabel].join(' ')}><b>{community.name}</b></span>)}
        </div>
      </div>
    </div>);
  }
}

export default PostUserMeta;
