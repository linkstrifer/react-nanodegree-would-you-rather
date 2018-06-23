import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import './App.css';

import { loadUsers } from './redux/users/users.actions';

import { Login } from './components';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadUsers())
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        {!currentUser && <Route exact path="/" component={Login} />}
        {currentUser && <Route exact path="/" render={() => (
          <div className="container">logged</div>
        )} />}
      </div>
    );
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
  }
)
)(App);
