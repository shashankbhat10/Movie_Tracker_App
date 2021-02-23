import React from 'react';
import { Card } from 'react-bootstrap';

const TVCast = ({ cast }) => {
  return (
    <div className="px-4 mb-3">
      <h5 className="pl-3">Main Cast</h5>
      <div
        className="pt-1 d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {cast.map((actor, index) => {
          return (
            <Card
              key={`tv_cast_${actor.id}`}
              className="mx-1"
              style={{
                display: 'block',
                minWidth: '140px',
              }}
            >
              <Card.Img
                className="profile-image"
                style={{ width: '100%', height: 'auto' }}
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              />
              <Card.Body className="px-1 py-1 d-flex flex-column">
                <span>
                  <strong>{actor.name}</strong>
                </span>
                <span style={{ fontSize: '90%' }}>{actor.character}</span>
                <span className="mt-auto pl-1" style={{ fontSize: '90%' }}>
                  {actor.episodeCount} Episodes
                </span>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h6 className="pt-3 pl-3">Full Cast and Crew</h6>
    </div>
  );
};

export default TVCast;
