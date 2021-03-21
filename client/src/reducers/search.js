import {
  LOADING_MORE,
  LOADING_SEARCH,
  NEXT_PAGE_LOADED,
  SEARCH_FINISHED,
  UPDATE_FILTER,
} from '../actions/types';

const initialState = {
  movie: {},
  tv: {},
  person: {},
  // company: {},
  loading: true,
  loading_more: false,
  currentFilter: 'movie',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        movie:
          payload.movies !== null || payload.movies.data.length > 0
            ? payload.movies
            : null,
        tv:
          payload.tv !== null || payload.tv.data.length > 0 ? payload.tv : null,
        person:
          payload.people !== null || payload.people.data.length > 0
            ? payload.people
            : null,
        // company:
        //   payload.company !== null || payload.copmany.data.length > 0
        //     ? payload.company
        //     : null,
        loading: false,
      };
    case LOADING_SEARCH:
      return { ...state, loading: true };
    case NEXT_PAGE_LOADED:
      let set = new Set();
      let result;
      switch (state.currentFilter) {
        case 'movie':
          result = [...state.movie.data];

          result.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
            }
          });
          payload.results.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
              result.push(item);
            }
          });
          return {
            ...state,
            movie: {
              ...state.movie,
              data: result,
              currentPage: payload.page,
            },
            loading_more: false,
          };
        case 'tv':
          result = [...state.tv.data];

          result.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
            }
          });
          payload.results.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
              result.push(item);
            }
          });
          return {
            ...state,
            tv: {
              ...state.tv,
              data: result,
              currentPage: payload.page,
            },
            loading_more: false,
          };
        case 'person':
          result = [...state.person.data];

          result.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
            }
          });
          payload.results.forEach((item) => {
            if (!set.has(item.id)) {
              set.add(item.id);
              result.push(item);
            }
          });
          return {
            ...state,
            person: {
              ...state.person,
              data: result,
              currentPage: payload.page,
            },
            loading_more: false,
          };
        // case 'company':
        //   result = [...state.company.data];

        //   result.forEach((item) => {
        //     if (!set.has(item.id)) {
        //       set.add(item.id);
        //     }
        //   });
        //   payload.results.forEach((item) => {
        //     if (!set.has(item.id)) {
        //       set.add(item.id);
        //       result.push(item);
        //     }
        //   });
        //   return {
        //     ...state,
        //     company: {
        //       ...state.company,
        //       data: result,
        //       currentPage: payload.page,
        //     },
        //     loading_more: false,
        //   };
        default:
          console.log(payload.resultType);
          return { ...state };
      }
    case LOADING_MORE:
      return { ...state, loading_more: true };
    case UPDATE_FILTER:
      console.log('reducer filter', payload);
      return { ...state, currentFilter: payload };
    default:
      return { ...state };
  }
}
