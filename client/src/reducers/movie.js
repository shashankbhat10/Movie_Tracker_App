import { GET_MOVIE, CLEAR_MOVIE } from '../actions/types';

const initialState = {
  details: {},
  images: {},
  cast: {},
  reviews: {},
  watchlinks: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        details: payload.details,
        images: payload.images,
        cast: payload.cast,
        reviews: payload.reviews !== null ? payload.reviews : null,
        watchlinks: payload.watchlinks !== null ? payload.watchlinks : null,
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
      };
    default:
      return { ...state };
  }
}
