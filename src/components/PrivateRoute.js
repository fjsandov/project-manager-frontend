import React from 'react';
import { connect } from 'react-redux';
import { getIsSignedIn } from '../store/ducks/session';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ isSignedIn, component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      isSignedIn
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
}

function mapStateToProps(state) {
  return {
    isSignedIn: getIsSignedIn(state),
  };
}

export default connect(mapStateToProps)(PrivateRoute);