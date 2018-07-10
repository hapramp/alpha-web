import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { authRequiredComponent } from '../../utils/decorators';
import { logout as signOut } from '../../actions/loginActions';
import getStore from '../../utils/storeUtils';
import Header from '../header';
import Feed from '../feed';
import CreatePost from '../createPost';
import UserProfile from '../userProfile';
import Browse from '../browse';
import BrowseCommunity from '../browseCommunity';
import CreateArticle from '../createArticle';
import ContentSingle from '../contentSingle';
import OAuthCallback from '../OAuthCallback';
import SignOut from '../SignOut';
import Search from '../../search';

const Root = () => (
  <div style={{ backgroundColor: '#FAFAFA' }}>
    <Header />
    <Switch>
      {/* Entry check */}
      <Route
        exact
        path="/"
        render={() => {
        if (getStore().getState().login.loggedIn) {
          return <Redirect to="/feed" />;
        }
          return <Redirect to="/browse" />;
      }}
      />

      {/* User based feed */}
      <Route exact path="/feed" component={authRequiredComponent(Feed)} />

      {/* Browse views */}
      <Route exact path="/browse" component={Browse} />
      <Route
        exact
        path="/browse/:community"
        render={({ match }) =>
          <Redirect to={`/browse/${match.params.community}/hot`} />}
      />
      <Route exact path="/browse/:community/:filter" component={BrowseCommunity} />

      {/* Content Creation Views */}
      <Route exact path="/create/post" component={authRequiredComponent(CreatePost)} />
      <Route exact path="/create/article" component={authRequiredComponent(CreateArticle)} />
      <Redirect path="/create" to="/create/post" />

      {/* Profile redirect logic */}
      <Route
        exact
        path="/profile"
        render={() => (getStore().getState().login.loggedIn ?
          <Redirect to={`/@${getStore().getState().authUser.username}`} /> :
          <Redirect to="/" />)
      }
      />

      {/* Profile section */}
      <Route exact path="/@:username" component={UserProfile} />

      {/* Single content */}
      <Route exact path="/@:username/:permlink" component={ContentSingle} />

      {/* OAuth Callback */}
      <Route exact path="/_oauth/" component={OAuthCallback} />

      <Route exact path="/signout" render={() => <SignOut onSignOut={() => getStore().dispatch(signOut())} />} />

      <Route exact path="/search" component={Search} />

      {/* Unknown route - 404 */}
      <Route exact path="*" render={() => <div>Not found</div>} />
    </Switch>
  </div>);

export default Root;
