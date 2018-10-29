import { EditorState } from 'draft-js';
import _ from 'lodash';

import { actionTypes } from './actions';

const initialState = {
  title: '',
  content: EditorState.createEmpty(),
  communities: [],
  tags: [],
  create: {
    creating: false,
  },
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
      tags = state.tags.filter(tag => tag !== action.tag);
      return { ...state, tags };

    case actionTypes.CREATE_INIT:
      return {
        ...state,
        create: {
          ...state.create,
          creating: true,
        },
      };

    case actionTypes.CREATE_DONE:
      return initialState;

    default:
      return state;
  }
};

// Selectors
export const getSelectedCommunities = state => state.createArticle.communities;

export const getActiveTags = state => state.createArticle.tags || [];

export const isArticlePublishable = (state) => {
  const articleState = state.createArticle;

  // TODO: Also check for content
  if (
    articleState.title.length === 0
    || articleState.communities.length === 0
  ) {
    return false;
  }

  if (articleState.create.creating) {
    return false;
  }

  return true;
};

export const getArticleContent = state => state.createArticle.content;

export const getArticleTitle = state => state.createArticle.title;
