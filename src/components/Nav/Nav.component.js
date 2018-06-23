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

    return (
      <nav className="container nav">
        <ul className="nav-list">
          <li className="nav-option">
            <Link onClick={handleLogout} to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect()(NavComponent);
