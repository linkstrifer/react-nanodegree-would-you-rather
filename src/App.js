import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import './App.css';

import { loadUsers } from './redux/users/users.actions';

import {
  Add,
  Login,
  Nav,
  PrivateRoute,
  Question,
  Questions,
  NotFound,
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
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Questions} />
          <PrivateRoute path="/question/:id" component={Question} />
          <PrivateRoute path="/add" component={Add} />
          <Route component={NotFound} />
        </Switch>
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
