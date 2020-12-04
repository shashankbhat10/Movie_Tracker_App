import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Backdrop from '../../Utility/Backdrop';

const Modal = ({ showModal, setModalShow, name, trailerKey }) => {
  return (
    <Fragment>
      {showModal && <Backdrop show={showModal} />}
      <div
        className="trailer-modal my-auto mx-auto"
        style={{
          border: '1px solid black',
          transform: showModal ? 'translateY(0)' : 'translateY(-110%)',
          opacity: showModal ? '1' : '0',
        }}
      >
        <div className="trailer-title d-flex flex-row justify-content-between py-2">
          <span className="pl-5">{name}</span>
          <div
            className="trailer-close pr-5"
            onClick={() => setModalShow(false)}
          >
            <span className="pl-3 pr-3">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        </div>
        <div className="trailer-video">
          <iframe
            src={showModal ? `https://www.youtube.com/embed/${trailerKey}` : ''}
            frameBorder="0"
            className="trailer-video-iframe"
            title={trailerKey}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setModalShow: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  trailerKey: PropTypes.string.isRequired,
};

export default Modal;
