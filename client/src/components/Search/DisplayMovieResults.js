import React, { useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../images/download.png';

const DisplayMovieResults = ({ movies, loadMoreResults }) => {
  const observer = useRef();
  const lastSearchedResult = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          movies.currentPage < movies.totalPages
        ) {
          console.log('INTERSECTION' + movies.currentPage);
          const nextPage = movies.currentPage + 1;
          loadMoreResults(nextPage);
        }
      });
      if (result) {
        observer.current.observe(result);
      }
      console.log('Reached End');
    },
    [movies]
  );

  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        {console.log('Movie Page Number: ' + movies.currentPage)}
        {movies.data.map((movie, index) => {
          return (
            <li
              key={`searchedResult_${movie.id}`}
              className="row py-1"
              style={{
                margin: '10px 10px 10px 10px',
              }}
              ref={movies.data.length === index + 1 ? lastSearchedResult : null}
            >
              <div
                style={{
                  display: 'flex',
                  borderRadius: '10px',
                  border: '1px solid black',
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'cyan',
                  overflow: 'hidden',
                  maxHeight: '15em',
                  minWidth: '500px',
                }}
              >
                <Link to={`movie/${movie.id}`} className="col-md-3 pl-0">
                  <img
                    style={{ width: 'auto', maxWidth: '100%', height: '100%' }}
                    src={
                      movie.poster_path === null
                        ? noImage
                        : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    }
                  />
                </Link>
                <div className="col-md-9 pt-2">
                  <div className="d-flex">
                    <Link
                      to={`movie/${movie.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <h5 className="mb-0">{movie.title}</h5>
                    </Link>
                    <span className="pl-3">
                      {movie.vote_average}
                      <FontAwesomeIcon icon={faStar} className="pl-1" />
                    </span>
                  </div>
                  <span>{movie.release_date}</span>
                  <p className="pt-2">{movie.overview}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DisplayMovieResults.propTypes = {};

const mapStateToProps = (state) => ({
  movies: state.search.movies,
});

export default connect(mapStateToProps, {})(DisplayMovieResults);
