import _ from 'lodash';

import { actionTypes } from '../actions/allUserActions';

const initialState = { users: {}, haprampUsers: {} };

export default (state = initialState, action) => {
  let users;
  let haprampUsers;
  switch (action.type) {
    case actionTypes.LOAD_USERS_DONE:
      users = _.cloneDeep(state.users);
      action.results.forEach((oldUserDetail) => {
        const userDetail = { ...oldUserDetail };
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
