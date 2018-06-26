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
    const options = [
      {
        label: 'Home',
        to: '/',
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
      </nav>
    );
  }
}

export default connect()(NavComponent);
