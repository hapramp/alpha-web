import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from '../../components/UserAvatar';
import styles from './styles.scss';

const UserCoverContainer = ({ username, coverImageUrl }) => {
  const AvatarSection = () => (
    <div className="uk-text-center">
      <UserAvatar
        username={username}
        size="medium"
        className={
          coverImageUrl
          ? styles.profileImage
          : styles.profileImageNoCover
        }
      />
    </div>
  );
  if (!coverImageUrl) {
    return <AvatarSection />;
  }
  return [
    <div
      className={`uk-cover-container ${styles.profileCoverContainer}`}
      style={{
        backgroundImage: `url(${coverImageUrl})`,
      }}
      key={`${username}-cover`}
    />,
    <AvatarSection key={`${username}-avatar`} />,
  ];
};

UserCoverContainer.propTypes = {
  username: PropTypes.string,
  coverImageUrl: PropTypes.string,
};

UserCoverContainer.defaultProps = {
  username: null,
  coverImageUrl: null,
};

export default UserCoverContainer;
