import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieSimilar = ({ movies }) => {
  console.log(movies);
  return (
    <div className="mt-3 pl-4 pb-1" style={{ width: '95%' }}>
      <h5 className="pb-1">Similar Movies</h5>
      <div
        className="pl-2 d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {movies.map((movie, index) => {
          return (
            <Card
              key={`movie_similar_${movie.id}`}
              style={{ width: '25%', minWidth: '300px' }}
            >
              <Link to={`${movie.id}`} style={{ textDecoration: 'none' }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                />
                <Card.Body className="px-2 py-2">
                  <Card.Title className="m-0" style={{ color: 'black' }}>
                    {movie.title}
                  </Card.Title>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MovieSimilar;
