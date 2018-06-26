import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import './App.css';

import { loadUsers } from './redux/users/users.actions';

import {
  Login,
  Nav,
  PrivateRoute,
  Question,
  Questions,
} from './components';
import { loadQuestions } from './redux/questions/questions.actions';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(loadUsers());
    dispatch(loadQuestions());
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        {currentUser && <Nav />}
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Questions} />
        <PrivateRoute path="/question/:id" component={Question} />
        {/* <Route path="/question/:id" component={Question} /> */}
      </div>
    );
  }
}

export default withRouter(connect(state => (
  {
    currentUser: state.currentUser,
  }
)
)(App));
