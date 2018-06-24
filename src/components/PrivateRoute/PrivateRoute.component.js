import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

class PrivateRouteComponent extends PureComponent {
  render() {
    const { component: Component, currentUser, ...rest } = this.props;

    return (
      <Route
      {...rest}
        render={props => 
          currentUser
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
        }
      />
    )
  }
}

export default connect(state => (
  {
    currentUser: state.currentUser,
  }
))(PrivateRouteComponent);