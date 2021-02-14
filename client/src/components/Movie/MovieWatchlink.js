import React from 'react';
import { Fragment } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const MovieWatchlink = ({ watchlinks }) => {
  return (
    <Fragment>
      <div className="mt-3 ml-5 mr-5">
        <span className="pl-3">
          Where to watch?{' '}
          <a href={watchlinks.link} target="_blank" rel="noreferrer">
            TMDB
          </a>
        </span>
        <div className="pt-2 pl-3">
          {watchlinks['flatrate'] != null && (
            <div className="d-flex align-items-center">
              <span style={{ width: '100px' }}>Streaming</span>
              {watchlinks.flatrate.map((stream, index) => {
                return (
                  <span key={`stream_${stream.provider_id}`} className="pl-4">
                    <img
                      className="watch-logo"
                      src={`https://image.tmdb.org/t/p/original${stream.logo_path}`}
                      alt={stream.provider_name}
                    />
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="pt-2 pl-3">
          {watchlinks['buy'] != null && (
            <div className="d-flex align-items-center">
              <span style={{ width: '100px' }}>Buy</span>
              {watchlinks.buy.map((buy, index) => {
                return (
                  <span key={`buy${buy.provider_id}`} className="pl-4">
                    <img
                      className="watch-logo"
                      src={`https://image.tmdb.org/t/p/original${buy.logo_path}`}
                      alt={buy.provider_name}
                    />
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="pt-2 pl-3">
          {watchlinks['rent'] != null && (
            <div className="d-flex align-items-center">
              <span style={{ width: '100px' }}>Rent</span>
              {watchlinks.rent.map((rent, index) => {
                return (
                  <OverlayTrigger
                    key={`tooltip_rent_${rent.provider_id}`}
                    placement="right"
                    overlay={
                      <Tooltip id={`tooltip-${rent.provider_id}`}>
                        {rent.provider_name}
                      </Tooltip>
                    }
                  >
                    <span key={`rent${rent.provider_id}`} className="pl-4">
                      <img
                        className="watch-logo"
                        src={`https://image.tmdb.org/t/p/original${rent.logo_path}`}
                        alt={rent.provider_name}
                      />
                    </span>
                  </OverlayTrigger>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MovieWatchlink;
