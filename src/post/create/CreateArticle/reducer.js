import { actionTypes } from './actions';

const initialState = { title: '', content: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return { ...state, title: action.title };

    case actionTypes.SET_CONTENT:
      return { ...state, content: action.content };

    default:
      return state;
  }
};
