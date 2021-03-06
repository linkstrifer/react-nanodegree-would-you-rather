import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Nav.styles.css';

import { logout } from './../../redux/currentUser/currentUser.actions';

class NavComponent extends PureComponent {
  handleLogout = () => {
    const { dispatch } = this.props;

    dispatch(logout());
  }

  render() {
    const { handleLogout } = this;
    const { currentUser } = this.props;

    const options = [
      {
        label: 'Home',
        to: '/',
      },
      {
        label: 'Add question',
        to: '/add',
      },
      {
        label: 'Leaderboard',
        to: '/leaderboard',
      },
      {
        label: 'Logout',
        onClick: handleLogout,
        to: '/login',
      },
    ];

    return (
      <nav className="container nav">
        <ul className="nav-list">
          {options.map(option => (
            <li
              className="nav-option"
              key={option.to}
            >
              <Link {...option}>
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-user">
          {currentUser.name}
        </div>
      </nav>
    );
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
  }
))(NavComponent);
