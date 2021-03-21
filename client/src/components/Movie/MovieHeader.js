import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const MovieHeader = ({ details, poster, crew }) => {
  const director = crew.filter((person) => person.job === 'Director')[0];
  const screenplay = crew.filter((person) => person.job === 'Screenplay')[0];
  const producer = crew.filter(
    (person) => person.job === 'Executive Producer'
  )[0];

  return (
    <Fragment>
      <Card
        className="d-flex flex-row mx-auto"
        style={{
          width: '95%',
          maxWidth: '1000px',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#16161d',
          border: '#30363d 2px solid',
          color: '#c3d1d9'
        }}
      >
        <Card.Img
          src={`https://image.tmdb.org/t/p/w342${poster}`}
          className="col-md-4 pl-0"
        />
        <Card.Body className="col-md-8 pt-4">
          <Card.Title className="d-flex flex-row">
            <h2>
              {details.title}
              {'  (' + details.release_date.slice(0, 4)})
            </h2>
          </Card.Title>
          <Card.Subtitle className="text-muted optional-details">
            {details.genres.join(', ')}
            <span className="ml-2">
              {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
            </span>
          </Card.Subtitle>
          <Card.Text className="pt-md-4 mb-0">{details.tagline}</Card.Text>
          <Card.Text className="pt-md-1 mb-0">
            <strong>Overview</strong>
          </Card.Text>
          <Card.Text>{details.overview}</Card.Text>
          <div className="d-flex flex-row justify-content-between align-items-center pt-4">
            {director !== undefined && (
              <div>
                <span className="d-flex flex-column align-items-center">
                  <Link
                    to={`/person/${director.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <strong>{director.name}</strong>
                  </Link>
                  <span>Director</span>
                </span>
              </div>
            )}
            {screenplay !== undefined && (
              <div>
                <span className="d-flex flex-column align-items-center">
                  <Link
                    to={`/person/${screenplay.id}`}
                    style={{ textDecoration: 'none', color: '#c3d1d9' }}
                  >
                    <strong>{screenplay.name}</strong>
                  </Link>
                  <span>Screenplay</span>
                </span>
              </div>
            )}
            {producer !== undefined && (
              <div>
                <span className="d-flex flex-column align-items-center">
                  <Link
                    to={`/person/${producer.id}`}
                    style={{ textDecoration: 'none', color: '#c3d1d9' }}
                  >
                    <strong>{producer.name}</strong>
                  </Link>
                  <span>Producer</span>
                </span>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default MovieHeader;
