import { LOGIN } from './currentUser.constants';

const initialState = null;

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;

    default:
      return state;
  }
}

export default currentUserReducer;
