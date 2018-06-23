import { LOGIN, LOGOUT } from './currentUser.constants';

export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});
