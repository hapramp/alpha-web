import { actionTypes } from './actions';

const initialState = {
  processing: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.start:
      return { ...state, processing: true, error: null };

    case actionTypes.done:
      return { ...state, processing: false };

    case actionTypes.error:
      return { ...state, processing: false, error: action.reason };

    default:
      return state;
  }
};

// Selectors
export const isProcessing = state => state.register.processing;

export const hasErrored = state => !!state.register.error;
