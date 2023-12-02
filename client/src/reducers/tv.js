import * as actionTypes from "../actions/types";

const initialState = {
  details: {},
  credits: {},
  providers: {},
  reviews: {},
  media: {},
  similar: {},
  additionalDetails: {},
  links: {},
  loading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOADING_TV_DETAILS:
    case actionTypes.TV_CREDITS_LOADING:
      return { ...state, loading: true };
    case actionTypes.TV_DETAILS_LOADED:
      return {
        ...state,
        details: payload.details,
        credits: payload.credits,
        providers: payload.providers,
        reviews: payload.reviews,
        media: payload.media,
        similar: payload.similar,
        additionalDetails: payload.additionalDetails,
        links: payload.links,
        loading: false,
      };
    case actionTypes.TV_CREDITS_LOADED:
      return { ...state, credits: payload, loading: false };
    default:
      return { ...state };
  }
}
