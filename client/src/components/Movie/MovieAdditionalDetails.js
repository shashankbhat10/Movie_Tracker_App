import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import MovieTrailerModal from './MovieTrailerModal';

const MovieAdditionalDetails = ({ details, links }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    console.log('IN');
    setShowModal(true);
  };

  return (
    <div className="pl-3 mt-4 mb-4 mx-auto" style={{ width: '95%' }}>
      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
        <h5>Additional Details</h5>
        <span className="pr-3 d-none d-lg-block">
          <Button onClick={() => handleModalOpen()}>
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
            Show Trailer
          </Button>
          {showModal && (
            <MovieTrailerModal
              showModal={showModal}
              handleClose={handleModalClose}
              trailer={details.trailer}
            />
          )}
        </span>
      </div>
      <div className="show-info d-flex flex-row justify-content-between px-3">
        <span className="d-flex flex-column align-items-center">
          <strong>Status</strong>
          <span className="text-muted">{details.status}</span>
        </span>
        <span className="d-flex flex-column align-items-center">
          <strong>Original Language</strong>
          <span className="text-muted">{details.originalLanguage}</span>
        </span>
        <span className="d-flex flex-column align-items-center">
          <strong>Budget</strong>
          <span className="text-muted">
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(details.budget)}
          </span>
        </span>
        <span className="d-flex flex-column align-items-center">
          <strong>Revenue</strong>
          <span className="text-muted">
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(details.revenue)}
          </span>
        </span>
        <span className="d-flex flex-column align-items-center">
          <strong>Release Date</strong>
          <span className="text-muted">
            {details.releaseDate === null ? '-' : details.releaseDate}
          </span>
        </span>
      </div>
      <div
        className="d-flex flex-row justify-content-between px-3 pt-3 mx-auto"
        style={{ width: '75%' }}
      >
        {details.production.length !== 0 && (
          <div className="d-flex flex-column align-items-center">
            <strong>Production</strong>
            <div>
              {details.production.map((company, index) => {
                return (
                  <OverlayTrigger
                    key={`tooltip_rent_${company.name}`}
                    placement="right"
                    overlay={
                      <Tooltip id={`tooltip-${company.name}`}>
                        {company.name}
                      </Tooltip>
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={`${company.name}`}
                      style={{ maxWidth: '60px' ,backgroundColor: 'white',padding: '5px',margin: '5px'}}
                      className="pt-1 px-1"
                    />
                  </OverlayTrigger>
                );
              })}
            </div>
          </div>
        )}
        <div className="d-flex flex-column align-items-center">
          <strong>Social</strong>
          <div className="social-links pt-1">
            {links.homepage !== null && (
              <span className="px-2">
                <a href={`${links.homepage}`} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGlobeAsia} size="2x" />
                </a>
              </span>
            )}
            {links.social.facebook !== null && (
              <span className="px-2">
                <a
                  href={`https://www.facebook.com/${links.social.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </span>
            )}
            {links.social.instagram !== null && (
              <span className="px-2">
                <a
                  href={`https://www.instagram.com/${links.social.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </span>
            )}
            {links.social.twitter !== null && (
              <span className="px-2">
                <a
                  href={`https://www.twitter.com/${links.social.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdditionalDetails;
