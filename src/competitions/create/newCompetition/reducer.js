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
};

const newCompetitionReducer = (state = initialState, action) => {
  const { field, value } = action;
  let newState;
  switch (action.type) {
    case actionTypes.changeField:
      newState = { ...state };
      newState[field] = value;
      return newState;

    default:
      return state;
  }
};

export default newCompetitionReducer;

// Selector
export const getNewCompetitionField = (state, field) => getNewCompetitionState(state)[field];
