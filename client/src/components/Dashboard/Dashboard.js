import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { getGenres, getDashboardTopContent } from '../../actions/dashboard';
import { Redirect } from 'react-router-dom';
import DisplayDashboardContent from './DisplayDashboardContent';
import Spinner from '../Utility/Spinner';
import { selectRandomGenres } from '../../actions/dashboard';

const Dashboard = ({
  isAuthenticated,
  getDashboardTopContent,
  loading,
  movieGenre,
  tvGenre,
  selectRandomGenres,
}) => {
  const loadMoreGenres = () => {
    console.log('in genre');
    selectRandomGenres(movieGenre.remaining, tvGenre.remaining);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getDashboardTopContent();
    }
  }, []);

  return (
    <Fragment>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <div>
          {loading ? (
            <div className="poster-spinner">
              <Spinner />
            </div>
          ) : (
            <DisplayDashboardContent
              loadMoreGenres={loadMoreGenres}
              remainingGenres={
                movieGenre.remaining.length + tvGenre.remaining.length
              }
              renderedGenres={
                movieGenre.rendered.length + tvGenre.rendered.length
              }
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  movies: state.dashboard.movies,
  tv: state.dashboard.tv,
  genreContent: state.dashboard.discover,
  loading: state.dashboard.loading,
  discoverLoading: state.dashboard.discoverLoading,
  movieGenre: state.dashboard.genres.movie,
  tvGenre: state.dashboard.genres.tv,
  genreLoading: state.dashboard.genresLoading,
});

export default connect(mapStateToProps, {
  getGenres,
  getDashboardTopContent,
  selectRandomGenres,
})(Dashboard);
