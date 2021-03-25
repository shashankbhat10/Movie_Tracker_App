import React from 'react';
import { Card } from 'react-bootstrap';

const TVPosters = ({ posters }) => {
  return (
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {posters.map((poster, index) => {
        return (
          <Card
            key={`poster_${index}`}
            className="col-md-3 px-0 bg-transparent"
            style={{ minWidth: '200px', maxWidth: '220px' }}
          >
            <Card.Img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w342${[poster.file_path]}`}
              style={{ border: '2px solid #30363d' }}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default TVPosters;
