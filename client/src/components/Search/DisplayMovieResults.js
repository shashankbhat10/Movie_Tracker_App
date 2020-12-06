import React, { useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <ul>
        {console.log('Movie Page Number: ' + movies.currentPage)}
        {movies.data.map((movie, index) => {
          // return (
          //   <li key={`searchedResult_${movie.id}`} className="py-5">
          //     {movie.title}
          //   </li>
          // );

          if (movies.data.length === index + 1) {
            return (
              <li
                ref={lastSearchedResult}
                key={`movie_${movie.id}`}
                className="py-5"
              >
                {movie.title}
              </li>
            );
          } else {
            return (
              <li key={`searchedResult_${movie.id}`} className="py-5">
                {movie.title}
              </li>
            );
          }
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
