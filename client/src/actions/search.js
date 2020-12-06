import axios from 'axios';

import {
  SEARCH_FINISHED,
  LOADING_SEARCH,
  NEXT_PAGE_LOADED,
  LOADING_MORE,
  UPDATE_FILTER,
} from './types';

export const searchText = (query) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_SEARCH,
    });
    const params = new URLSearchParams(query);
    const searchString = params.get('query');
    const searchResults = await axios.get(
      `/api/search/searchAll/${searchString}`
    );

    const movieData = searchResults.data.movies;
    const tvData = searchResults.data.tv;
    const peopleData = searchResults.data.people;
    const companyData = searchResults.data.company;

    const payload = {
      movies: movieData,
      tv: tvData,
      people: peopleData,
      company: companyData,
    };
    // console.log(movieData);

    dispatch({
      type: SEARCH_FINISHED,
      payload: payload,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadNextPage = (pageNumber, resultType, queryString) => async (
  dispatch
) => {
  dispatch({
    type: LOADING_MORE,
  });
  console.log('Action before query: ' + pageNumber);
  const params = new URLSearchParams(queryString);
  const searchString = params.get('query');
  const body = {
    resultType: resultType,
    pageNumber: pageNumber,
    query: searchString,
  };

  try {
    let searchResults = await axios.post(`/api/search/searchSingle`, body);
    console.log(searchResults.data);
    searchResults.data.resultType = resultType;
    console.log('Action after query: ' + searchResults.data.page);
    dispatch({
      type: NEXT_PAGE_LOADED,
      payload: searchResults.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSearchFilter = (filterType) => async (dispatch) => {
  dispatch({
    type: UPDATE_FILTER,
    payload: filterType,
  });
};
