import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';

import './Add.styles.css';

class AddComponent extends PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      currentUser,
      dispatch,
      history,
    } = this.props;

    const $form = event.target;
    const optionOneText = $form.optionOne.value;
    const optionTwoText = $form.optionTwo.value;

    dispatch(
      addQuestion({
        author: currentUser.id,
        optionOneText,
        optionTwoText,
      }, () => {
        history.push('/');
      })
    );
  }

  render() {
    const { handleSubmit } = this;

    return (
      <form
        className="container add"
        onSubmit={handleSubmit}
      >
        <h1>
          Would You Rather
        </h1>
        <div className="add-inputs">
          <input
            className="add-input"
            type="text"
            name="optionOne"
            placeholder="option one"
          />
          <input
            className="add-input"
            type="text"
            name="optionTwo"
            placeholder="option two"
          />
        </div>
        <button>
          Add
        </button>
      </form>
    );
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
  }
))(AddComponent);
