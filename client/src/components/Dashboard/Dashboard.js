import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import DashboardDiscover from './DashboardDiscover/DashboardDiscover';
import DashboardMovie from './DashboardMovie/DashboardMovie';
import DashboardTV from './DashboardTV/DashboardTV';
import { getGenres } from '../../actions/dashboard';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ isAuthenticated, getGenres }) => {
  if (!isAuthenticated) {
    <Redirect to="/" />;
  }

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <Fragment>
      <DashboardMovie />
      <hr />
      <DashboardTV />
      <hr />
      <DashboardDiscover />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(null, { getGenres })(Dashboard);
