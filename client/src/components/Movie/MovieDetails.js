import React from 'react';

const MovieDetails = ({
  details: { title, releaseDate, overview },
  cast: { director, screenplay, producer },
}) => {
  return (
    <div className="d-flex flex-column h-100 flex-grow-1 movie-detail">
      <h1 className="pt-sm-4 mt-lg-5">{title}</h1>
      <div className="pt-sm-4 align-self-center">
        <p>{overview}</p>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-between mt-auto pb-sm-4 pr-sm-2 align-sm-items-center">
        <div className="d-flex flex-sm-column">
          <p className="mb-1 pad-xs">Director:</p>
          <p>{director.name}</p>
        </div>
        <div className="d-flex flex-sm-column">
          <p className="mb-1 pad-xs">Screenplay:</p>
          <p>{screenplay.name}</p>
        </div>
        <div className="d-flex flex-sm-column">
          <p className="mb-1 pad-xs">Producer:</p>
          <p>{producer.name}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
