import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import VideoModal from '../../Utility/VideoModal';

const TVVideos = ({ videos }) => {
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
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {videos.slice(0, 10).map((video, index) => {
        return (
          <Card
            key={`video_${index}`}
            className="col-md-5 px-0"
            style={{ minWidth: '200px', maxWidth: '400px' }}
          >
            <Card.Img
              loading="lazy"
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              style={{ width: '100%', cursor: 'pointer' }}
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

export default TVVideos;
