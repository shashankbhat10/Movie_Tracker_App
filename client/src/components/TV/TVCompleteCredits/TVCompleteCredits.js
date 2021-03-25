import React, { Fragment, useEffect, useState } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTVCredits } from '../../../actions/tv';
import DisplayCompleteCredits from './DisplayCompleteCredits';
import noImage from '../../../images/download.png';

const TVCompleteCredits = ({ loading, credits, getTVCredits, match }) => {
  useEffect(() => {
    if (Object.keys(credits).length === 0) {
      getTVCredits(match.params.id);
    }
  }, [match.params.id]);

  const [key, updateKey] = useState('cast');

  const handleTabChange = (selectedKey) => {
    console.log(selectedKey);
    updateKey(selectedKey);
  };

  return (
    <Fragment>
      {!loading && (
        <div
          className="px-2"
          style={{
            overflow: 'hidden',
            flexGrow: '1',
            position: 'relative',
            backgroundColor: '#090c12',
            height: '93vh',
          }}
        >
          <h5 className="mt-2 pl-3" style={{ color: '#c3d1d9' }}>
            Cast and Crew
          </h5>
          <Tabs
            defaultActiveKey="poster"
            activeKey={key}
            onSelect={(k) => {
              handleTabChange(k);
            }}
            unmountOnExit
          >
            <Tab eventKey="cast" title={`Cast (${credits.cast.length})`}>
              <DisplayCompleteCredits type={key} list={credits.cast} />
            </Tab>
            <Tab eventKey="crew" title={`Crew (${credits.crew.length})`}>
              <DisplayCompleteCredits type={key} list={credits.crew} />
            </Tab>
          </Tabs>
        </div>
      )}
      {/* {!loading && (
        <div>
          <h5>Cast</h5>
          <ul className="d-flex flex-row flex-wrap">
            {credits['cast'].map((person) => {
              return (
                <li
                  key={`person_${person.id}`}
                  className="col-md-3 d-flex flex-row px-0"
                >
                  <Card className="d-flex flex-row my-1">
                    <Card.Img
                      src={
                        person.profile_path !== null
                          ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
                          : noImage
                      }
                      className="col-md-3 px-0"
                    />
                    <Card.Body className="p-0 pl-2">
                      <Card.Text className="pt-1 mb-0">{person.name}</Card.Text>
                      <Card.Text
                        className="text-muted"
                        style={{ fontSize: '0.8em' }}
                      >
                        {person.character}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              );
            })}
          </ul>
          <h5>Crew</h5>
          <ul className="d-flex flex-row flex-wrap">
            {credits['crew'].map((person) => {
              return (
                <li
                  key={`person_${person.id}`}
                  className="col-md-3 d-flex flex-row px-0"
                >
                  <Card className="d-flex flex-row my-1">
                    <Card.Img
                      src={
                        person.profile_path !== null
                          ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
                          : noImage
                      }
                      className="col-md-3 px-0"
                    />
                    <Card.Body className="p-0 pl-2">
                      <Card.Text className="pt-1 mb-0">{person.name}</Card.Text>
                      <Card.Text
                        className="text-muted"
                        style={{ fontSize: '0.8em' }}
                      >
                        {person.character}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      )} */}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  credits: state.tv.credits,
  loading: state.tv.loading,
});

export default connect(mapStateToProps, { getTVCredits })(TVCompleteCredits);
