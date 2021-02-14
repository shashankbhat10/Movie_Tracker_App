import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchText, updateSearchFilter } from '../../actions/search';
import Spinner from '../Utility/Spinner';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';

const Search = ({
  searchText,
  location,
  searchedResults,
  loading,
  currentFilter,
  updateSearchFilter,
}) => {
  // const [resultType, updateResultType] = useState('movie');

  const updateFilter = (filterType) => {
    updateSearchFilter(filterType);
  };

  useEffect(() => {
    searchText(location.search);
  }, [searchText, location.search]);

  return (
    <div className="search-results">
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-md-flex flex-md-row py-3 px-3">
          <SearchFilter
            resultType={currentFilter}
            updateFilter={updateFilter}
            searchedResults={searchedResults}
          />
          <SearchResults
            // resultType={currentFilter}
            searchedResults={searchedResults}
            queryString={location.search}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchedResults: state.search,
  loading: state.search.loading,
  currentFilter: state.search.currentFilter,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { searchText, updateSearchFilter })
)(Search);
