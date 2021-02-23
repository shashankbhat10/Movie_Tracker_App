import React from 'react';
import { Card } from 'react-bootstrap';

const TVVideos = ({ videos }) => {
  return (
    <div className="d-flex flex-row flex-nowrap" style={{ overflowX: 'auto' }}>
      {videos.map((video, index) => {
        return (
          <Card
            key={`video_${index}`}
            className="col-md-3 px-0"
            style={{ minWidth: '200px', maxWidth: '220px' }}
          >
            <Card.Img
              src={`https://image.tmdb.org/t/p/w342${[video.file_path]}`}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default TVVideos;
