import React from 'react';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PopularTV from './PopularTV';
import TrendingTV from './TrendingTV';
import { getDashboardTV } from '../../../actions/dashboard';

const DashboardTV = ({ popular, trending, loading, getDashboardTV }) => {
  useEffect(() => {
    getDashboardTV();
  }, []);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <PopularTV shows={popular} />
          <TrendingTV shows={trending} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  popular: state.dashboard.tv.popular,
  trending: state.dashboard.tv.trending,
  loading: state.dashboard.tvLoading,
});

export default connect(mapStateToProps, { getDashboardTV })(DashboardTV);
