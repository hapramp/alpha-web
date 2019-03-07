import React from 'react';

import styles from './styles.scss';

const ViewContainer = props => (
  <div className={styles.viewWrapper}>
    <div className={styles.viewContainer} {...props} />
  </div>
);

export default ViewContainer;
