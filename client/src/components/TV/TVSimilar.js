import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TVSimilar = ({ shows }) => {
  return (
    <div className="pl-3 mb-5" style={{ width: '95%' }}>
      <div className="pl-3">
        <h5>Similar TV Shows</h5>
      </div>
      <div
        className="d-flex flex-row flex-nowrap pt-2 pl-3"
        style={{ overflowX: 'auto' }}
      >
        {shows.map((show) => {
          return (
            <Card
              key={`show_similar_${show.id}`}
              className="col-md-4 px-0"
              style={{ minWidth: '300px' }}
            >
              <Link to={`/tv/${show.id}`} style={{ textDecoration: 'none' }}>
                <Card.Img
                  src={`https://image.tmdb.org/t/p/w780${show.backdrop_path}`}
                />
                <Card.Text className="pl-1 pt-1">
                  <strong>{show.name}</strong>
                </Card.Text>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TVSimilar;
