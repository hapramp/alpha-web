import notify from './notification';
import getStore from './storeUtils';

const notAuthorizedError = () => notify.danger('Please log in first!');

export const authRequired = target => getStore().getState().login.isLoggedIn ? target : notAuthorizedError;
