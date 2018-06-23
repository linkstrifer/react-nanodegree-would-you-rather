import { LOAD_USERS } from './users.constants';

const initialState = [];

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      const users = Object.getOwnPropertyNames(action.users).map(userId => action.users[userId]);

      return [
        ...state,
        ...users
      ];
    default:
      return state;
  }
}

export default usersReducer;
