import React from 'react';
import { Card } from 'react-bootstrap';
import noImage from '../../../images/download.png';

const DisplayCompleteCredits = ({ type, list }) => {
  return (
    <div>
      <div
        className="d-flex flex-row flex-wrap"
        style={{
          height: '79vh',
          overflowY: 'auto',
        }}
      >
        {list.map((person) => {
          return (
            <Card
              key={`person_{${type}_${person.id}`}
              className="col-6 col-md-3 d-flex flex-row mb-1 px-0 m-0"
            >
              <Card.Img
                src={
                  person.profile_path !== null
                    ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
                    : noImage
                }
                className="col-3 col-md-3 px-0"
              />
              <Card.Body className="p-0 pl-2">
                <Card.Text className="pt-1 mb-0">{person.name}</Card.Text>
                <Card.Text className="text-muted" style={{ fontSize: '0.8em' }}>
                  {type === 'cast' ? person.character : person.job}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayCompleteCredits;
