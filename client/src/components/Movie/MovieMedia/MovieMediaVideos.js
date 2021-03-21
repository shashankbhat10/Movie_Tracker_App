import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import VideoModal from '../../Utility/VideoModal';

const Videos = ({ videos }) => {
  const [showModal, setShowModal] = useState(false);
  const [videoId, updateVideoId] = useState(null);

  const handleModalClose = () => {
    updateVideoId('');
    setShowModal(false);
  };

  const handleModalOpen = (videoId) => {
    updateVideoId(videoId);
    setShowModal(true);
  };

  return (
    <div
      className="pt-1 mr-auto d-flex flex-row flex-nowrap"
      style={{ overflowX: 'auto' }}
    >
      {videos.videos.map((video, index) => {
        return (
          <Card
            key={`video_${index}`}
            className="col-md-5 img-responsive px-0"
            style={{ border: '0px', cursor: 'pointer', maxWidth: '400px' }}
          >
            <Card.Img
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              alt="poster"
              onClick={() => handleModalOpen(video.id)}
            />
            {showModal && videoId === video.id && (
              <VideoModal
                showModal={showModal}
                handleClose={handleModalClose}
                trailer={video}
              />
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Videos;
