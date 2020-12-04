import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadNextPage } from '../../actions/search';
import PropTypes from 'prop-types';

const SearchResults = ({
  resultType,
  searchedResults,
  loadNextPage,
  queryString,
}) => {
  const [resultData, updateResultData] = useState(searchedResults.movies);
  const [title, updateTitle] = useState('title');

  useEffect(() => {
    switch (resultType) {
      case 'movie':
        updateResultData(searchedResults.movies);
        updateTitle('title');
        break;
      case 'tv':
        updateResultData(searchedResults.tv);
        updateTitle('name');
        break;
      case 'people':
        updateResultData(searchedResults.people);
        updateTitle('name');
        break;
      case 'company':
        updateResultData(searchedResults.company);
        updateTitle('name');
        break;
      default:
        updateResultData(searchedResults.movies);
    }
  }, [resultType, searchedResults]);

  return (
    <div>
      <ul>
        {console.log(resultData.data)}
        {resultData.data.map((result) => {
          return <li key={`searchedResult_${result.id}`}>{result[title]}</li>;
        })}
      </ul>
      <div className="mt-auto">
        {searchedResults.page < resultData.totalPages && (
          <button
            onClick={() =>
              loadNextPage(searchedResults.page + 1, resultType, queryString)
            }
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

SearchResults.propTypes = {};

export default connect(null, { loadNextPage })(SearchResults);
