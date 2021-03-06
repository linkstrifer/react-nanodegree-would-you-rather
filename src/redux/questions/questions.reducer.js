import { QUESTIONS_LOAD, QUESTIONS_ANSWER, QUESTIONS_ADD } from "./questions.constants";

const initialState = [];

function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOAD:
      const questions = Object.getOwnPropertyNames(action.questions)
        .map(questionId => (
          {
            ...action.questions[questionId],
          }
        ));

      return questions;
    case QUESTIONS_ANSWER:
      const newState = state.map(question => {
        const newQuestion = question;

        if (newQuestion.id === action.questionId) {
          newQuestion[action.answer].votes.push(action.currentUser);
        }

        return question;
      });

      return newState;
    case QUESTIONS_ADD:
      return [
        ...state,
        action.question,
      ];
    default:
      return state;
  }
}

export default questionsReducer;
