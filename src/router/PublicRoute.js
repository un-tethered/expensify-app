import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...remainingProps
}) => (
  <Route
    {...remainingProps}
    component={props => (
      isAuthenticated
        ? <Redirect to="/dashboard" />
        : <Component {...props} />
    )}
  />
);

const mapStateToProps = ({ auth: { uid } }) => ({ isAuthenticated: !!uid });

export default connect(mapStateToProps)(PublicRoute);
