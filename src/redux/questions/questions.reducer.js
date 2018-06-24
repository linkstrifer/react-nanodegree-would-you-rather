import { QUESTIONS_LOAD } from "./questions.constants";

const initialState = [];

function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOAD:
      const questions = Object.getOwnPropertyNames(action.questions)
        .map(questionId => (
          {
            ...action.questions[questionId],
            options: [
              action.questions[questionId].optionOne,
              action.questions[questionId].optionTwo,
            ],
            votes: [
              ...action.questions[questionId].optionOne.votes,
              ...action.questions[questionId].optionTwo.votes,
            ]
          }
        ));

      return questions;
    default:
      return state;
  }
}

export default questionsReducer;
