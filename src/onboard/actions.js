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
  setTimeout( // Start after some delay
    () => dispatch({ type: actionTypes.start }),
    startDelay,
  );

export const stopOnboarding = () => (dispatch) => {
  dispatch({ type: actionTypes.stop });
};

export const showNextPage = () => dispatch => dispatch({
  type: actionTypes.showNext,
});

/**
 * Shows specefic page in the onboarding modal
 * @param {int} index Index of page to show
 */
export const showPageAtIndex = index => dispatch => dispatch({
  type: actionTypes.showAtIndex,
  index,
});

/**
 * Directly show log in modal; useful when guest triggers auth
 * required actions such as rate or comment
 */
export const showSignIn = () => dispatch => dispatch({
  type: actionTypes.showSignIn,
});
