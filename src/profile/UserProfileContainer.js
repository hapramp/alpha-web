import React from 'react';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';

const UserProfileContainer = ({ match }) => (
  <UserProfile username={match.params.username} />
);

UserProfileContainer.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default UserProfileContainer;
