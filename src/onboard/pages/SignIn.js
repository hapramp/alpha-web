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
        <a href="https://signup.steemit.com/" target="_blank" rel="noopener noreferrer">
          Create a Steem account.
        </a>
      </span>
    </div>
  </div>
);
