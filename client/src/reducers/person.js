import * as actionTypes from '../actions/types';

const initialState = {
  details: {},
  credits: {},
  external: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PERSON_DATA_LOADING:
      return { ...state, loading: true };
    case actionTypes.PERSON_DATA_LOADED:
      return {
        ...state,
        details: payload.details,
        credits: payload.credits,
        external: payload.external_ids,
        loading: false,
      };
    default:
      return { ...state };
  }
}
