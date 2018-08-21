import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import UserFeed from './UserFeed';
import TagFeed from './TagFeed';
import NewFeed from './NewFeed';
import AddContentButton from '../components/addContentButton';
import Sidebar from './SideBar';
import styles from './styles.scss';

const secureUserFeed = connectedRouterRedirect({
  redirectPath: '/feed/new',
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
        <Redirect exact strict from="/feed/new" to="/feed/new/" />
        <Route exact path="/feed/new" component={NewFeed} />
        <Route exact path="/feed/:tag" component={TagFeed} />
      </Switch>
      <AddContentButton />
    </div>
  </div>
);

export default Feed;
