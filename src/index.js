import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Cookie from 'js-cookie';
import { ConnectedRouter } from 'connected-react-router';
import Helmet, { HelmetProvider } from 'react-helmet-async';

// import registerServiceWorker from './registerServiceWorker';
import Root from './components/root';
import getStore, { history } from './utils/storeUtils';
import { fakeLogin } from './actions/loginActions';
import steemAPI from './utils/steem';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);
TimeAgo.default_locale = 'en-US';

const store = getStore();

// Login user
const accessToken = Cookie.get('access_token');
if (accessToken) {
  getStore().dispatch(fakeLogin());
  steemAPI.sc2Api.setAccessToken(accessToken);
}

ReactDOM.render(
  <HelmetProvider>
    {/* Default meta tags */}
    <Helmet>
      <meta name="title" content="Social media for creators - share content and earn rewards!" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@the1ramp" />
      <meta name="twitter:title" content="1Ramp" />
      <meta name="twitter:description" content="Social media for creators - share content and earn rewards!" />
      <meta name="twitter:creator" content="@the1ramp" />
      <meta name="twitter:img:src" content="https://steemitimages.com/u/the1ramp/avatar/large" />
      <meta name="og:title" content="1Ramp" />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://alpha.1ramp.io" />
      <meta name="og:image" content="https://steemitimages.com/u/the1ramp/avatar/large" />
      <meta name="og:description" content="Social media for creators - share content and earn rewards!" />
      <meta name="og:site_name" content="1Ramp" />
    </Helmet>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root'),
);
// registerServiceWorker();
