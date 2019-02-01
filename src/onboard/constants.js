import SignIn from './pages/SignIn';
import OneRampIsYou from './pages/OneRampIsYou';
import OneRampIsAStage from './pages/OneRampIsAStage';
import OnePlaceForAll from './pages/OnePlaceForAll';

export const startDelay = 5000;

/** Overlay pages to show (in order) */
export const overlayPages = [
  OnePlaceForAll,
  OneRampIsAStage,
  OneRampIsYou,
  SignIn,
];

export const signInModalIndex = 3;

/**
 * This cookie is used to ensure that we are
 * not showing the onboarding again on a browser
 */
export const onboardCookieKey = 'has_user_onboarded';
