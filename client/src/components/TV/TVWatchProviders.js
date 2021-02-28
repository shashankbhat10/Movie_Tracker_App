import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const TVWatchProviders = ({ providers }) => {
  return (
    <div className="pl-3 mb-3 mx-auto" style={{ width: '95%' }}>
      <h5>Providers</h5>
      {providers === undefined && <span>No Watch Providers found!</span>}
      {providers !== undefined && (
        <div>
          <div className="d-flex flex-row">
            <h5 className="mb-0">Where to Watch?</h5>
            <a
              href={providers.link}
              target="_blank"
              rel="noreferrer"
              className="pl-3"
            >
              TMDB <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="pl-2">
            {Object.keys(providers)
              .slice(1)
              .map((provider) => {
                return (
                  <div
                    className="d-flex align-items-center"
                    key={`watch_${provider.id}`}
                  >
                    <span style={{ width: '100px' }}>
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </span>
                    {providers[provider].map((stream, index) => {
                      return (
                        <span
                          key={`stream_${stream.provider_id}`}
                          className="pl-4"
                        >
                          <img
                            className="watch-logo"
                            src={`https://image.tmdb.org/t/p/original${stream.logo_path}`}
                            alt={stream.provider_name}
                          />
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            {/* {providers['flatrate'] !== undefined && (
          <div className="d-flex align-items-center">
            <span style={{ width: '100px' }}>Streaming</span>
            {providers.flatrate.map((stream, index) => {
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
        {providers['buy'] !== undefined && (
          <div className="d-flex align-items-center">
            <span style={{ width: '100px' }}>Buy</span>
            {providers.buy.map((buy, index) => {
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
        {providers['rent'] !== undefined && (
          <div className="d-flex align-items-center">
            <span style={{ width: '100px' }}>Rent</span>
            {providers.rent.map((rent, index) => {
              return (
                <span key={`rent${rent.provider_id}`} className="pl-4">
                  <img
                    className="watch-logo"
                    src={`https://image.tmdb.org/t/p/original${rent.logo_path}`}
                    alt={rent.provider_name}
                  />
                </span>
              );
            })}
          </div>
        )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TVWatchProviders;
