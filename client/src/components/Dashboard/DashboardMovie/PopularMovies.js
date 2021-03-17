import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const PopularMovies = ({ movies, watched }) => {
  const [hoverState, updateHoverState] = useState(false);

  const handleMouseOver = (flag) => {
    updateHoverState(flag);
  };

  return (
    <div className="mb-2 pt-2 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Popular Movies</h5>
      <div
        className="d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {movies.map((movie, index) => {
          return (
            <Card
              key={`popular_movies_${movie.id}`}
              className="bg-transparent col-4 px-0"
              style={{
                minWidth: '250px',
                maxWidth: '350px',
                border: '0px',
              }}
            >
              <div className="dashboard-content">
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  />
                </Link>
                <div className="d-flex flex-row dashboard-options px-4 py-2 justify-content-between align-items-center">
                  <div
                    className="dashboard-icons"
                    style={{
                      border:
                        watched.movie
                          .map((item) => item.id)
                          .includes(movie.id) && '2px solid green',
                    }}
                  >
                    <OverlayTrigger
                      key={`tooltip_dashboard_content_options_${movie.id}_watchlist`}
                      placement="bottom"
                      overlay={
                        <Tooltip id={`content_${movie.id}_${index}_watchlist`}>
                          Movie Watched
                        </Tooltip>
                      }
                    >
                      <div>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div className="dashboard-icons">
                    <OverlayTrigger
                      key={`tooltip_dashboard_content_options_${movie.id}_watchlist`}
                      placement="bottom"
                      overlay={
                        <Tooltip id={`content_${movie.id}_${index}_watchlist`}>
                          Add to Watchlist
                        </Tooltip>
                      }
                    >
                      <FontAwesomeIcon
                        icon={faList}
                        className="content-options"
                        onClick={() => {
                          console.log('IN');
                        }}
                      />
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Card.Title className="my-1 pl-1" style={{ fontSize: '1em' }}>
                  {movie.title}
                </Card.Title>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  watched: state.profile.watched,
});

export default connect(mapStateToProps, {})(PopularMovies);
