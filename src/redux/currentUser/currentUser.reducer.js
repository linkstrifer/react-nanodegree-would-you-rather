import { LOGIN, LOGOUT } from './currentUser.constants';

const initialState = null;

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default currentUserReducer;
