import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';

const VideoModal = ({ showModal, handleClose, trailer }) => {
  return (
    <Fragment>
      {console.log('showModal', showModal)}
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
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default VideoModal;
