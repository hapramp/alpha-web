import React from 'react';

import UserFeed from './UserFeed';
import AddContentButton from '../components/addContentButton';
import Sidebar from './SideBar';
import styles from './styles.scss';

const Feed = () => (
  <div className="uk-container">
    <div uk-grid="true">
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <UserFeed />
      <AddContentButton />
    </div>
  </div>
);

export default Feed;
