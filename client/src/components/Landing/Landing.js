import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';

const Landing = ({ loading, errors, isAuthenticated }) => {
  const [isLoginForm, changeLoginForm] = useState(true);
  // return localStorage.movieTrackerAccessToken !== undefined &&
  //   localStorage.movieTrackerAccessToken.length !== 0 ? (
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <Redirect to="/hompage" />
  ) : (
    <Fragment>
      {isLoginForm ? (
        <Login
          changeLoginForm={changeLoginForm}
          loading={loading}
          errors={errors}
        />
      ) : (
        <Register
          changeLoginForm={changeLoginForm}
          loading={loading}
          errors={errors}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);
