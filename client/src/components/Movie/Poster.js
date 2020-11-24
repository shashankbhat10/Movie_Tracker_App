import React, { Fragment, useState, useRef, useEffect } from 'react';
import Spinner from '../Utility/Spinner';
import PropTypes from 'prop-types';

const Poster = ({ image_source_poster, image_source_backdrop, movie_name }) => {
  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
    console.log('Inside imageLoaded: ' + loading);
  };

  const poster_url_sm = `https://image.tmdb.org/t/p/w342${image_source_poster}`;
  const poster_url_xs = `https://image.tmdb.org/t/p/w342${image_source_poster}`;

  return (
    <Fragment>
      <div
        className="poster-spinner"
        style={{ display: loading ? 'block' : 'none' }}
      >
        <Spinner />
      </div>
      <img
        src={poster_url_sm}
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={() => imageLoaded()}
        alt={movie_name}
        className="d-none d-sm-block poster-image"
      />
      <img
        src={poster_url_xs}
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={() => imageLoaded()}
        alt={movie_name}
        className="d-sm-none poster-image"
      />
    </Fragment>
  );
};

Poster.propTypes = {
  image_source: PropTypes.string.isRequired,
  movie_name: PropTypes.string.isRequired,
};

export default Poster;
