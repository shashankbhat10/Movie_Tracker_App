import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PersonCredits from './PersonCredits';
import PersonKnownFor from './PersonKnownFor';

const PersonDetails = ({ details, credits }) => {
  return (
    <div>
      <Card style={{ boxShadow: '5px 5px 20px gray' }}>
        <Card.Body>
          <Card.Title className="mb-5">
            <h3>
              <strong>{details.name}</strong>
            </h3>
          </Card.Title>
          <Card.Subtitle>Biography</Card.Subtitle>
          <Card.Text className="pt-2" style={{ fontSize: '0.9em' }}>
            {details.biography.length === 0 && <span>No Biography found!</span>}
            {details.biography.length !== 0 &&
              details.biography.split('\\n').map((text, index) => {
                return (
                  <span key={`person_bio_${index}`}>
                    {text}
                    <br></br>
                  </span>
                );
              })}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-3">
        <h5 className="pl-2">Known for</h5>
        <PersonKnownFor credits={credits} />
      </div>
      <div>
        <PersonCredits credits={credits} />
      </div>
    </div>
  );
};

export default PersonDetails;
