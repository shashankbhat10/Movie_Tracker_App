import { MOVIE_LOADED, CLEAR_MOVIE } from '../actions/types';

const initialState = {
  details: {},
  images: {},
  cast: {},
  reviews: {},
  watchlinks: {},
  loading: true,
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
        loading: false,
      };
    default:
      return { ...state };
  }
}
