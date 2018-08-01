import { actionTypes as loginActionTypes } from '../actions/loginActions';
import notify from '../utils/notification';

const initialState = {
  name: null, avatar: null, location: null, cover: null, website: null, username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.SET_AUTH_USER:
      notify.success(`Logged in as ${action.username}`);
      return {
        ...state,
        name: action.name,
        avatar: action.avatar,
        username: action.username,
        location: action.location,
        cover: action.cover,
        website: action.website,
      };
    default:
      return state;
  }
};
