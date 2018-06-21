import _ from 'lodash';

import notify from '../utils/notification';
import { actionTypes } from '../actions/createPostActions';

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
  const { message } = action;

  switch (action.type) {
    case actionTypes.CHANGE_COMMUNITY:
      community = state.community.slice();
      if (_.some(community, i => i === action.community)) {
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

      // Check for too frequent post error
      if (action.message.data && action.message.data.stack && action.message.data.stack[0]) {
        const index = action.message.data.stack[0].format.indexOf('auth.last_root_post');
        if (index > -1) {
          notify.danger('You need to wait for 5 minutes before creating the next post.');
        }
      } else {
        notify.danger(message);
      }

      return { ...state, errors, creating: false };

    case actionTypes.CLEAR_ERROR:
      return { ...state, errors: [] };

    case actionTypes.SET_HASHTAGS:
      return { ...state, hashtags: _.uniqBy(action.hashtags, i => i) };

    case actionTypes.POST_CREATED:
      return {
        ...state, created: true, fullPermlink: action.fullPermlink, creating: false,
      };

    case actionTypes.POST_CREATE_RESET:
      return _.clone(initialState);

    case actionTypes.POST_CREATE_INIT:
      return { ...state, creating: true };

    default:
      return state;
  }
};
