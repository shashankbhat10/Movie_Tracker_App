import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noImage from '../../images/download.png';

const TVCast = ({ id, cast }) => {
  return (
    <div className="px-4 mb-3">
      <h5 className="pl-3">Main Cast</h5>
      <div
        className="pt-1 d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {cast.slice(0, 15).map((actor, index) => {
          return (
            <Card
              key={`tv_cast_${actor.id}`}
              className="mx-1"
              style={{
                display: 'block',
                minWidth: '140px',
                border: '#30363d 2px solid',
                backgroundColor: '#16161d',
              }}
            >
              <Link className="profile-image" to={`/person/${actor.id}`}>
                <Card.Img
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : noImage
                  }
                />
              </Link>
              <Card.Body className="px-1 py-1 d-flex flex-column">
                <Link
                  to={`/person/${actor.id}`}
                  style={{ textDecoration: 'none', color: '#c3d1d9' }}
                >
                  <span>
                    <strong>{actor.name}</strong>
                  </span>
                </Link>
                <span style={{ fontSize: '90%' }}>{actor.character}</span>
                <span className="mt-auto pl-1" style={{ fontSize: '90%' }}>
                  {actor.episodeCount} Episodes
                </span>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h6 className="pt-3 pl-3">
        <Link
          to={`/tv/${id}/complete-credits`}
          style={{ textDecoration: 'none', color: '#c3d1d9' }}
        >
          Full Cast and Crew
        </Link>
      </h6>
    </div>
  );
};

export default TVCast;
