import React from 'react';
import { Link } from 'react-router-dom';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';

const TrendingMovies = ({ movies }) => {
  return (
    <div className="my-3 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Trending Movies</h5>
      <div className="d-flex flex-nowrap" style={{ overflowX: 'auto' }}>
        {movies.map((movie, index) => {
          return (
            <Card
              className="bg-transparent col-4 px-0"
              key={`trending_movies_${movie.id}`}
              style={{ border: '0px', minWidth: '250px', maxWidth: '350px' }}
            >
              <div className="dashboard-content">
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                    style={{ width: '100%' }}
                  />
                </Link>
                <div className="d-flex flex-row dashboard-options px-4 py-2 justify-content-between align-items-center">
                  <div className="dashboard-icons">
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
                style={{ textDecoration: 'none' }}
              >
                <Card.Title
                  className="my-1"
                  style={{ fontSize: '1em', color: 'black' }}
                >
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

export default TrendingMovies;
