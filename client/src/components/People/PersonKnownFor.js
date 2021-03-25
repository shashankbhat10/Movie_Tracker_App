import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import noImage from '../../images/download.png';

const PersonKnownFor = ({ credits }) => {
  return (
    <div
      className="d-flex flex-row flex-nowrap mt-1"
      style={{ overflowX: 'auto' }}
    >
      {credits.cast
        .concat(credits.crew)
        .filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj.id === item.id)
        )
        .sort((a, b) => {
          return b.popularity - a.popularity;
        })
        .filter((item) => item.character !== 'Herself')
        .slice(0, 10)
        .map((item) => {
          return (
            <Card
              style={{
                maxWidth: '150px',
                border: '#30363d 2px solid',
                backgroundColor: '#16161d',
              }}
              className="col-3 px-0"
              key={`person_credits_${item.movie_type}_${item.id}`}
            >
              <Link
                to={
                  (item.media_type === 'movie' ? '/movie/' : '/tv/') + item.id
                }
                style={{ textDecoration: 'none', color: '#c3d1d9' }}
              >
                <Card.Img
                  src={
                    item.poster_path === null
                      ? noImage
                      : `https://image.tmdb.org/t/p/w342${item.poster_path}`
                  }
                />
                <Card.Body className="px-1 py-1">
                  <Card.Text style={{ fontSize: '0.9em' }}>
                    {item.media_type === 'movie' ? item.title : item.name}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
    </div>
  );
};

export default PersonKnownFor;
