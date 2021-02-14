import React from 'react';

const SearchFilter = ({ resultType, updateFilter, searchedResults }) => {
  return (
    <div className="search-filter">
      <span className="align-self-center py-3">
        <strong>Search Results</strong>
      </span>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateFilter('movie')}
      >
        <span>Movie</span>
        <span className="filter-count ml-auto">
          {searchedResults.movies.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => {
          updateFilter('tv');
        }}
      >
        <span>TV</span>
        <span className="filter-count ml-auto">
          {searchedResults.tv.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateFilter('person')}
      >
        <span>People</span>
        <span className="filter-count ml-auto">
          {searchedResults.people.totalResults}
        </span>
      </div>
      <div
        className="filter-options d-flex flex-row px-3 py-2 mx-auto"
        onClick={() => updateFilter('company')}
      >
        <span>Company</span>
        <div className="filter-count ml-auto">
          {searchedResults.company.totalResults}
        </div>
      </div>
      {console.log(resultType)}
    </div>
  );
};

export default SearchFilter;
