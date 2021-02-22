import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import DashboardDiscover from './DashboardDiscover/DashboardDiscover';
import DashboardMovie from './DashboardMovie/DashboardMovie';
import DashboardTV from './DashboardTV/DashboardTV';
import { getGenres } from '../../actions/dashboard';

const Dashboard = ({ getGenres }) => {
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

export default connect(null, { getGenres })(Dashboard);
