import { LOGIN } from './currentUser.constants';

export const login = (user) => ({
  type: LOGIN,
  user,
});
