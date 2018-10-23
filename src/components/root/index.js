import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import { authRequiredComponent } from '../../utils/decorators';
import { logout } from '../../actions/loginActions';
import {
  isRegistered as isUserRegisteredOn1Ramp,
  isLoggedIn as isUserLoggedIn,
} from '../../reducers/loginReducer';
import { getAuthUsername } from '../../reducers/authUserReducer';

import Header from '../header';
import Feed from '../../feed';
import CreatePost from '../../post/create/CreatePost';
import UserProfile from '../../profile/UserProfileContainer';
import Browse from '../browse';
import CreateArticle from '../../post/create/CreateArticle';
import ContentSingle from '../contentSingle';
import OAuthCallback from '../OAuthCallback';
import SignOut from '../SignOut';
import Search from '../../search';
import SelectCommunities from '../../register/SelectCommunities';
import EditProfile from '../../profile/EditProfile';

const Root = ({
  isRegistered, isLoggedIn, signOut, authUsername,
}) => (
  <div style={{ backgroundColor: '#FAFAFA' }}>
    <Header />
    <Switch>
      <Route
        exact
        path="/select-communities"
        component={authRequiredComponent(SelectCommunities)}
      />
      {!isRegistered && <Redirect to="/select-communities" />}

      {/* Entry check */}
      <Route
        exact
        path="/"
        render={() => {
        if (isLoggedIn) {
          return <Redirect to="/feed" />;
        }
          return <Redirect to="/feed/new" />;
        }
      }
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
        render={() => (
          isLoggedIn
          ? <Redirect to={`/@${authUsername}`} />
          : <Redirect to="/" />
        )
      }
      />

      {/* Profile section */}
      <Route exact path="/@:username" component={UserProfile} />

      {/* Single content */}
      <Route exact path="/@:username/:permlink" component={ContentSingle} />

      {/* OAuth Callback */}
      <Route exact path="/_oauth/" component={OAuthCallback} />

      <Route exact path="/signout" render={() => <SignOut onSignOut={signOut} />} />

      <Route exact path="/search" component={Search} />

      <Route exact path="/profile/edit" component={authRequiredComponent(EditProfile)} />

      {/* Unknown route - 404 */}
      <Route exact path="*" render={() => <div className="uk-container uk-margin-top uk-text-center">Not found</div>} />
    </Switch>
  </div>
);

Root.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  authUsername: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isRegistered: isUserRegisteredOn1Ramp(state),
  isLoggedIn: isUserLoggedIn(state),
  authUsername: getAuthUsername(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signOut: logout,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
