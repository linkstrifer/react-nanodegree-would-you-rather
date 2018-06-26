import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

import { login } from './../../redux/currentUser/currentUser.actions';

import './Login.styles.css';

class LoginComponent extends PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    const { users, dispatch, location } = this.props;
    const selectedUser = users.find(user => user.id === this.selectedUser.current.value);

    if (selectedUser) {
      dispatch(login(selectedUser));
      this.props.history.push(location.state.referrer);
    }
  };

  renderInputs = () => (
    <Fragment>
      <select
        className="login-select"
        ref={this.selectedUser}
      >
        {this.props.users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button className="login-button">
        Login
      </button>
    </Fragment>
  )

  selectedUser = React.createRef();

  render() {
    const {
      handleSubmit,
      renderInputs,
    } = this;
    const { users } = this.props;

    return (
      <form
        className="container login"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        {
          users.length === 0 && 
          'Loading'
        }
        {
          users.length > 0 &&
          renderInputs()
        }
      </form>
    )
  };
}

export default connect(state => (
  {
    currentUser: state.currentUser,
    users: state.users,
  }
))(LoginComponent);
