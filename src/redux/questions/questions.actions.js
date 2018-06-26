import { QUESTIONS_LOAD, QUESTIONS_ANSWER } from './questions.constants';
import { _getQuestions, _saveQuestionAnswer } from './../../utils/api';

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