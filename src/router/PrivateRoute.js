import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...remainingProps
}) => (
  <Route
    {...remainingProps}
    component={(props) => (
      isAuthenticated
        ?
          <div>
            <Header />
            <Component {...props} />
          </div>
        :
          <Redirect to="/" />
    )}
  />
);

const mapStateToProps = ({ auth: { uid } }) => ({ isAuthenticated: !!uid });

export default connect(mapStateToProps)(PrivateRoute);
