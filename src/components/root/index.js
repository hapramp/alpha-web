import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { authRequiredComponent } from '../../utils/decorators';
import { logout as signOut } from '../../actions/loginActions';
import getStore from '../../utils/storeUtils';
import Header from '../header';
import Feed from '../../feed';
import CreatePost from '../../post/create/CreatePost';
import UserProfile from '../userProfile';
import Browse from '../browse';
import CreateArticle from '../createArticle';
import ContentSingle from '../contentSingle';
import OAuthCallback from '../OAuthCallback';
import SignOut from '../SignOut';
import Search from '../../search';
import Register from '../../register/Register';

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

      {/* User feed */}
      <Route path="/feed" component={Feed} />

      {/* Browse views */}
      <Route exact path="/browse" component={Browse} />

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

      <Route exact path="/register" component={Register} />

      {/* Unknown route - 404 */}
      <Route exact path="*" render={() => <div className="uk-container uk-margin-top uk-text-center">Not found</div>} />
    </Switch>
  </div>);

export default Root;
