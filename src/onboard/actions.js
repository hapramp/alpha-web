import { startDelay } from './constants';

export const actionTypes = {
  start: 'onboard/start',
  stop: 'onboard/stop',
  showNext: 'onboard/pages/showNext',
  showAtIndex: 'onboard/pages/showAtIndex',
  showSignIn: 'onboard/signIn/show',
  hideSignIn: 'onboard/signIn/show',
};

export const startOnboarding = () => dispatch =>
  setTimeout(
    () => dispatch({ type: actionTypes.start }),
    startDelay,
  );

export const stopOnboarding = () => (dispatch) => {
  dispatch({ type: actionTypes.stop });
};

export const showNextPage = () => dispatch => dispatch({
  type: actionTypes.showNext,
});

export const showPageAtIndex = index => dispatch => dispatch({
  type: actionTypes.showAtIndex,
  index,
});

export const showSignIn = () => dispatch => dispatch({
  type: actionTypes.showSignIn,
});
