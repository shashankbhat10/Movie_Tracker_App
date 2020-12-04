import axios from 'axios';

import { SEARCH_FINISHED, LOADING_SEARCH, NEXT_PAGE_LOADED } from './types';

export const searchText = (query) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_SEARCH,
    });
    console.log('HERE');
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
    type: LOADING_SEARCH,
    payload: pageNumber,
  });
  console.log(pageNumber);
  const params = new URLSearchParams(queryString);
  const searchString = params.get('query');
  const body = {
    resultType: resultType,
    pageNumber: pageNumber,
    query: searchString,
  };
  try {
    let searchResults = await axios.post(`/api/search/searchSingle`, body);
    searchResults.data.resultType = resultType;
    searchResults.data.pageNumber = pageNumber;
    dispatch({
      type: NEXT_PAGE_LOADED,
      payload: searchResults.data,
    });
    console.log('Action: ' + searchResults.data.pageNumber);
  } catch (err) {
    console.log(err);
  }
};
