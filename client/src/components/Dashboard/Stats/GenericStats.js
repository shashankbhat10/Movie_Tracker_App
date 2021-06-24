import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';

const GenericStats = ({ watchedCount, ratingsCount }) => {
  return (
    <div>
      {['movie', 'tv'].map((item, index) => {
        return (
          <Container fluid className="mb-4" key={`${item}_general_stats`}>
            <Row
              style={{ width: '100%', color: '#c3d1d9' }}
              className="mx-0 pl-3"
            >
              <h4
                style={{ borderBottom: '2px solid red' }}
                className="px-2 pb-1"
              >
                {item === 'movie' ? 'Movies' : 'TV Shows'}
              </h4>
            </Row>
            <Row style={{ color: '#c3d1d9' }} className="my-2">
              <Col className="text-center">
                <Container fluid>
                  <Row className="mx-0">
                    <CountUp end={watchedCount[item]} duration={3}>
                      {({ countUpRef }) => (
                        <div
                          style={{
                            width: '4rem',
                            height: '4rem',
                            border: '5px solid green',
                            borderRadius: '50%',
                            lineHeight: '3.1rem',
                          }}
                          className="mx-auto align-item-center"
                        >
                          <strong>
                            <span ref={countUpRef} />
                          </strong>
                        </div>
                      )}
                    </CountUp>
                  </Row>
                  <Row className="mx-0 pt-2">
                    <span className="mx-auto">Watched</span>
                  </Row>
                </Container>
              </Col>
              <Col className="text-center">
                <Container fluid>
                  <Row className="mx-0">
                    <CountUp end={ratingsCount[item]} duration={1}>
                      {({ countUpRef }) => (
                        <div
                          style={{
                            width: '4rem',
                            height: '4rem',
                            border: '5px solid orange',
                            borderRadius: '50%',
                            lineHeight: '3.1rem',
                          }}
                          className="mx-auto align-item-center"
                        >
                          <strong>
                            <span ref={countUpRef} />
                          </strong>
                        </div>
                      )}
                    </CountUp>
                  </Row>
                  <Row className="mx-0 pt-2">
                    <span className="mx-auto">Ratings</span>
                  </Row>
                </Container>
              </Col>
              <Col className="text-center">
                <Container fluid>
                  <Row className="mx-0">
                    <CountUp end={watchedCount[item]} duration={1}>
                      {({ countUpRef }) => (
                        <div
                          style={{
                            width: '4rem',
                            height: '4rem',
                            border: '5px solid purple',
                            borderRadius: '50%',
                            lineHeight: '3.1rem',
                          }}
                          className="mx-auto align-item-center"
                        >
                          <strong>
                            <span ref={countUpRef} />
                          </strong>
                        </div>
                      )}
                    </CountUp>
                  </Row>
                  <Row className="mx-0 pt-2">
                    <span className="mx-auto">Reviews</span>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
};

export default GenericStats;
