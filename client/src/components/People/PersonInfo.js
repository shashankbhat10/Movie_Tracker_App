import React from 'react';
import { Card } from 'react-bootstrap';

const PersonInfo = ({ details }) => {
  return (
    <div>
      <Card
        style={{
          maxWidth: '350px',
          boxShadow: '5px 5px 20px gray',
          border: '0px',
        }}
        className="pr-0 mx-0 d-flex flex-row d-md-block"
      >
        <Card.Img
          className="col-5 col-md-12 px-0"
          src={`https://image.tmdb.org/t/p/h632${details.profile_path}`}
        />
        <Card.Body>
          <Card.Subtitle className="text-muted">Personal Info</Card.Subtitle>
          <Card.Text>Born: {details.birthday}</Card.Text>
          {details.deathday !== null && (
            <Card.Text>Died: {details.deathday}</Card.Text>
          )}
          <Card.Text>Known for: {details.known_for_department}</Card.Text>
          <div className="d-flex flex-column">
            <span>Birthplace</span>
            <span>{details.place_of_birth}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PersonInfo;

{
  /* <div className="social-links pt-1">
  {links.homepage !== null && (
    <span className="px-2">
      <a href={`${links.homepage}`} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGlobeAsia} size="2x" />
      </a>
    </span>
  )}
  {links.social.facebook !== null && (
    <span className="px-2">
      <a
        href={`https://www.facebook.com/${links.social.facebook}`}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
    </span>
  )}
  {links.social.instagram !== null && (
    <span className="px-2">
      <a
        href={`https://www.instagram.com/${links.social.instagram}`}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </span>
  )}
  {links.social.twitter !== null && (
    <span className="px-2">
      <a
        href={`https://www.twitter.com/${links.social.twitter}`}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
    </span>
  )}
</div>; */
}
