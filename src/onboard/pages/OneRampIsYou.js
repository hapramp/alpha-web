import React from 'react';

import leftImage from './contest@2x.png';
import styles from './styles.scss';

export default () => (
  <div className={styles.oneRampIsYou}>
    <div className={styles.left}>
      <img src={leftImage} alt="Participate in Contests" />
    </div>
    <div className={styles.right}>
      <div className={styles.title}>
        Participate in Contests
      </div>
      <div className={styles.body}>
        {'Participate in contests and win exciting prizes.'}
      </div>
    </div>
  </div>
);
