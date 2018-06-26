import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { answerQuestion } from '../../redux/questions/questions.actions';

import './Question.styles.css';

class QuestionComponent extends PureComponent {
  handleSelectOption = (event) => {
    const {
      currentUser,
      dispatch,
      question,
    } = this.props;
    const answer = event.target.value;

    dispatch(answerQuestion({
      answer,
      authedUser: currentUser.id,
      qid: question.id,
    }));
  }

  renderOptions = () => {
    const { handleSelectOption } = this;
    const { question } = this.props;

    return (
      <fieldset className="question-options">
        {[{
          ...question.optionOne,
          id: 'optionOne',
        },
        {
          ...question.optionTwo,
          id: 'optionTwo',
        }].map(option => (
          <button
            key={option.text}
            onClick={handleSelectOption}
            type="button"
            value={option.id}
          >
            {option.text}
          </button>
        ))}
      </fieldset>
    );
  }

  renderResults = () => {
    const { question } = this.props;
    const totalVotes = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].length;
    const options = [
      question.optionOne,
      question.optionTwo,
    ];

    return (
      <div className="question-results">
        {
          options.map(option => (
            <div
              className="question-result"
              key={option.text}
              style={{
                width: `${(option.votes.length / totalVotes) * 100}%`
              }}
            >
              <span className="question-result-label">
                {option.text}
              </span>
              <span className="question-result-percent">
                {`${parseInt((option.votes.length / totalVotes) * 100, 10)}%`}
              </span>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const { renderOptions, renderResults } = this;
    const {
      author,
      currentUser,
      question,
     } = this.props;

     if (!author || !question) {
       return null;
     }

    const answered = [
      ...question.optionOne.votes,
      ...question.optionTwo.votes,
    ].some(vote => vote === currentUser.id);

    return (
      <div className="container question">
        <h1>Would You Rather</h1>
        <figure className="question-avatar">
          <img src={author.avatarURL} alt={author.name} />
        </figure>
        {
          !answered
          ? renderOptions()
          : renderResults()
        }
      </div>
    );
  }
}

export default withRouter(
    connect((state, props) => {
    const questionId = props.match.params.id;
    const question = state.questions.find(currentQuestion => currentQuestion.id === questionId);
    const author = question ? state.users.find(user => user.id === question.author) : null;

    return {
      author,
      currentUser: state.currentUser,
      question,
    };
  })(QuestionComponent)
);
