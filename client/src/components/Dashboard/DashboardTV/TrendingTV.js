import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const TrendingTV = ({ shows }) => {
  return (
    <div className="my-2 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Trending TV Shows</h5>
      <div
        className="d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {shows.map((show, index) => {
          return (
            <div
              key={`trending_show_${show.id}`}
              style={{ width: '25%', height: 'auto', minWidth: '300px' }}
            >
              <Card>
                <Link to={`/tv/${show.id}`} style={{ textDecoration: 'none' }}>
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w780${show.backdrop_path}`}
                  />
                  <Card.Title className="my-1" style={{ fontSize: '1em' }}>
                    {show.title}
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

export default TrendingTV;
