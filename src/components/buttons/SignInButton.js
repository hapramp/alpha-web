import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showSignIn as showSignInAction } from '../../onboard/actions';
import DefaultButton from './DefaultButton';

/**
 * This component renders a ButtonComponent which
 * is wrapped around with a link to SteemConnect
 * login page. It takes the current route from
 * context and passes it as state to getUrl method
 * for SteemConnect
 */
const SignInButton = ({
  location, children, ButtonComponent,
  showSignIn, ...props
}) => (
  <ButtonComponent onClick={showSignIn} {...props}>
    {children}
  </ButtonComponent>
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
  ButtonComponent: PropTypes.func,
  showSignIn: PropTypes.func.isRequired,
};

SignInButton.defaultProps = {
  children: 'LOG IN',
  ButtonComponent: DefaultButton,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showSignIn: showSignInAction,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(SignInButton));
