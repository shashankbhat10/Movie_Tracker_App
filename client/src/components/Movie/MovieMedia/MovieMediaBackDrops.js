import React from 'react';

const BackDrops = ({ backdrops }) => {
  return (
    <div
      className="pt-1 mr-auto d-flex flex-row flex-nowrap"
      style={{ overflowX: 'auto' }}
    >
      {backdrops.images.map((backdrop, index) => {
        return (
          <div
            key={`backdrop_${index}`}
            style={{
              width: '40%',
              border: '1px solid black',
              minWidth: '450px',
            }}
            className="mx-1 mb-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
              alt="poster"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BackDrops;
