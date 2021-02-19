import React from 'react';

const Posters = ({ posters }) => {
  return (
    <div
      className="pt-3 mr-auto d-flex flex-row flex-nowrap"
      style={{ overflowX: 'auto' }}
    >
      {posters.images.map((poster, index) => {
        return (
          <div
            key={`poster_${index}`}
            className="mx-1"
            style={{ width: '25%', maxWidth: '300px', minWidth: '200px' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${[poster.file_path]}`}
              alt="poster"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Posters;
