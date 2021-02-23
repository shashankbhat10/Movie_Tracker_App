import React from 'react';
import { Card } from 'react-bootstrap';

const TVBackdrops = ({ backdrops }) => {
  return (
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {backdrops.map((backdrop, index) => {
        return (
          <Card
            className="col-md-5 px-0"
            style={{ minWidth: '350px' }}
            key={`backdrop_${index}`}
          >
            <Card.Img
              src={`https://image.tmdb.org/t/p/w342${[backdrop.file_path]}`}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default TVBackdrops;
