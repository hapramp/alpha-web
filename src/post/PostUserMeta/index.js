import React from 'react';
import TimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const PostUserMeta = props => (
  <div className={[props.className ? props.className : '', 'uk-flex', styles.paddingModerate, styles.topSection].join(' ')}>
    <Link to={`/@${props.profile.username}`}>
      <img src={props.profile.image} className={['uk-border-circle', styles.userImage].join(' ')} alt="" />
    </Link>
    <div className={['uk-margin-left'].join(' ')}>
      <div className={[styles.userNameContainer].join(' ')}>
        <Link to={`/@${props.profile.username}`}>
          <span className={styles.userName}>{props.profile.name || props.profile.username}</span>
        </Link> | <TimeAgo>{new Date(`${props.created}Z`)}</TimeAgo>
      </div>
      <div>
        {props.communities.map(community => (
          <span key={community.tag} style={{ backgroundColor: community.color || 'white' }} className={[styles.communityLabel].join(' ')}>
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
    image: PropTypes.string,
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
