import * as actionTypes from '../actions/types';

const initialState = {
  details: {},
  cast: {},
  providers: {},
  reviews: {},
  media: {},
  similar: {},
  additionalDetails: {},
  links: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOADING_TV_DETAILS:
      return { ...state, loading: true };
    case actionTypes.TV_DETAILS_LOADED:
      return {
        ...state,
        details: payload.details,
        cast: payload.cast,
        providers: payload.providers,
        reviews: payload.reviews,
        media: payload.media,
        similar: payload.similar,
        additionalDetails: payload.additionalDetails,
        links: payload.links,
        loading: false,
      };
    default:
      return { ...state };
  }
}
