import { createStore, combineReducers } from 'redux';

import middleware from './middleware';

import currentUser from './currentUser/currentUser.reducer';
import questions from './questions/questions.reducer';
import users from './users/users.reducer';

const store = createStore(
  combineReducers({
    currentUser,
    questions,
    users,
  }),
  middleware
);

export default store;
