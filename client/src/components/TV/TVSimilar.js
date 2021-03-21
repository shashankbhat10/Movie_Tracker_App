import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noImage from '../../images/image-not-found.png';

const TVSimilar = ({ shows }) => {
  return (
    <div className="px-4 pb-5">
      <div className="px-3">
        <h5>Similar TV Shows</h5>
      </div>
      {shows.length === 0 && (
        <span className="pl-3">
          Insufficient data to provide Similar Content.
        </span>
      )}
      {shows.length !== 0 && (
        <div
          className="d-flex flex-row flex-nowrap pt-2"
          style={{ overflowX: 'auto' }}
        >
          {shows.map((show) => {
            return (
              <Card
                key={`show_similar_${show.id}`}
                className="col-md-4 px-0"
                style={{ minWidth: '300px', maxWidth: '350px', border: '0px' }}
              >
                <Link to={`/tv/${show.id}`} style={{ textDecoration: 'none' }}>
                  <Card.Img
                    loading="lazy"
                    src={
                      show.backdrop_path
                        ? `https://image.tmdb.org/t/p/w780${show.backdrop_path}`
                        : noImage
                    }
                  />
                  <Card.Text className="pl-1 pt-1" style={{ color: 'black' }}>
                    <strong>{show.name}</strong>
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

export default TVSimilar;
