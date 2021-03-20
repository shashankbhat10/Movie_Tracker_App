import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieSimilar = ({ movies }) => {
  console.log(movies);
  return (
    <div className="mt-3 pl-4 pb-5" style={{ width: '95%' }}>
      <h5 className="pb-1">Similar Movies</h5>
      {movies.length === 0 && (
        <span> Insufficient Data to suggest similar movies!</span>
      )}
      {movies.length !== 0 && (
        <div
          className="d-flex flex-row flex-nowrap pt-2 pl-3"
          style={{ overflowX: 'auto' }}
        >
          {movies.map((movie, index) => {
            return (
              <Card
                key={`movie_similar_${movie.id}`}
                className="col-md-4 px-0"
                style={{
                  minWidth: '300px',
                  maxWidth: '350px',
                  backgroundColor: 'transparent',
                  border: '0px',
                }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  />
                  <Card.Text className="pl-1 pt-1" style={{ color: 'black' }}>
                    <strong>{movie.title}</strong>
                  </Card.Text>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieSimilar;
