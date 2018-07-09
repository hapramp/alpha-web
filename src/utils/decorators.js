import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Cookie from 'js-cookie';

import notify from './notification';

export const notAuthorizedErrorAction = () => () => {
  notify.danger('Please log in first!');
  return Promise.reject();
};

export const authRequired = (target) => {
  if (!Cookie.get('username')) {
    return notAuthorizedErrorAction;
  }
  return dispatch => target(dispatch);
};

/** MORE: https://mjrussell.github.io/redux-auth-wrapper/docs/Getting-Started/ReactRouter4.html */
export const authRequiredComponent = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: state => state.login.loggedIn,
  wrapperDisplayName: 'AuthRequiredComponent',
});
