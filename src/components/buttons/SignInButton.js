import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLoginURL as getLoginURLAction } from '../../actions/loginActions';
import DefaultButton from './DefaultButton';

const SignInButton = ({
  location, children, getLoginURL, buttonComponent,
  ...props
}) => (
  <Link to={getLoginURL(location.pathname)}>
    <buttonComponent {...props}>
      {children}
    </buttonComponent>
  </Link>
);

SignInButton.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  getLoginURL: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func,
};

SignInButton.defaultProps = {
  children: 'LOG IN',
  buttonComponent: DefaultButton,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getLoginURL: getLoginURLAction,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(SignInButton));
