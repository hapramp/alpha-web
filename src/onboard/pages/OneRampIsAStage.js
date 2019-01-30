import React from 'react';

import leftImage from './stage@2x.png';
import styles from './styles.scss';

export default () => (
  <div className={styles.oneRampIsYou}>
    <div className={styles.left}>
      <img src={leftImage} alt="Share your creativity" />
    </div>
    <div className={styles.right}>
      <div className={styles.title}>
        Share your creativity
      </div>
      <div className={styles.body}>
        {'Share photos, write blogs and earn rewards when others rate your posts.'}
      </div>
    </div>
  </div>
);
