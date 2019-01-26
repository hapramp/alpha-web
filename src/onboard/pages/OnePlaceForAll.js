import React from 'react';

import leftImage from './comm@2x.png';
import styles from './styles.scss';

export default () => (
  <div className={styles.oneRampIsYou}>
    <div className={styles.left}>
      <img src={leftImage} alt="1 Place for all" />
    </div>
    <div className={styles.right}>
      <div className={styles.title}>
        1Ramp is 1 Place for all
      </div>
      <div className={styles.body}>
        {'Join communities of your interest, discover exciting content, and see what happens when 8 creative domains engage on 1 platform.'}
      </div>
    </div>
  </div>
);
