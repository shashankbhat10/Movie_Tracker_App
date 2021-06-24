import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import profile from '../../images/stock_profile.jpg';

const Sidebar = ({ name, updateSection }) => {
  const [sidebarOptions, updateOptions] = useState([]);

  useEffect(() => {
    const list = ['Profile', 'Watched', 'Lists', 'Ratings', 'Reviews', 'Stats'];
    updateOptions(list);
  }, []);
  return (
    <Fragment>
      <Container
        className="mx-0 my-auto px-4"
        style={{
          position: 'sticky',
          top: '7vh',
          height: '93vh',
          backgroundColor: '#16161d',
          color: '#c3d1d9',
        }}
      >
        <Row
          className="d-flex text-center align-items-center justify-content-center mx-0 pb-4 pt-3 mb-5"
          style={{ height: '40%', width: '100%' }}
        >
          <Image
            src={profile}
            className="mb-2"
            style={{
              width: 'auto',
              height: 'auto',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            roundedCircle
          />
          <h2>{name}</h2>
        </Row>
        {/* {[...Array(5).keys()].map((item, index) => { */}
        {sidebarOptions.map((item, index) => {
          return (
            // <div key={`sidebar_${item}`}>
            <Row
              className="justify-content-center mx-0 d-md-flex flex-md-column"
              key={`sidebar_${item}`}
            >
              <span
                className="text-center"
                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => updateSection(item.toLowerCase())}
              >
                {item}
              </span>
              {index !== 5 && (
                <hr style={{ width: '95%' }} className="my-3" color="#c3d1d9" />
              )}
            </Row>

            // </div>
          );
        })}
      </Container>
    </Fragment>
  );
};

export default Sidebar;
