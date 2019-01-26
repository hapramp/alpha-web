import SignIn from './pages/SignIn';
import OneRampIsYou from './pages/OneRampIsYou';
import OneRampIsAStage from './pages/OneRampIsAStage';
import OnePlaceForAll from './pages/OnePlaceForAll';

export const startDelay = 5000;

export const overlayPages = [
  OnePlaceForAll,
  OneRampIsAStage,
  OneRampIsYou,
  SignIn,
];

export const signInModalIndex = 3;

export const onboardCookieKey = 'has_user_onboarded';
