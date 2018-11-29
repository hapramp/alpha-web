import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const allowedSizes = [
  'small', 'medium', 'large',
];

const UserAvatar = ({
  username, size, className, ...props
}) => {
  const realSize = allowedSizes.filter(i => i === size)[0] || 'medium';
  return (
    <Link
      to={`/@${username}`}
      className={`${styles.avatarContainer} ${className}`}
      {...props}
      style={{
        backgroundImage: `url(https://steemitimages.com/u/${username}/avatar/${realSize})`,
      }}
    />
  );
};

UserAvatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

UserAvatar.defaultProps = {
  username: '',
  size: 'medium',
  className: '',
};

export default UserAvatar;
