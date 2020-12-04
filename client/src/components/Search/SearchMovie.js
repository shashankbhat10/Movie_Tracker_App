import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchText } from '../../actions/search';
import Spinner from '../Utility/Spinner';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';

const Search = ({ searchText, location, searchedResults, loading }) => {
  const [resultType, updateResultType] = useState('movie');

  useEffect(() => {
    searchText(location.search);
  }, [searchText, location.search]);

  return (
    <div className="search-results">
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-md-flex py-3 px-3">
          <SearchFilter
            resultType={resultType}
            updateResultType={updateResultType}
            searchedResults={searchedResults}
          />
          <SearchResults
            resultType={resultType}
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
});

export default compose(
  withRouter,
  connect(mapStateToProps, { searchText })
)(Search);
