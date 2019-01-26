import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';

import { authRequiredComponent } from '../../utils/decorators';
import { logout } from '../../actions/loginActions';
import {
  isRegistered as isUserRegisteredOn1Ramp,
  isLoggedIn as isUserLoggedIn,
} from '../../reducers/loginReducer';
import { getAuthUsername } from '../../reducers/authUserReducer';

import Header from '../header';
import BottomBar from '../bottomBar';
import Onboard from '../../onboard/Onboard';

const Loading = () => <div>Loading...</div>;

const SelectCommunities = Loadable({
  loader: () => import('../../register/SelectCommunities'),
  loading: Loading,
});
const Feed = Loadable({
  loader: () => import('../../feed'),
  loading: Loading,
});
const Browse = Loadable({
  loader: () => import('../browse'),
  loading: Loading,
});
const CreatePost = Loadable({
  loader: () => import('../../post/create/CreatePost'),
  loading: Loading,
});
const CreateArticle = Loadable({
  loader: () => import('../../post/create/CreateArticle'),
  loading: Loading,
});
const ArticleNext = Loadable({
  loader: () => import('../../post/create/CreateArticle/ArticleNext'),
  loading: Loading,
});
const UserProfile = Loadable({
  loader: () => import('../../profile/UserProfileContainer'),
  loading: Loading,
});
const ContentSingle = Loadable({
  loader: () => import('../contentSingle'),
  loading: Loading,
});
const OAuthCallback = Loadable({
  loader: () => import('../OAuthCallback'),
  loading: Loading,
});
const SignOut = Loadable({
  loader: () => import('../SignOut'),
  loading: Loading,
});
const Search = Loadable({
  loader: () => import('../../search'),
  loading: Loading,
});
const EditProfile = Loadable({
  loader: () => import('../../profile/EditProfile'),
  loading: Loading,
});
const CompetitionListing = Loadable({
  loader: () => import('../../competitions/CompetitionListing'),
  loading: Loading,
});
const CompetitionSingle = Loadable({
  loader: () => import('../../competitions/CompetitionSingle'),
  loading: Loading,
});
const MicroCommunitySingle = Loadable({
  loader: () => import('../../microCommunities/MicroCommunitySingle'),
  loading: Loading,
});

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
        render={() => <Redirect to="/feed/explore/" />}
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
      <Route
        exact
        path="/:parentPermlink/@:username/:permlink"
        render={
          ({ match }) => <Redirect to={`/@${match.params.username}/${match.params.permlink}`} />
        }
      />
      <Route exact path="/@:username/:permlink" component={ContentSingle} />

      {/* OAuth Callback */}
      <Route exact path="/_oauth/" component={OAuthCallback} />

      <Route exact path="/signout" render={() => <SignOut onSignOut={signOut} />} />

      <Route path="/search" component={Search} />

      <Route exact path="/profile/edit" component={authRequiredComponent(EditProfile)} />

      <Route exact path="/competitions" component={CompetitionListing} />
      <Route exact path="/competitions/:competitionId" component={CompetitionSingle} />

      <Route exact path="/community/:tag" component={MicroCommunitySingle} />

      {/* Unknown route - 404 */}
      <Route exact path="*" render={() => <div className="uk-container uk-margin-top uk-text-center">Not found</div>} />
    </Switch>
    {bottomBarVisible && <BottomBar />}
    <Onboard />
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
