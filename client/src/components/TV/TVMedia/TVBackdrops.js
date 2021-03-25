import React from 'react';
import { Card } from 'react-bootstrap';

const TVBackdrops = ({ backdrops }) => {
  return (
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {backdrops.map((backdrop, index) => {
        return (
          <Card
            className="col-md-5 px-0 bg-transparent"
            style={{ minWidth: '300px', maxWidth: '450px' }}
            key={`backdrop_${index}`}
          >
            <Card.Img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w342${[backdrop.file_path]}`}
              style={{ border: '2px solid #30363d' }}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default TVBackdrops;
