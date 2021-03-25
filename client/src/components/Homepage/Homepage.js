import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { getGenres, getDashboardTopContent } from '../../actions/homepage';
import { Redirect } from 'react-router-dom';
import DisplayHomepageContent from './DisplayHomepageContent';
import Spinner from '../Utility/Spinner';
import { selectRandomGenres } from '../../actions/homepage';

const Homepage = ({
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
            <DisplayHomepageContent
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
  movies: state.homepage.movies,
  tv: state.homepage.tv,
  genreContent: state.homepage.discover,
  loading: state.homepage.loading,
  discoverLoading: state.homepage.discoverLoading,
  movieGenre: state.homepage.genres.movie,
  tvGenre: state.homepage.genres.tv,
  genreLoading: state.homepage.genresLoading,
});

export default connect(mapStateToProps, {
  getGenres,
  getDashboardTopContent,
  selectRandomGenres,
})(Homepage);
