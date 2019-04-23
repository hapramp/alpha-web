import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';

import PrimaryButton from '../.././components/buttons/PrimaryButton';
import SignInButton from '../.././components/buttons/SignInButton';
import { getLoginURL } from '../../actions/loginActions';

const SignInModal = props => (
  <div className={`uk-text-center uk-padding ${styles.signIn}`}>
    <div className={styles.title}>Start using 1Ramp!</div>
    <SignInButton
      ButtonComponent={PrimaryButton}
      className={`uk-align-center ${styles.signInButton}`}
      onClick={() => { window.location = props.getLoginURL(); }}
    >
      Sign in using SteemConnect
    </SignInButton>
    <div className={styles.signUpHelp}>
      <span>New on 1Ramp?</span>
      <span>
        <a href="https://1ramp.io/" target="_blank" rel="noopener noreferrer">
          Request an invite.
        </a>
        <span
          uk-tooltip="1Ramp is only available for Steem users. If you do not have a Steem account, please join the invite list. We’ll notify you when it’s ready."
          className={styles.questionMark}
        >
          ?
        </span>
      </span>
    </div>
  </div>
);

SignInModal.propTypes = {
  getLoginURL: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { getLoginURL },
  dispatch,
);

export default connect(null, mapDispatchToProps)(SignInModal);
