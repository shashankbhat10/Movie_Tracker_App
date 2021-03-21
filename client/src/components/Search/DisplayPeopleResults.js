import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import noImage from '../../images/download.png';

const DisplayPeopleResults = ({ people, loadMoreResults }) => {
  console.log(people);
  const observer = useRef();
  const lastSearchedResult = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          people.currentPage < people.totalPages
        ) {
          console.log('PEOPLE INTERSECTION');
          const nextPage = people.currentPage + 1;
          loadMoreResults(nextPage);
        }
      });
      if (result) {
        observer.current.observe(result);
      }
      console.log('Reached End');
    },
    [people]
  );

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {people.data.map((person, index) => {
          return (
            <li
              key={`search_show_${person.id}`}
              ref={people.data.length === index + 1 ? lastSearchedResult : null}
            >
              <Card
                className="d-flex flex-row mb-3"
                style={{ maxHeight: '300px' }}
              >
                <Link
                  to={`/person/${person.id}`}
                  className="col-md-3 col-lg-2 px-0"
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Img
                    className="img-responsive"
                    src={
                      person.profile_path === null
                        ? noImage
                        : `https://image.tmdb.org/t/p/w342${person.profile_path}`
                    }
                  />
                </Link>
                <Card.Body className="col-md-10 pt-1">
                  <div className="d-flex flex-row">
                    <Link
                      to={`/tv/${person.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card.Title className="mb-2">{person.name}</Card.Title>
                    </Link>
                  </div>
                  <Card.Subtitle className="text-muted">
                    {person.known_for_department}
                  </Card.Subtitle>
                  {/* {console.log(person.known_for[0])} */}
                  {person.known_for[0] && (
                    <Card.Subtitle
                      className="mt-2 d-flex flex-row"
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    >
                      Known for:
                      <span
                        key={`search_people_known_for_${person.known_for[0].id}`}
                        className="pl-1"
                      >
                        <Link
                          to={
                            person.known_for[0].media_type === 'movie'
                              ? `/movie/${person.known_for[0].id}`
                              : `/tv/${person.known_for[0].id}`
                          }
                          style={{ textDecoration: 'none' }}
                        >
                          {person.known_for[0].media_type === 'movie'
                            ? `${person.known_for[0].title}`
                            : `${person.known_for[0].name}`}
                        </Link>
                      </span>
                    </Card.Subtitle>
                  )}
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DisplayPeopleResults.propTypes = {};

export default DisplayPeopleResults;
