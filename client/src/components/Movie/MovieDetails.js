import React from 'react';

const MovieDetails = ({
  details: { title, release_date, overview, tagline, genres, runtime },
  cast: { director, screenplay, producer },
}) => {
  return (
    <div
      className="col-sm-8 p-3 pl-sm-5"
      style={{
        backgroundColor: 'pink',
        padding: 0,
        border: '1px solid black',
      }}
    >
      <div className="d-flex flex-column h-100 flex-grow-1 movie-detail">
        <div>
          <h2 className="pt-sm-4 mt-lg-4">
            {title} <span>({release_date.substring(0, 4)})</span>
          </h2>
          <div className="d-none d-lg-flex m-0 pl-0 optional-details">
            <div>
              {genres.map((genre, index) => {
                return <span key={index}>{(index ? ', ' : '') + genre}</span>;
              })}
            </div>
            <span className="ml-1">
              {Math.floor(runtime / 60)}h {runtime % 60}m
            </span>
          </div>
        </div>
        <div className="pt-sm-3 align-self-center">
          <p className="mb-sm-1">{tagline}</p>
          <div className="movie-overview">
            <strong>Overview</strong>
            <p>{overview}</p>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between mt-auto pb-sm-3 pr-sm-2 align-sm-items-center">
          {director !== undefined && (
            <div className="d-flex flex-sm-column">
              <span className="mb-sm-0 pad-xs">
                <strong>{director.name}</strong>
              </span>
              <span>Director</span>
            </div>
          )}
          {screenplay !== undefined && (
            <div className="d-flex flex-sm-column">
              <span className="mb-sm-0 pad-xs">
                <strong>{screenplay.name}</strong>
              </span>
              <span>Screenplay</span>
            </div>
          )}
          {producer !== undefined && (
            <div className="d-flex flex-sm-column">
              <span className="mb-sm-0 pad-xs">
                <strong>{producer !== null && producer.name}</strong>
              </span>
              <span>Producer</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
