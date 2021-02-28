import * as actionTypes from '../actions/types';

const initialState = {
  details: {},
  images: {},
  credits: {},
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
    case actionTypes.MOVIE_LOADED:
      return {
        ...state,
        details: payload.details,
        images: payload.images,
        credits: payload.credits,
        reviews: payload.reviews !== null ? payload.reviews : null,
        watchlinks: payload.watchlinks !== null ? payload.watchlinks : null,
        trailer: payload.trailer,
        media: payload.media,
        similar: payload.similar,
        loading: false,
      };
    case actionTypes.CLEAR_MOVIE:
      return {
        ...state,
        details: {},
        images: {},
        description: '',
        credits: {},
        reviews: {},
        watchlinks: {},
        trailer: {},
        media: {},
        similar: {},
        loading: false,
      };
    case actionTypes.LOAD_TRAILER:
      return { ...state, loadTrailer: true };
    case actionTypes.UNLOAD_TRAILER:
      return { ...state, loadTrailer: false };
    case actionTypes.MOVIE_LOADING:
      return { ...state, loading: true };
    case actionTypes.MOVIE_CREDITS_LOADED:
      return { ...state, credits: payload, loading: false };
    default:
      return { ...state };
  }
}
