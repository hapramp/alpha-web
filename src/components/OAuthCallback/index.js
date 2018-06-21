import React from 'react';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import steemAPI from '../../utils/steem';
import getStore from '../../utils/storeUtils';
import { fakeLogin } from '../../actions/loginActions';

const OAuthCallback = (props) => {
  const params = new URLSearchParams(props.location.search);
  const accessToken = params.get('access_token');
  const username = params.get('username');
  const expiresIn = parseInt(params.get('expires_in'), 10);
  Cookie.set('access_token', accessToken, { expires: expiresIn });
  localStorage.setItem('username', username);
  steemAPI.sc2Api.setAccessToken(accessToken);
  getStore().dispatch(fakeLogin());
  return <Redirect to="/feed" />;
};

OAuthCallback.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default OAuthCallback;
