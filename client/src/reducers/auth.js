import * as actionTypes from '../actions/types';

const initialState = {
  token: null,
  loading: false,
  errors: [],
  isAuthenticated:
    localStorage.getItem('movieTrackerAccessToken') === undefined ||
    localStorage.getItem('movieTrackerAccessToken') === null ||
    localStorage.getItem('movieTrackerAccessToken').length === 0
      ? false
      : true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_LOADING:
      return { ...state, loading: true };
    case actionTypes.CLEAR_AUTH_ERRORS:
      return { ...state, errors: [] };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem('movieTrackerAccessToken'),
        loading: false,
        isAuthenticated: true,
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
        isAuthenticated: false,
      };
    case actionTypes.AUTH_FAILED:
      return { ...state, isAuthenticated: false };
    default:
      return { ...state };
  }
}
