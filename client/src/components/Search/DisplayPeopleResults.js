import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const DisplayPeopleResults = ({ people, loadMoreResults }) => {
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
      <ul>
        {people.data.map((person, index) => {
          if (people.data.length === index + 1) {
            return (
              <li
                ref={lastSearchedResult}
                key={`movie_${person.id}`}
                className="py-5"
              >
                {person.name}
              </li>
            );
          } else {
            return (
              <li key={`searchedResult_${person.id}`} className="py-5">
                {person.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

DisplayPeopleResults.propTypes = {};

export default DisplayPeopleResults;
