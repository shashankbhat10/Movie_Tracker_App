import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';

const TVHeader = ({ details }) => {
  console.log(details.genres);
  return (
    <Fragment>
      <Card
        className="d-flex flex-row mx-auto mt-3"
        style={{
          width: '95%',
          maxWidth: '1000px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <Card.Img
          src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
          className="col-md-4 pl-0"
        />
        <Card.Body className="col-md-8 pt-4">
          <Card.Title className="d-flex flex-row">
            <h2>
              {details.name}
              {'  (' + details.startDate.slice(0, 4)})
            </h2>
          </Card.Title>
          <Card.Subtitle>
            {details.genres.map((genre) => genre.name).join(', ')}
          </Card.Subtitle>
          <Card.Text className="pt-md-4 mb-0">{details.tagline}</Card.Text>
          <Card.Text className="pt-md-1">
            <strong>Overview</strong>
            <p>{details.overview}</p>
          </Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default TVHeader;
