import * as actionTypes from '../actions/types';

const initialState = {
  movies: {},
  tv: {},
  genres: {},
  discover: [],
  providers: {},
  people: {},
  movieLoading: true,
  tvLoading: true,
  genresLoading: true,
  discoverLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DASHBOARD_MOVIES_LOADED:
      return {
        ...state,
        movies: {
          ...state.movies,
          popular: payload.popular,
          trending: payload.trending,
        },
        movieLoading: false,
      };
    case actionTypes.DASHBOARD_TV_LOADED:
      return {
        ...state,
        tv: {
          ...state.tv,
          popular: payload.popular,
          trending: payload.trending,
        },
        tvLoading: false,
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
      let renderedMovieCopy =
        state.genres.movie.rendered === undefined
          ? []
          : [...state.genres.movie.rendered];
      renderedMovieCopy.push(...payload.movie);

      let remainingMovieCopy = [...state.genres.movie.remaining].filter(
        (genre) => {
          return !payload.movie.find((movieGenre) => {
            return movieGenre.id === genre.id;
          });
        }
      );

      let renderedTVCopy =
        state.genres.tv.rendered === undefined
          ? []
          : [...state.genres.tv.rendered];
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
      const newDiscoverList = [...state.discover];
      Array.prototype.push.apply(newDiscoverList, payload.content);
      return {
        ...state,
        discover: newDiscoverList,
        discoverLoading: false,
      };
    default:
      return { ...state };
  }
}
