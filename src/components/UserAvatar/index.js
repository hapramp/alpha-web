import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const allowedSizes = [
  'small', 'medium', 'large',
];

const UserAvatar = ({
  username, size, className, tooltip,
  noLink, ...props
}) => {
  const realSize = allowedSizes.filter(i => i === size)[0] || 'medium';
  const tooltipProp = tooltip ? { 'uk-tooltip': `@${username}` } : {};
  const childProps = {
    className: `${styles.avatarContainer} ${className}`,
    ...props,
    style: {
      backgroundImage: `url(https://steemitimages.com/u/${username}/avatar/${realSize})`,
    },
    ...tooltipProp,
  };
  if (!noLink) {
    childProps.to = `/@${username}`;
  }
  if (noLink) {
    return <div {...childProps} />;
  }
  return <Link {...childProps} />;
};

UserAvatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  noLink: PropTypes.bool,
};

UserAvatar.defaultProps = {
  username: '',
  size: 'medium',
  className: '',
  tooltip: false,
  noLink: false,
};

export default UserAvatar;
