import {
  LOADING_SEARCH,
  NEXT_PAGE_LOADED,
  SEARCH_FINISHED,
} from '../actions/types';

const initialState = {
  movies: {},
  tv: {},
  people: {},
  company: {},
  loading: true,
  page: 1,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        movies:
          payload.movies !== null || payload.movies.data.length > 0
            ? payload.movies
            : null,
        tv:
          payload.tv !== null || payload.tv.data.length > 0 ? payload.tv : null,
        people:
          payload.people !== null || payload.people.data.length > 0
            ? payload.people
            : null,
        company:
          payload.company !== null || payload.copmany.data.length > 0
            ? payload.company
            : null,
        loading: false,
        page: 1,
      };
    case LOADING_SEARCH:
      return { ...state, loading: true };
    case NEXT_PAGE_LOADED:
      console.log(payload.resultType);
      switch (payload.resultType) {
        case 'movie':
          const updatedMovies = state.movies.data.concat(
            payload.searchResult.results
          );
          return {
            ...state,
            movies: { ...state.movies, data: updatedMovies },
            loading: false,
            page: payload.pageNumber,
          };
        default:
          console.log(payload.resultType);
          return { ...state };
      }
    default:
      return { ...state };
  }
}
