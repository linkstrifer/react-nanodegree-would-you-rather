import { QUESTIONS_LOAD } from './questions.constants';
import { _getQuestions } from './../../utils/api';

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
)