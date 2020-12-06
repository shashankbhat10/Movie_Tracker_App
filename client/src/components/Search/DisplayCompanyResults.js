import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const DisplayCompanyResults = ({ company, loadMoreResults }) => {
  const observer = useRef();
  const lastSearchedResult = useCallback(
    (result) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          company.currentPage < company.totalPages
        ) {
          console.log('COMPANY INTERSECTION');
          const nextPage = company.currentPage + 1;
          loadMoreResults(nextPage);
        }
      });
      if (result) {
        observer.current.observe(result);
      }
      console.log('Reached End');
    },
    [company]
  );

  return (
    <div>
      <ul>
        {company.data.map((item, index) => {
          if (company.data.length === index + 1) {
            return (
              <li
                ref={lastSearchedResult}
                key={`movie_${item.id}`}
                className="py-5"
              >
                {item.name}
              </li>
            );
          } else {
            return (
              <li key={`searchedResult_${item.id}`} className="py-5">
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

DisplayCompanyResults.propTypes = {};

export default DisplayCompanyResults;
