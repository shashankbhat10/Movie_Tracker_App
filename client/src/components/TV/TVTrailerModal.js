import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TVTrailerModal = ({ showModal, handleClose, trailer }) => {
  return (
    <Fragment>
      {/* <div style={{ width: '80%', minWidth: '600px' }}> */}
      <Modal show={showModal} onHide={handleClose} dialogClassName="tv-trailer">
        <Modal.Header className="p-2 pl-4" closeButton>
          Trailer
        </Modal.Header>
        <Modal.Body className="p-0 trailer-video">
          <iframe
            src={
              showModal ? `https://www.youtube.com/embed/${trailer.key}` : ''
            }
            frameBorder="0"
            className="trailer-video-iframe"
            title={trailer.key}
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer className="p-1">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </div> */}
    </Fragment>
  );
};

export default TVTrailerModal;
