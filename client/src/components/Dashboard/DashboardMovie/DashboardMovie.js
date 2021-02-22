import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import PopularMovies from './PopularMovies';
import TrendingMovies from './TrendingMovies';
import { getDashboardMovies } from '../../../actions/dashboard';

const DashboardMovie = ({ popular, trending, loading, getDashboardMovies }) => {
  useEffect(() => {
    getDashboardMovies();
  }, []);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <PopularMovies movies={popular} />
          <TrendingMovies movies={trending} />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  popular: state.dashboard.movies.popular,
  trending: state.dashboard.movies.trending,
  loading: state.dashboard.movieLoading,
});

export default connect(mapStateToProps, { getDashboardMovies })(DashboardMovie);
