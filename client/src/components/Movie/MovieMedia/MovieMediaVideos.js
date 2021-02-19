import React from 'react';

const Videos = ({ image }) => {
  return (
    <div
      className="pt-3 mr-auto d-flex flex-row flex-nowrap"
      style={{ overflowX: 'auto' }}
    >
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '300px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="mx-1"
        style={{ width: '25%', maxWidth: '250px', minWidth: '200px' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w342${image}`}
          alt="poster"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Videos;
