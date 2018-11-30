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
import ArticleNext from '../../post/create/CreateArticle/ArticleNext';
import BottomBar from '../bottomBar';
// Competitions
import CompetitionListing from '../../competitions/CompetitionListing';
import CompetitionSingle from '../../competitions/CompetitionSingle';

const bottomBarWhitelistURLs = [
  '^/feed/.*$',
  '^/@.*$',
  '^/competitions.*$',
];

const bottomBarBlacklistURLs = [
  '^/@.*?/.*$',
];
const showBottomBar = (location, authUsername) => {
  // Special case for not showing bottom bar on other's profiles
  if (
    (location.match('^/@.*?') !== null) // is a profile root
    && (location.match('^/@.*?/.*$') === null) // is not post
    && location !== `/@${authUsername}`
  ) {
    return false;
  }

  const hasWhitelist = bottomBarWhitelistURLs.reduce(
    (acc, curr) => acc || (location.match(curr) !== null),
    false,
  );

  const hasBlackList = bottomBarBlacklistURLs.reduce(
    (acc, curr) => acc || (location.match(curr) !== null),
    false,
  );

  return hasWhitelist && !hasBlackList;
};

const Root = ({
  isRegistered, isLoggedIn, signOut, authUsername, bottomBarVisible,
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
          return <Redirect to="/feed/explore/" />;
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
      <Route exact path="/create/article/next" component={authRequiredComponent(ArticleNext)} />
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

      <Route path="/search" component={Search} />

      <Route exact path="/profile/edit" component={authRequiredComponent(EditProfile)} />

      <Route exact path="/competitions" component={CompetitionListing} />
      <Route exact path="/competitions/:competitionId" component={CompetitionSingle} />

      {/* Unknown route - 404 */}
      <Route exact path="*" render={() => <div className="uk-container uk-margin-top uk-text-center">Not found</div>} />
    </Switch>
    {bottomBarVisible && <BottomBar />}
  </div>
);

Root.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  authUsername: PropTypes.string.isRequired,
  bottomBarVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isRegistered: isUserRegisteredOn1Ramp(state),
  isLoggedIn: isUserLoggedIn(state),
  authUsername: getAuthUsername(state),
  bottomBarVisible: showBottomBar(ownProps.location.pathname, getAuthUsername(state)),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signOut: logout,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
