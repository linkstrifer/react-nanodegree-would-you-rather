import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadQuestions } from '../../redux/questions/questions.actions';

import './Questions.styles.css';

const ALL = 'all';
const ANSWERED = 'asnwered';
const UNANSWERED = 'unanswered';

class QuestionsComponent extends Component {
  state = {
    filter: UNANSWERED,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadQuestions());
  }

  handleFilter = (event) => {
    this.setState({
      filter: event.target.value,
    });
  }

  filterQuestions = () => {
    const { filter } = this.state;
    const { questions: questionsList, currentUser } = this.props;
    const questions = questionsList.sort(((a, b) => b.timestamp - a.timestamp));

    switch (filter) {
      case UNANSWERED:
        return questions.filter(question => (
          !question.votes.some(userId => userId === currentUser.id)
        ));
      case ANSWERED:
        return questions.filter(question => (
          question.votes.some(userId => userId === currentUser.id)
        ));
      default:
        return questions;
    }
  }

  renderFilter = () => {
    const { handleFilter } = this;
    const { filter } = this.state;

    return (
      <fieldset className="questions-inputs">
        <label className={`questions-label ${filter === ALL ? 'is-selected' : ''}`}>
          <input
            checked={filter === ALL}
            className="questions-input"
            onChange={handleFilter}
            type="radio"
            value={ALL}
          />
          All
        </label>
        <label className={`questions-label ${filter === ANSWERED ? 'is-selected' : ''}`}>
          <input
            checked={filter === ANSWERED}
            className="questions-input"
            onChange={handleFilter}
            type="radio"
            value={ANSWERED}
          />
          Answered
        </label>
        <label className={`questions-label ${filter === UNANSWERED ? 'is-selected' : ''}`}>
          <input
            checked={filter === UNANSWERED}
            className="questions-input"
            onChange={handleFilter}
            type="radio"
            value={UNANSWERED}
          />
          Unanswered
        </label>
      </fieldset>
    );
  }

  render() {
    const { filterQuestions, renderFilter } = this;
    const { questions, users } = this.props;

    return (
      <div className="container questions">
        <h1>
          Questions
        </h1>

        {
          questions.length > 0 &&
          renderFilter()
        }

        <div className="questions-loading">
          {
            questions.length === 0 &&
            'Loading questions'
          }
        </div>

        <ul className="questions-list">
          {
            filterQuestions().map(question => (
              <li
                className="questions-question"
                key={question.id}
              >
                <div className="questions-question-container">
                  <figure className="questions-question-avatar">
                    <img
                      src={users.find(user => user.id === question.author).avatarURL || ''}
                      alt={question.author}
                    />
                  </figure>
                  <div className="questions-question-info">
                    <span className="questions-question-user">
                      {question.author}
                    </span>
                    <span className="questions-question-id">
                      {question.timestamp}
                    </span>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
    questions: state.questions,
    users: state.users,
  }
))(QuestionsComponent);