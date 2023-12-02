import * as actionTypes from "../actions/types";

const initialState = {
  movies: [],
  tv: [],
  genres: {},
  discover: [],
  providers: {},
  people: {},
  dashboard: [],
  movieLoading: true,
  tvLoading: true,
  loading: true,
  genresLoading: true,
  discoverLoading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DASHBOARD_TOP_CONTENT_LOADED:
      return {
        ...state,
        movies: payload.movie,
        tv: payload.tv,
        dashboard: payload.dashboard,
        // loading: false,
      };
    case actionTypes.GENRES_LOADED:
      return {
        ...state,
        genres: {
          ...state.genres,
          movie: {
            ...state.genres.movie,
            total: payload.movie,
            rendered: [],
            remaining: payload.movie,
          },
          tv: {
            ...state.genres.tv,
            total: payload.tv,
            rendered: [],
            remaining: payload.tv,
          },
          genresLoading: false,
        },
      };
    case actionTypes.RANDOM_GENRES_SELECTED:
      let renderedMovieCopy = state.genres.movie.rendered === undefined ? [] : [...state.genres.movie.rendered];
      renderedMovieCopy.push(...payload.movie);

      let remainingMovieCopy = [...state.genres.movie.remaining].filter((genre) => {
        return !payload.movie.find((movieGenre) => {
          return movieGenre.id === genre.id;
        });
      });

      let renderedTVCopy = state.genres.tv.rendered === undefined ? [] : [...state.genres.tv.rendered];
      renderedTVCopy.push(...payload.tv);

      let remainingTVCopy = [...state.genres.tv.remaining].filter((genre) => {
        return !payload.tv.find((tvGenre) => {
          return tvGenre.id === genre.id;
        });
      });

      return {
        ...state,
        genres: {
          ...state.genres,
          movie: {
            ...state.genres.movie,
            rendered: renderedMovieCopy,
            remaining: remainingMovieCopy,
          },
          tv: {
            ...state.genres.tv,
            rendered: renderedTVCopy,
            remaining: remainingTVCopy,
          },
        },
        genresLoading: false,
      };
    case actionTypes.PARTIAL_GENRE_MOVIES_LOADED:
      // const newDiscoverList = [...state.discover];
      let newList = [...state.dashboard];
      Array.prototype.push.apply(newList, payload);
      // Array.prototype.push.apply(newDiscoverList, payload);
      return {
        ...state,
        // discover: newDiscoverList,
        discoverLoading: false,
        dashboard: newList,
        // loading: false,
      };
    case actionTypes.CLEAR_DASHBOARD:
      return { ...state, movies: {}, tv: {}, discover: [], genre: {} };
    case actionTypes.DASHBOARD_TOP_CONTENT_LOADED_FIN:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
}
