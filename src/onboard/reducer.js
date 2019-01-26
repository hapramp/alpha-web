import { overlayComponents, signInModalIndex } from './constants';
import { actionTypes } from './actions';

const numberOfOverlayComponents = overlayComponents.length;

const initialState = {
  hasOnboarded: true,
  index: 0,
  showSignIn: false,
};

export default (state = initialState, action) => {
  let nextIndex = state.index;
  switch (action.type) {
    case actionTypes.start:
      return { ...state, hasOnboarded: false };

    case actionTypes.stop:
      return { ...state, hasOnboarded: true };

    case actionTypes.showNext:
      if (state.index < numberOfOverlayComponents - 1) {
        nextIndex = state.index + 1;
      }
      return { ...state, index: nextIndex };

    case actionTypes.showPrevious:
      if (state.index > 0) {
        nextIndex = state.index - 1;
      }
      return { ...state, index: nextIndex };

    case actionTypes.showSignIn:
      return { ...state, showSignIn: true };

    case actionTypes.hideSignIn:
      return { ...state, showSignIn: false };

    default:
      return state;
  }
};

export const getOnboardState = state => state.onboard;

export const shouldShowModal = (state) => {
  const onboardState = getOnboardState(state);
  return !onboardState.hasOnboarded || onboardState.showSignIn;
};

export const getActiveModalIndex = (state) => {
  const onboardState = getOnboardState(state);
  if (!onboardState.hasOnboarded) {
    return onboardState.index;
  }
  return signInModalIndex;
};

export const isModalActive = (state, index) => {
  const onboardState = getOnboardState(state);
  if (!onboardState.hasOnboarded) {
    return getOnboardState(state).index === index;
  }
  /**
   * No other than sign in modal can be shown if the
   * user has already seen onboarding.
   */
  if (index !== signInModalIndex) {
    return false;
  }
  /**
   * Boils down to just sign in modal, see
   * if it's enabled
   */
  return onboardState.showSignIn;
};
