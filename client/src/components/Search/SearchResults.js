import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadNextPage } from '../../actions/search';
import DisplayPeopleResults from './DisplayPeopleResults';
import DisplayCompanyResults from './DisplayCompanyResults';
import PropTypes from 'prop-types';
import DisplayContentResults from './DisplayContentResults';

const SearchResults = ({
  searchedResults,
  loadNextPage,
  queryString,
  currentFilter,
}) => {
  const loadMoreResults = (pageNumber) => {
    console.log('SEARCH RESULTS : ' + pageNumber);
    loadNextPage(pageNumber, currentFilter, queryString);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentFilter]);

  return (
    <div className="col-md-9 px-0">
      {currentFilter === 'movie' && (
        <DisplayContentResults
          type={currentFilter}
          content={searchedResults[currentFilter]}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'tv' && (
        <DisplayContentResults
          type={currentFilter}
          content={searchedResults[currentFilter]}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'person' && (
        <DisplayPeopleResults
          people={searchedResults.person}
          loadMoreResults={loadMoreResults}
        />
      )}
      {currentFilter === 'company' && (
        <DisplayCompanyResults
          company={searchedResults.company}
          loadMoreResults={loadMoreResults}
        />
      )}
    </div>
  );
};

SearchResults.propTypes = {};

const mapStateToProps = (state) => ({
  searchedResults: state.search,
  currentFilter: state.search.currentFilter,
});

export default connect(mapStateToProps, { loadNextPage })(SearchResults);
