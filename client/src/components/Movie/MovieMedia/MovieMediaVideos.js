import React from 'react';
import { Card } from 'react-bootstrap';

const Videos = ({ videos }) => {
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
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Videos;
