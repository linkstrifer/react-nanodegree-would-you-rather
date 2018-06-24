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
    const { questions, currentUser } = this.props;

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

  render() {
    const { handleFilter, filterQuestions } = this;
    const { filter } = this.state;
    const { questions } = this.props;

    return (
      <div className="container questions">
        Questions

        <fieldset className="questions-inputs">
          <label className="questions-label">
            <input
              checked={filter === ALL}
              className="questions-input"
              onChange={handleFilter}
              type="radio"
              value={ALL}
            />
            All
          </label>
          <label className="questions-label">
            <input
              checked={filter === ANSWERED}
              className="questions-input"
              onChange={handleFilter}
              type="radio"
              value={ANSWERED}
            />
            Answered
          </label>
          <label className="questions-label">
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

        <div className="questions-loading">
          {
            questions.length === 0 &&
            'Loading questions'
          }
        </div>

        <ul className="questions-list">
          {
            filterQuestions().map(question => (
              <li key={question.id}>
                {question.id}
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
  }
))(QuestionsComponent);
