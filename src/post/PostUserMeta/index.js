import React from 'react';
import TimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import UserAvatar from '../../components/UserAvatar';

const PostUserMeta = ({
  className, profile, created, communities,
}) => (
  <div className={[className || '', 'uk-flex', styles.paddingModerate, styles.topSection].join(' ')}>
    <UserAvatar size="small" username={profile.username} className={styles.userImage} />
    <div className={['uk-margin-left'].join(' ')}>
      <div className={[styles.userNameContainer].join(' ')}>
        <Link to={`/@${profile.username}`}>
          <span className={styles.userName}>{profile.name}</span>
        </Link> | <TimeAgo>{new Date(`${created}Z`)}</TimeAgo>
      </div>
      <div>
        {communities.map(community => (
          <span
            key={community.tag}
            style={{ backgroundColor: community.color || 'black' }}
            className={[styles.communityLabel].join(' ')}
          >
            <b>{community.name}</b>
          </span>))}
      </div>
    </div>
  </div>
);

PostUserMeta.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  created: PropTypes.string.isRequired,
  communities: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
  })),
};

PostUserMeta.defaultProps = {
  className: '',
  communities: [],
};

export default PostUserMeta;
