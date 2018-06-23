import { LOAD_USERS } from './users.constants';
import { _getUsers } from './../../utils/api';

export const loadUsersSuccess = (users) => (
  {
    type: LOAD_USERS,
    users,
  }
);

export const loadUsers = () => (
  (dispatch) => (
    _getUsers()
      .then(users => {
        dispatch(loadUsersSuccess(users));
      })
  )
);
