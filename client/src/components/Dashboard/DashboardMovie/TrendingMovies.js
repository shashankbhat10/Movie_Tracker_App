import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const TrendingMovies = ({ movies }) => {
  return (
    <div className="my-3 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Trending Movies</h5>
      <div className="d-flex flex-nowrap" style={{ overflowX: 'auto' }}>
        {movies.map((movie, index) => {
          return (
            <Card
              key={`trending_movies_${movie.id}`}
              style={{ width: '50%', minWidth: '300px' }}
            >
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card.Img
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  style={{ width: '100%' }}
                />
                <Card.Title className="my-1" style={{ fontSize: '1em' }}>
                  {movie.title}
                </Card.Title>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingMovies;
