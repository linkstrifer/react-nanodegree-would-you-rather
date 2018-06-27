import { LOAD_USERS } from './users.constants';
import { QUESTIONS_ANSWER, QUESTIONS_ADD } from '../questions/questions.constants';

const initialState = [];

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      const users = Object.getOwnPropertyNames(action.users).map(userId => action.users[userId]);

      return [
        ...state,
        ...users
      ];
    case QUESTIONS_ANSWER:
      return state.map(user => {
        const newUser = user;

        if (newUser.id === action.currentUser) {
          newUser.answers = {
            ...newUser.answers,
            [action.questionId]: action.answer,
          };
        }

        return newUser;
      });
    case QUESTIONS_ADD:
    return state.map(user => {
      const newUser = user;

      if (newUser.id === action.question.author) {
        newUser.questions.push(action.question);
      }

      return newUser;
    });
    default:
      return state;
  }
}

export default usersReducer;
