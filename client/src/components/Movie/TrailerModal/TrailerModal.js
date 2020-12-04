import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

const TrailerModal = ({ name, trailerKey }) => {
  const [showModal, setModalShow] = useState(false);

  return (
    <Fragment>
      <button onClick={() => setModalShow(!showModal)}>Show Trailer</button>
      <Modal
        showModal={showModal}
        setModalShow={setModalShow}
        name={name}
        trailerKey={trailerKey}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loadTrailer: state.movie.loadTrailer,
});

export default connect(mapStateToProps, {})(TrailerModal);

// <div
//   className="trailer-modal my-auto mx-auto"
//   style={{
//     border: '1px solid black',
//     transform: showModal ? 'translateY(0)' : 'translateY(-100vh)',
//     opacity: showModal ? '1' : '0',
//   }}
// >
//   <div className="trailer-title d-flex flex-row justify-content-between py-2">
//     <span className="pl-5">{name}</span>
//     <div className="trailer-close" onClick={() => setModalShow(false)}>
//       <span className="px-1 py-1">
//         <FontAwesomeIcon icon={faTimes} />
//       </span>
//     </div>
//   </div>
//   <div className="trailer-video">
//     <iframe
//       src={`https://www.youtube.com/embed/${trailerKey}`}
//       frameborder="0"
//       className="trailer-video-iframe"
//       title={trailerKey}
//       allowFullScreen
//     ></iframe>
//   </div>
// </div>

// <Modal
//           show={showModal}
//           onHide={() => setModalShow(false)}
//           className="trailer-modal"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>{name}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body className="trailer-video">
//             <iframe
//               src={`https://www.youtube.com/embed/${trailerKey}`}
//               frameborder="0"
//               className="trailer-video-iframe"
//               title={trailerKey}
//               allowFullScreen
//             ></iframe>
//           </Modal.Body>
//         </Modal>
