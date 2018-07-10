import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignOut = ({ onSignOut }) => {
  onSignOut();
  return <Redirect to="/" />;
};

SignOut.propTypes = {
  onSignOut: PropTypes.func,
};

SignOut.defaultProps = {
  onSignOut: () => {},
};

export default SignOut;
