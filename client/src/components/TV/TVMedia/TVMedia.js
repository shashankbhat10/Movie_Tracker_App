import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import TVPosters from './TVPosters';
import TVBackdrops from './TVBackdrops';
import TVVideos from './TVVideos';

const TVMedia = ({ media }) => {
  const [key, setKey] = useState('poster');
  const [title, setTitle] = useState('Posters');

  const handleTabChange = (selectedKey) => {
    setKey(selectedKey);
    switch (selectedKey) {
      case 'poster':
        setTitle('Posters');
        break;
      case 'backdrop':
        setTitle('Backdrops');
        break;
      case 'video':
        setTitle('Videos');
        break;
      default:
        setTitle('Posters');
        break;
    }
  };

  return (
    <div className="px-4 mb-4">
      <div className="px-3 d-flex justify-content-between">
        <h5>Media</h5>
        <span>
          <Link to={`/${key}`}>View all {title}</Link>
        </span>
      </div>
      <div>
        <Tabs
          defaultActiveKey="poster"
          activeKey={key}
          onSelect={(k) => {
            handleTabChange(k);
          }}
        >
          {media.posters !== null && (
            <Tab eventKey="poster" title={`Posters (${media.posters.count})`}>
              <TVPosters posters={media.posters.images} />
            </Tab>
          )}
          <Tab
            eventKey="backdrop"
            title={`Backdrops (${media.backdrops.count})`}
          >
            <TVBackdrops backdrops={media.backdrops.images} />
          </Tab>
          <Tab eventKey="video" title={`Videos (${media.videos.count})`}>
            <TVVideos videos={media.videos.videos} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TVMedia;
