import React, { Fragment, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Lists from './Lists/Lists';
import Ratings from './Ratings';
import Sidebar from './Sidebar';
import Watched from './Watched';
import Spinner from '../Utility/Spinner';
import {
  getStatsContent,
  getCustomListsContent,
} from '../../actions/dashboard';
import Stats from './Stats/Stats';

const Dashboard = ({
  profile,
  getStatsContent,
  getCustomListsContent,
  loading,
}) => {
  const [section, updateSection] = useState('watched');

  useEffect(() => {
    getStatsContent();
    getCustomListsContent();
  }, []);

  return (
    <Fragment>
      {profile.loading && <Spinner />}
      {!profile.loading && (
        <Container
          fluid
          className="mx-0 w-100 px-0"
          style={{ backgroundColor: '#090c12' }}
        >
          <Row className="mx-0 px-0">
            <Col
              md={3}
              className="px-0"
              style={{ borderRight: '#30363d 2px solid' }}
            >
              <Sidebar name={profile.name} updateSection={updateSection} />
            </Col>
            <Col md={9} className="ml-auto pt-0 px-0 mx-0 w-100">
              {/* <Col md={9} className="ml-auto" style={{ overflowY: 'auto' }}> */}
              {/* <div> */}
              {/* <ul>
                  {[...Array(100).keys()].map((item, index) => {
                    return (
                      <li key={index} color="#c3d1d9">
                        {item}
                      </li>
                    );
                  })}
                </ul> */}
              {section === 'watched' && <Watched />}
              {section === 'lists' && <Lists />}
              {section === 'ratings' && <Ratings />}
              {section === 'stats' && <Stats />}
              {/* <Lists /> */}
              {/* </div> */}
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  section: state.dashboard.section,
});

export default connect(mapStateToProps, {
  getStatsContent,
  getCustomListsContent,
})(Dashboard);
