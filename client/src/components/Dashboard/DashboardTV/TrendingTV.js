import React from 'react';
import { Link } from 'react-router-dom';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faList } from '@fortawesome/free-solid-svg-icons';

const TrendingTV = ({ shows }) => {
  return (
    <div className="my-2 mx-auto px-3" style={{ width: '95%' }}>
      <h5>Trending TV Shows</h5>
      <div
        className="d-flex flex-row flex-nowrap"
        style={{ overflowX: 'auto' }}
      >
        {shows.map((show, index) => {
          return (
            <Card
              key={`trending_show_${show.id}`}
              className="bg-transparent col-4 px-0"
              style={{ border: '0px', minWidth: '250px', maxWidth: '350px' }}
            >
              <div className="dashboard-content">
                <Link to={`/tv/${show.id}`}>
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w780${show.backdrop_path}`}
                  />
                </Link>
                <div className="d-flex flex-row dashboard-options px-4 py-2 justify-content-between align-items-center">
                  <div className="dashboard-icons">
                    <OverlayTrigger
                      key={`tooltip_dashboard_content_options_${show.id}_watchlist`}
                      placement="bottom"
                      overlay={
                        <Tooltip id={`content_${show.id}_${index}_watchlist`}>
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
                      key={`tooltip_dashboard_content_options_${show.id}_watchlist`}
                      placement="bottom"
                      overlay={
                        <Tooltip id={`content_${show.id}_${index}_watchlist`}>
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
                to={`/tv/${show.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Card.Title className="my-1" style={{ fontSize: '1em' }}>
                  {show.title}
                </Card.Title>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingTV;
