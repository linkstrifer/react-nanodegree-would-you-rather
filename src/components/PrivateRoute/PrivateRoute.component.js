import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

class PrivateRouteComponent extends PureComponent {
  render() {
    const { currentUser, location, ...rest } = this.props;
    const redirectURL = '/login';
    const currentLocation = location.pathname;

    if (!currentUser) {
      return location.pathname !== redirectURL
        ? <Redirect 
            to={{
              pathname: redirectURL,
              state: {
                referrer: currentLocation,
              },
            }}
          />
        : null;
    }

    return <Route {...rest} />;
  }
}

export default withRouter(
  connect(state => (
    {
      currentUser: state.currentUser,
    }
  ))(PrivateRouteComponent)
);