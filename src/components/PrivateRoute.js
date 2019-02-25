import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth'


const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        auth.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;