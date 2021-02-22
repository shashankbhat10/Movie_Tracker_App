import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PopularMovies = ({ movies }) => {
  return (
    <div className="my-2 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Popular Movies</h5>
      <div
        className="d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {movies.map((movie, index) => {
          return (
            <div
              key={`popular_movies_${movie.id}`}
              style={{ width: '25%', height: 'auto', minWidth: '300px' }}
            >
              <Card>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  />
                  <Card.Title className="my-1" style={{ fontSize: '1em' }}>
                    {movie.title}
                  </Card.Title>
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularMovies;
