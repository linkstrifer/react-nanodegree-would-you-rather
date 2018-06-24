import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class PrivateRouteComponent extends PureComponent {
  render() {
    const { currentUser, ...rest } = this.props;

    return (
      currentUser &&
      <Route
        {...rest}
      />
    )
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
  }
))(PrivateRouteComponent);
