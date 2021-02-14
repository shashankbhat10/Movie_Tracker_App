import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { loadNextPage } from '../../actions/search';
import DisplayMovieResults from './DisplayMovieResults';
import DisplayTVResults from './DisplayTVResults';
import DisplayPeopleResults from './DisplayPeopleResults';
import DisplayCompanyResults from './DisplayCompanyResults';
import PropTypes from 'prop-types';

const SearchResults = ({
  resultType,
  searchedResults,
  loadNextPage,
  queryString,
  currentFilter,
}) => {
  const [resultData, updateResultData] = useState(searchedResults.movies);
  // const [filter, updateFilter] = useState(resultType);

  // useEffect(() => {
  //   switch (resultType) {
  //     case 'movie':
  //       updateFilter('movie');
  //       break;
  //     case 'tv':
  //       updateFilter('tv');
  //       break;
  //     case 'people':
  //       updateFilter('people');
  //       break;
  //     case 'company':
  //       updateFilter('company');
  //       break;
  //     default:
  //       updateFilter('movie');
  //   }
  // }, [resultType]);

  // useEffect(() => {
  //   console.log('AS');
  // }, [searchedResults]);

  // const observer = useRef();
  // const lastSearchedResult = useCallback((result) => {
  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       console.log(resultData);
  //       loadNextPage(resultData.currentPage + 1, resultType, queryString);
  //     }
  //   });
  //   if (result) {
  //     observer.current.observe(result);
  //   }
  //   console.log('Reached End');
  // }, []);

  const loadMoreResults = (pageNumber) => {
    console.log('SEARCH RESULTS : ' + pageNumber);
    loadNextPage(pageNumber, currentFilter, queryString);
  };

  return (
    <div className="search-result-container">
      {/* <ul> */}
      {console.log('ResultType: ' + currentFilter)}
      {currentFilter === 'movie' && (
        <DisplayMovieResults
          // movies={searchedResults.movies}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'tv' && (
        <DisplayTVResults
          tv={searchedResults.tv}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'person' && (
        <DisplayPeopleResults
          people={searchedResults.people}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'company' && (
        <DisplayCompanyResults
          company={searchedResults.company}
          loadMoreResults={loadMoreResults}
        />
      )}

      {/* {resultData.data.map((result, index) => {
          if (resultData.data.length === index + 1) {
            return (
              <li ref={lastSearchedResult} key={`searchedResult_${result.id}`}>
                {result[title]}
              </li>
            );
          } else {
            return (
              <li key={`searchedResult_${result.id}`} className="py-5">
                {result[title]}
              </li>
            );
          }
        })} */}
      {/* </ul> */}
      <div className="mt-auto">
        {/* {searchedResults.page < resultData.totalPages && (
          // <button
          //   onClick={() =>
          //     loadNextPage(searchedResults.page + 1, resultType, queryString)
          //   }
          // >
          //   Load More
          // </button>
        )} */}
      </div>
    </div>
  );
};

SearchResults.propTypes = {};

const mapStateToProps = (state) => ({
  searchedResults: state.search,
  currentFilter: state.search.currentFilter,
});

export default connect(mapStateToProps, { loadNextPage })(SearchResults);
