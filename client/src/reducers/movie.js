import {
  MOVIE_LOADED,
  CLEAR_MOVIE,
  LOAD_TRAILER,
  UNLOAD_TRAILER,
  MOVIE_LOADING,
} from '../actions/types';

const initialState = {
  details: {},
  images: {},
  cast: {},
  reviews: {},
  watchlinks: {},
  trailer: {},
  media: {},
  similar: {},
  loading: true,
  loadTrailer: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MOVIE_LOADED:
      return {
        ...state,
        details: payload.details,
        images: payload.images,
        cast: payload.cast,
        reviews: payload.reviews !== null ? payload.reviews : null,
        watchlinks: payload.watchlinks !== null ? payload.watchlinks : null,
        trailer: payload.trailer,
        media: payload.media,
        similar: payload.similar,
        loading: false,
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        details: {},
        images: {},
        description: '',
        cast: {},
        reviews: {},
        watchlinks: {},
        trailer: {},
        media: {},
        similar: {},
        loading: false,
      };
    case LOAD_TRAILER:
      return { ...state, loadTrailer: true };
    case UNLOAD_TRAILER:
      return { ...state, loadTrailer: false };
    case MOVIE_LOADING:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
}
