import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieById } from '../../actions/movie';
import Poster from './Poster';
import MovieDetails from './MovieDetails';
import Spinner from '../Utility/Spinner';
import MovieCast from './MovieCast';

const Movie = ({
  getMovieById,
  match,
  poster_path,
  backdrop_path,
  movie_details,
  cast,
  loading,
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
  }, [getMovieById]);
  return (
    <Fragment>
      {loading ? (
        <div className="poster-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="movie-header">
          <div
            className="conatiner movie-header-main py-2"
            style={{ border: '2px solid brown' }}
          >
            <div className="row" style={{ margin: 'auto' }}>
              <Poster
                image_source_poster={poster_path}
                movie_name={movie_details.title}
              />
              <MovieDetails details={movie_details} cast={cast} />
            </div>
          </div>
          <div>
            <MovieCast cast={cast.cast} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  poster_path: state.movie.images.poster,
  backdrop_path: state.movie.images.backdrop,
  movie_details: state.movie.details,
  cast: state.movie.cast,
  loading: state.movie.loading,
});

export default connect(mapStateToProps, { getMovieById })(Movie);
