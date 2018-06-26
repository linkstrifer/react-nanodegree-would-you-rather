import { LOGIN, LOGOUT } from './currentUser.constants';
import { QUESTIONS_ANSWER } from '../questions/questions.constants';

const initialState = null;
// const initialState = {
//   id: 'sarahedo',
//   name: 'Sarah Edo',
//   avatarURL: 'http://i.pravatar.cc/150?img=1',
//   answers: {
//     "8xf0y6ziyjabvozdd253nd": 'optionOne',
//     "6ni6ok3ym7mf1p33lnez": 'optionOne',
//     "am8ehyc8byjqgar0jgpub9": 'optionTwo',
//     "loxhs1bqm25b708cmbf3g": 'optionTwo'
//   },
//   questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
// };

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return initialState;
    case QUESTIONS_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        }
      }
    default:
      return state;
  }
}

export default currentUserReducer;
