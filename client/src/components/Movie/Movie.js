import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieById } from '../../actions/movie';
import Spinner from '../Utility/Spinner';
import MovieCast from './MovieCast';
import MovieAdditionalDetails from './MovieAdditionalDetails';
import MovieWatchlink from './MovieWatchlink';
import MovieReview from './MovieReview';
import MovieMedia from './MovieMedia/MovieMedia';
import MovieSimilar from './MovieSimilar';
import MovieHeader from './MovieHeader';

const Movie = ({
  getMovieById,
  match,
  poster_path,
  backdrop_path,
  movie_details,
  credits,
  loading,
  watchlinks,
  reviews,
  media,
  similarMovies,
  additionalDetails,
  links,
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
  }, [getMovieById, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <div className="poster-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="movie-header pt-3">
          <div>
            <MovieHeader
              details={movie_details}
              poster={poster_path}
              crew={credits.crew}
            />
          </div>
          <div>
            <MovieAdditionalDetails details={additionalDetails} links={links} />
          </div>
          <div>
            <MovieCast cast={credits.cast} id={match.params.id} />
          </div>
          <hr className="my-2" style={{ width: '95%' }} />
          <div>{watchlinks && <MovieWatchlink watchlinks={watchlinks} />}</div>
          <div>
            <MovieReview reviews={reviews} />
          </div>
          <hr className="my-2" style={{ width: '95%' }} />
          <div>
            <MovieMedia
              posters={media.posters}
              backdrops={media.backdrops}
              videos={media.videos}
            />
          </div>
          <hr className="my-2" style={{ width: '95%' }} />
          <div>
            <MovieSimilar movies={similarMovies} />
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
  credits: state.movie.credits,
  loading: state.movie.loading,
  watchlinks: state.movie.watchlinks,
  reviews: state.movie.reviews,
  media: state.movie.media,
  similarMovies: state.movie.similar,
  additionalDetails: state.movie.additionalDetails,
  links: state.movie.links,
});

export default connect(mapStateToProps, { getMovieById })(Movie);
