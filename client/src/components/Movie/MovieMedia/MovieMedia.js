import React from 'react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import BackDrops from './MovieMediaBackDrops';
import Posters from './MovieMediaPosters';
import Videos from './MovieMediaVideos';

const MovieMedia = ({ posters, backdrops }) => {
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
        setTitle('Titles');
        break;
      default:
        setTitle('Posters');
        break;
    }
  };

  return (
    <Fragment>
      <div className="mt-5 mx-auto" style={{ width: '95%' }}>
        <div className="px-5 d-flex justify-content-between">
          <h5>Media</h5>
          <span>
            <Link to={`/${key}`}>View all {title}</Link>
          </span>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="px-3">
          <Tabs
            defaultActiveKey="poster"
            activeKey={key}
            onSelect={(k) => {
              handleTabChange(k);
            }}
          >
            {posters !== null && (
              <Tab eventKey="poster" title={`Posters (${posters.count})`}>
                <Posters posters={posters} />
              </Tab>
            )}
            <Tab eventKey="backdrop" title={`Backdrops (${backdrops.count})`}>
              <BackDrops backdrops={backdrops} />
            </Tab>
            <Tab eventKey="video" title="Videos">
              <Videos image={posters} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieMedia;
