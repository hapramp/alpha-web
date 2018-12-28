import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import MicroCommunityWidget from '../microCommunities/Widget';
import ExternalLinksWidget from '../components/ExternalLinksWidget';
import UserFeed from './UserFeed';
import TagFeed from './TagFeed';
import Sidebar from './SideBar';
import ExploreFeed from './Explore';
import styles from './styles.scss';

const secureUserFeed = connectedRouterRedirect({
  redirectPath: '/feed/new',
  authenticatedSelector: state => state.login.loggedIn,
  wrapperDisplayName: 'SecureUserFeed',
});

const Feed = () => (
  <div className="uk-container">
    <div uk-grid="true" className={`${styles.justifyCenterOn985} ${styles.feedWrapper}`}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <Switch>
        <Redirect exact strict from="/feed" to="/feed/" />
        <Route exact path="/feed/" component={secureUserFeed(UserFeed)} />
        <Redirect exact strict from="/feed/explore" to="/feed/explore/" />
        <Route exact path="/feed/explore/" component={ExploreFeed} />
        <Route exact path="/feed/:tag" component={TagFeed} />
      </Switch>
      <div className={`${styles.widgetContainer} uk-margin-small-top`}>
        <div>
          <MicroCommunityWidget />
          <ExternalLinksWidget />
        </div>
      </div>
    </div>
  </div>
);

export default Feed;
