import React from 'react';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectRandomGenres } from '../../../actions/dashboard';
import DisplayDiscoverContent from './DisplayDiscoverContent';

const DashboardDiscover = ({
  loading,
  movieGenre,
  tvGenre,
  getGenresContent,
  selectRandomGenres,
}) => {
  const loadMoreGenres = () => {
    selectRandomGenres(movieGenre.remaining, tvGenre.remaining);
  };

  return (
    <Fragment>
      {!loading && (
        <DisplayDiscoverContent
          loadMoreGenres={loadMoreGenres}
          remainingGenres={
            movieGenre.remaining.length + tvGenre.remaining.length
          }
          renderedGenres={movieGenre.rendered.length + tvGenre.rendered.length}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  movieGenre: state.dashboard.genres.movie,
  tvGenre: state.dashboard.genres.tv,
  loading: state.dashboard.genresLoading,
});

export default connect(mapStateToProps, { selectRandomGenres })(
  DashboardDiscover
);
