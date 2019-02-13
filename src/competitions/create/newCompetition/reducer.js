import { actionTypes } from './actions';
import { getNewCompetitionState } from '../reducer';

const initialState = {
  name: '',
  description: '',
  rules: '',
  tags: [],
  interests: [],
  startDate: {
    date: '',
    time: '',
  },
  endDate: {
    date: '',
    time: '',
  },
  prizes: [
    '',
    '',
    '',
  ],
  judges: [],
  image: null,
  createCompetition: {
    loading: false,
    error: null,
  },
};

const newCompetitionReducer = (state = initialState, action) => {
  const { field, value } = action;
  let newState;
  switch (action.type) {
    case actionTypes.changeField:
      newState = { ...state };
      newState[field] = value;
      return newState;

    // Actions related to creating new contest
    case actionTypes.createCompetition.init:
      return {
        ...state,
        createContest: {
          loading: true,
          error: null,
        },
      };

    case actionTypes.createCompetition.done:
      return {
        ...state,
        createContest: {
          loading: false,
          error: null,
        },
      };

    case actionTypes.createCompetition.error:
      return {
        ...state,
        createCompetition: {
          loading: false,
          error: action.reason,
        },
      };

    default:
      return state;
  }
};

export default newCompetitionReducer;

// Selector
export const getNewCompetitionField = (state, field) => getNewCompetitionState(state)[field];

export const isCompetitionCreating = state => getNewCompetitionField(state, 'createCompetition').loading;
