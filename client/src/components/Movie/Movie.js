import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovieById } from '../../actions/movie';
import Poster from './Poster';
import MovieDetails from './MovieDetails';

const Movie = ({
  getMovieById,
  match,
  poster_path,
  backdrop_path,
  movie_details,
  cast,
}) => {
  useEffect(() => {
    console.log('THIS!!!!');
    getMovieById(match.params.id);
    console.log(match.params.id);
    console.log(movie_details);
  }, []);
  console.log('THISS AGAINA!!!!');
  return (
    <div>
      {console.log(movie_details)}
      <div
        className="conatiner movie-header my-2"
        style={{ border: '2px solid brown' }}
      >
        <div className="row" style={{ margin: 'auto' }}>
          <div
            className="col-sm-4"
            style={{
              backgroundColor: 'lightgreen',
              padding: 0,
              border: '1px solid black',
            }}
          >
            <Poster
              image_source_poster={poster_path}
              image_source_backdrop={backdrop_path}
              movie_name={movie_details.title}
            />
          </div>
          <div
            className="col-sm-8 p-3 pl-sm-5"
            style={{
              backgroundColor: 'pink',
              padding: 0,
              border: '1px solid black',
            }}
          >
            <MovieDetails details={movie_details} cast={cast} />
          </div>
        </div>
      </div>
    </div>
  );
};

Movie.propTypes = {
  getMovieById: PropTypes.func.isRequired,
  poster_path: PropTypes.string.isRequired,
  backdrop_path: PropTypes.string.isRequired,
  movie_details: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  poster_path: state.movie.images.poster,
  backdrop_path: state.movie.images.backdrop,
  movie_details: state.movie.details,
  cast: state.movie.cast,
});

export default connect(mapStateToProps, { getMovieById })(Movie);
