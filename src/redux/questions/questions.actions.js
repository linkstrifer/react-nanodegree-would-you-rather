import { QUESTIONS_LOAD, QUESTIONS_ANSWER, QUESTIONS_ADD } from './questions.constants';
import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from './../../utils/api';

export const loadQuestionsSuccess = (questions) => ({
  type: QUESTIONS_LOAD,
  questions,
});

export const loadQuestions = () => (
  (dispatch) => (
    _getQuestions()
      .then(questions => {
        dispatch(loadQuestionsSuccess(questions));
      })
  )
);

export const answerQuestionSuccess = ({
  answer,
  currentUser,
  questionId,
}) => ({
  type: QUESTIONS_ANSWER,
  answer,
  currentUser,
  questionId,
});

export const answerQuestion = ({ authedUser, qid, answer }) => (
  (dispatch) => (
    _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => {
        dispatch(answerQuestionSuccess({
          answer,
          currentUser: authedUser,
          questionId: qid,
        }));
      })
  )
);

export const addQuestionSuccess = question => ({
  type: QUESTIONS_ADD,
  question,
});

export const addQuestion = (question, callback) => (
  (dispatch) => (
    _saveQuestion(question)
      .then((newQuestion) => {
        dispatch(addQuestionSuccess(newQuestion))
        callback();
      })
  )
);
