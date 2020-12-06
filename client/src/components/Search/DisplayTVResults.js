import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

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
          if (tv.data.length === index + 1) {
            return (
              <li
                ref={lastSearchedResult}
                key={`movie_${tvsingle.id}`}
                className="py-5"
              >
                {tvsingle.name}
              </li>
            );
          } else {
            return (
              <li key={`searchedResult_${tvsingle.id}`} className="py-5">
                {tvsingle.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

DisplayTVResults.propTypes = {};

export default DisplayTVResults;
