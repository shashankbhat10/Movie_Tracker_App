import React from 'react';

const SearchFilter = ({ resultType, updateResultType, searchedResults }) => {
  return (
    <div className="search-filter">
      <span className="align-self-center py-2">
        <strong>Search Results</strong>
      </span>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateResultType('movie')}
      >
        <span>Movie</span>
        <span className="filter-count ml-auto">
          {searchedResults.movies.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateResultType('tv')}
      >
        <span>TV</span>
        <span className="filter-count ml-auto">
          {searchedResults.tv.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateResultType('people')}
      >
        <span>People</span>
        <span className="filter-count ml-auto">
          {searchedResults.people.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateResultType('company')}
      >
        <span>Company</span>
        <span className="filter-count ml-auto">
          {searchedResults.company.totalResults}
        </span>
      </div>
      <span>{resultType}</span>
    </div>
  );
};

export default SearchFilter;
