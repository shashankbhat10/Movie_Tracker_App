import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MovieCast = ({ cast }) => {
  return (
    <Fragment>
      <div className="movie-cast mt-3 ml-5">
        <span className="movie-cast-header pl-3">Main Cast</span>
        <div className="movie-cast-body mr-auto my-1">
          <div className="d-flex flex-row flex-nowrap my-2 ">
            {cast.map((c, index) => {
              return (
                <div className="cast-card mx-1 d-flex flex-column" key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                    alt=""
                    className="profile-image"
                  />
                  <span className="pt-2 px-2">
                    <strong>{c.name}</strong>
                  </span>
                  <span className="px-2">{c.character}</span>
                </div>
              );
            })}
            <div className="cast-card mr-1 ml-1 d-flex">
              <span className="my-auto mx-auto">
                <a href="#!" style={{ color: 'black' }}>
                  View more <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="movie-cast-footer pt-1 pb-2 pl-3">
          <span>
            <a href="/#!">View complete cast {'&'} crew</a>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

MovieCast.propTypes = {
  cast: PropTypes.array.isRequired,
};

export default MovieCast;
