import some from 'lodash/some';
import uniqBy from 'lodash/unionBy';
import clone from 'lodash/clone';

import { actionTypes } from './actions';

const initialState = {
  community: [],
  media: null,
  errors: [],
  hashtags: [],
  created: false,
  fullPermlink: null,
  creating: false,
};

export default (state = initialState, action) => {
  let community;
  let errors;

  switch (action.type) {
    case actionTypes.CHANGE_COMMUNITY:
      community = state.community.slice();
      if (some(community, i => i === action.community)) {
        community = community.filter(i => i !== action.community);
      } else if (community.length < 3) {
        community.push(action.community);
      }
      return { ...state, community };

    case actionTypes.CHANGE_MEDIA:
      return { ...state, media: { content: action.content, type: action.mediaType } };

    case actionTypes.REMOVE_MEDIA:
      return { ...state, media: null };

    case actionTypes.CREATE_ERROR:
      errors = state.errors.slice();
      return { ...state, errors, creating: false };

    case actionTypes.CLEAR_ERROR:
      return { ...state, errors: [] };

    case actionTypes.SET_HASHTAGS:
      return { ...state, hashtags: uniqBy(action.hashtags, i => i) };

    case actionTypes.POST_CREATED:
      return {
        ...state, created: true, fullPermlink: action.fullPermlink, creating: false,
      };

    case actionTypes.POST_CREATE_RESET:
      return clone(initialState);

    case actionTypes.POST_CREATE_INIT:
      return { ...state, creating: true };

    default:
      return state;
  }
};
