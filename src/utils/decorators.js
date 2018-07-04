import Cookie from 'js-cookie';

import notify from './notification';

export const notAuthorizedErrorAction = () => () => {
  notify.danger('Please log in first!');
  return Promise.reject();
};

export const authRequired = target => () => (Cookie.get('username') ? target : notAuthorizedErrorAction)();
