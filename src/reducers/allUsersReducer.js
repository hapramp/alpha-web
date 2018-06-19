import _ from 'lodash';

import { actionTypes } from '../actions/allUserActions';

const initialState = { users: {}, haprampUsers: {} };

export const allUserReducer = (state = initialState, action) => {
  let users,
    haprampUsers;
  switch (action.type) {
    case actionTypes.LOAD_USERS_DONE:
      users = _.cloneDeep(state.users);
      action.results.forEach((userDetail) => {
        try {
          userDetail.json_metadata = JSON.parse(userDetail.json_metadata);
        } catch (err) {
          userDetail.json_metadata = { profile: {} };
        }
        users[userDetail.name] = userDetail;
      });
      return { ...state, users };

    case actionTypes.LOAD_HAPRAMP_USER_DONE:
      haprampUsers = _.cloneDeep(state.users);
      haprampUsers[action.result.username] = action.result;
      return { ...state, haprampUsers };
    default:
      return state;
  }
};
