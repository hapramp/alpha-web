import React from 'react';

import leftImage from './contest@2x.png';
import styles from './styles.scss';

export default () => (
  <div className={styles.oneRampIsYou}>
    <div className={styles.left}>
      <img src={leftImage} alt="1 Place for all" />
    </div>
    <div className={styles.right}>
      <div className={styles.title}>
        1Ramp is you
      </div>
      <div className={styles.body}>
        {"It's time you stop giving your creative work for free. Own your content, collaborate, and do what you love."}
      </div>
    </div>
  </div>
);
