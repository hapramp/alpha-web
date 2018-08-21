import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const allowedSizes = [
  'small', 'medium', 'large',
];

const UserAvatar = ({
  username, size, ...props
}) => {
  const realSize = allowedSizes.filter(i => i === size)[0] || 'medium';
  return (
    <Link to={`/@${username}`} {...props}>
      <img
        src={`https://steemitimages.com/u/${username}/avatar/${realSize}`}
        className="uk-border-circle"
        alt=""
      />
    </Link>
  );
};

UserAvatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.string,
};

UserAvatar.defaultProps = {
  username: '',
  size: 'medium',
};

export default UserAvatar;
