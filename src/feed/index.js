import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import UserFeed from './UserFeed';
import TagFeed from './TagFeed';
import AddContentButton from '../components/addContentButton';
import Sidebar from './SideBar';
import styles from './styles.scss';

const secureUserFeed = connectedRouterRedirect({
  redirectPath: '/browse',
  authenticatedSelector: state => state.login.loggedIn,
  wrapperDisplayName: 'SecureUserFeed',
});

const Feed = () => (
  <div className="uk-container">
    <div uk-grid="true">
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <Switch>
        <Redirect exact strict from="/feed" to="/feed/" />
        <Route exact path="/feed/" component={secureUserFeed(UserFeed)} />
        <Route exact path="/feed/:tag" component={TagFeed} />
      </Switch>
      <AddContentButton />
    </div>
  </div>
);

export default Feed;
