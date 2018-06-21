import notify from './notification';

export const notAuthorizedErrorAction = () => () => {
  notify.danger('Please log in first!');
  return Promise.reject();
};

export const authRequired = target => (localStorage.getItem('username') ? target : notAuthorizedErrorAction);
