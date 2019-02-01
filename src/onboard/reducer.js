import { overlayPages, signInModalIndex } from './constants';
import { actionTypes } from './actions';

const numberOfOverlayComponents = overlayPages.length;

const initialState = {
  hasOnboarded: true, // If set to false, the onboarding is shown
  index: 0, // The current onboarding page in view
};

export default (state = initialState, action) => {
  let nextIndex = state.index;
  switch (action.type) {
    case actionTypes.start:
      return { ...state, hasOnboarded: false };

    case actionTypes.stop:
      return { ...state, hasOnboarded: true };

    case actionTypes.showNext:
      // Make sure we are not at the last onboarding page
      if (state.index < numberOfOverlayComponents - 1) {
        nextIndex = state.index + 1;
      }
      return { ...state, index: nextIndex };

    case actionTypes.showAtIndex:
      return { ...state, hasOnboarded: false, index: action.index };

    case actionTypes.showSignIn:
      // Helps display the sign in modal directly - used by
      // different action creators
      return { ...state, index: signInModalIndex, hasOnboarded: false };

    default:
      return state;
  }
};

// Selectors
export const getOnboardState = state => state.onboard;

export const shouldShowModal = (state) => {
  const onboardState = getOnboardState(state);
  return !onboardState.hasOnboarded;
};

export const getActiveModalIndex = (state) => {
  const onboardState = getOnboardState(state);
  if (!onboardState.hasOnboarded) {
    return onboardState.index;
  }
  return signInModalIndex;
};

/**
 * Used to check if we need to show the next button
 * @param {object} state Global state
 */
export const shouldShowNextButton = (state) => {
  const { index } = getOnboardState(state);
  return index < numberOfOverlayComponents - 1;
};
