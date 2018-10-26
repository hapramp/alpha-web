import _ from 'lodash';

import { actionTypes } from './actions';

const initialState = {
  title: '',
  content: '',
  communities: [],
  tags: [],
};

export default (state = initialState, action) => {
  let communities;
  let tags;
  switch (action.type) {
    case actionTypes.CHANGE_COMMUNITY:
      communities = state.communities.slice();
      if (_.some(communities, i => i === action.community)) {
        communities = communities.filter(i => i !== action.community);
      } else if (communities.length < 3) {
        communities.push(action.community);
      }
      return { ...state, communities };

    case actionTypes.SET_TITLE:
      return { ...state, title: action.title };

    case actionTypes.SET_CONTENT:
      return { ...state, content: action.content };

    case actionTypes.ADD_TAG:
      tags = state.tags.slice();
      tags.push(action.tag);
      return { ...state, tags: _.uniq(tags) };

    case actionTypes.REMOVE_TAG:
      tags = state.tags.filter(tag => tag === action.tag);
      return { ...state, tags };

    default:
      return state;
  }
};

export const getSelectedCommunities = state => state.createArticle.communities;
