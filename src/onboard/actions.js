import Cookies from 'js-cookie';

import { startDelay } from './constants';

export const actionTypes = {
  start: 'onboard/start',
  stop: 'onboard/stop',
  showNext: 'onboard/pages/showNext',
  showPrevious: 'onboard/pages/showPrevious',
  showSignIn: 'onboard/signIn/show',
  hideSignIn: 'onboard/signIn/show',
};

export const startOnboarding = () => dispatch =>
  setTimeout(
    () => {
      Cookies.set('has_user_onboarded', true);
      return dispatch({ type: actionTypes.start });
    },
    startDelay,
  );

export const stopOnboarding = () => (dispatch) => {
  dispatch({ type: actionTypes.stop });
};

export const showNextPage = () => dispatch => dispatch({
  type: actionTypes.showNext,
});

export const showPreviousPage = () => dispatch => dispatch({
  type: actionTypes.showPrevious,
});

export const showSignIn = () => dispatch => dispatch({
  type: actionTypes.showSignIn,
});

export const hideSignIn = () => dispatch => dispatch({
  type: actionTypes.hideSignIn,
});
