import _ from 'lodash';

import { actionTypes } from '../actions/allUserActions';

const initialState = { users: {}, fetchingUsers: {}, haprampUsers: {} };

export default (state = initialState, action) => {
  let users;
  let haprampUsers;
  let fetchingUsers;
  switch (action.type) {
    case actionTypes.LOAD_USERS_INIT:
      users = _.cloneDeep(state.fetchingUsers);
      action.usernames.forEach((username) => {
        users[username] = true;
      });
      return { ...state, fetchingUsers: users };

    case actionTypes.LOAD_USERS_ERROR:
      users = _.clone(state.fetchingUsers);
      action.usernames.forEach((username) => {
        delete users[username];
      });
      return { ...state, fetchingUsers: users };

    case actionTypes.LOAD_USERS_DONE:
      users = _.cloneDeep(state.users);
      fetchingUsers = _.cloneDeep(state.fetchingUsers);
      action.results.forEach((oldUserDetail) => {
        const userDetail = { ...oldUserDetail };
        try {
          userDetail.json_metadata = JSON.parse(userDetail.json_metadata);
        } catch (err) {
          userDetail.json_metadata = { profile: {} };
        }
        users[userDetail.name] = userDetail;
        delete fetchingUsers[userDetail.name];
      });
      return { ...state, users, fetchingUsers };

    case actionTypes.LOAD_HAPRAMP_USER_DONE:
      haprampUsers = _.cloneDeep(state.users);
      haprampUsers[action.result.username] = action.result;
      return { ...state, haprampUsers };
    default:
      return state;
  }
};

// Selectors
export const getUserCommunities = (state, username) => _.get(
  state.allUsers,
  `haprampUsers[${username}].communities`,
  [],
);
