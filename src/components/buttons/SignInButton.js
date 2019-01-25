import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLoginURL as getLoginURLAction } from '../../actions/loginActions';
import DefaultButton from './DefaultButton';

/**
 * This component renders a ButtonComponent which
 * is wrapped around with a link to SteemConnect
 * login page. It takes the current route from
 * context and passes it as state to getUrl method
 * for SteemConnect
 */
const SignInButton = ({
  location, children, getLoginURL, ButtonComponent,
  ...props
}) => (
  <a href={getLoginURL(location.pathname)}>
    <ButtonComponent {...props}>
      {children}
    </ButtonComponent>
  </a>
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
  ButtonComponent: PropTypes.func,
};

SignInButton.defaultProps = {
  children: 'LOG IN',
  ButtonComponent: DefaultButton,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getLoginURL: getLoginURLAction,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(SignInButton));
