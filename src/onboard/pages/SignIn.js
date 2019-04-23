import React from 'react';

import styles from './styles.scss';

import PrimaryButton from '../.././components/buttons/PrimaryButton';
import SignInButton from '../.././components/buttons/SignInButton';

export default () => (
  <div className={`uk-text-center uk-padding ${styles.signIn}`}>
    <div className={styles.title}>Start using 1Ramp!</div>
    <SignInButton ButtonComponent={PrimaryButton} className={`uk-align-center ${styles.signInButton}`}>
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
