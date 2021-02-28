import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../images/download.png';

const DisplayTVResults = ({ tv, loadMoreResults }) => {
  const observer = useRef();
  const lastSearchedResult = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && tv.currentPage < tv.totalPages) {
          console.log('TV INTERSECTION');
          const nextPage = tv.currentPage + 1;
          loadMoreResults(nextPage);
        }
      });
      if (result) {
        observer.current.observe(result);
      }
      console.log('Reached End');
    },
    [tv]
  );

  return (
    <div>
      <ul>
        {tv.data.map((tvsingle, index) => {
          return (
            <li
              key={`search_show_${tvsingle.id}`}
              ref={tv.data.length === index + 1 ? lastSearchedResult : null}
            >
              <Card
                className="d-flex flex-row mb-3"
                style={{ maxHeight: '300px' }}
              >
                <Link
                  to={`/tv/${tvsingle.id}`}
                  className="col-md-3 col-lg-2 px-0"
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Img
                    className="img-responsive"
                    // style={{ maxWidth: '150px' }}
                    src={
                      tvsingle.poster_path === null
                        ? noImage
                        : `https://image.tmdb.org/t/p/w342${tvsingle.poster_path}`
                    }
                  />
                </Link>
                <Card.Body className="col-md-10 pt-1">
                  <div className="d-flex flex-row">
                    <Link
                      to={`/tv/${tvsingle.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card.Title className="mb-2">{tvsingle.name}</Card.Title>
                    </Link>
                    {tvsingle.vote_average !== 0 && (
                      <span className="pl-3">
                        {tvsingle.vote_average}
                        <FontAwesomeIcon icon={faStar} className="pl-1" />
                      </span>
                    )}
                  </div>
                  <Card.Subtitle className="text-muted mb-4">
                    {tvsingle.first_air_date}
                  </Card.Subtitle>
                  <Card.Text>
                    {tvsingle.overview.substring(0, 200)} ...
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DisplayTVResults.propTypes = {};

export default DisplayTVResults;
