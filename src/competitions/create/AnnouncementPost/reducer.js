import { actionTypes } from './actions';
import { getAnnouncementPostState } from '../reducer';

const initialState = {
  content: '',
  tags: [],
  title: '',
  register: {
    loading: false,
    error: null,
  },
};

const announcePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setPostContent:
      return { ...state, content: action.content };

    case actionTypes.setTags:
      return { ...state, tags: action.tags };

    case actionTypes.setTitle:
      return { ...state, title: action.title };

    case actionTypes.registerAndCreatePost.init:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };

    case actionTypes.registerAndCreatePost.done:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: null,
        },
      };

    case actionTypes.registerAndCreatePost.error:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: action.reason,
        },
      };

    default:
      return state;
  }
};

export default announcePostReducer;

export const getPostContent = state => getAnnouncementPostState(state).content;

export const getTags = state => getAnnouncementPostState(state).tags;

export const getTitle = state => getAnnouncementPostState(state).title;

export const isPostRegistering = state => getAnnouncementPostState(state).register.loading;
