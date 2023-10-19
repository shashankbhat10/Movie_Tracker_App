import * as actionTypes from "./types";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
// import Cookies from 'universal-cookie';
import { getProfileData } from "./profile";
// import { useHistory } from 'react-router';

export const setUser = () => async (dispatch) => {
  if (localStorage.getItem("movieTrackerAccessToken")) {
    setAuthToken(localStorage.getItem("movieTrackerAccessToken"));
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.AUTH_LOADING });

    const registerRes = await axios.post("/api/auth/register", formData);

    // localStorage.setItem(
    //   'movieTrackerRefreshToken',
    //   registerRes.data.refreshToken
    // );
    console.log("Response", registerRes.data);
    localStorage.setItem("movieTrackerAccessToken", registerRes.data.accessToken);

    dispatch(setUser());
    dispatch(getProfileData());

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
    });
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) {
      console.log("HI");
    }
    const errors = error.response.data.errors;
    let errorsList = [];
    if (errors) {
      errors.forEach((err) => {
        errorsList.push(err.msg);
      });
    }

    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: errorsList,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    // dispatch({ type: actionTypes.AUTH_LOADING });

    const res = await axios.post("/api/auth/login", formData);

    localStorage.setItem("movieTrackerAccessToken", res.data.accessToken);
    // let c = new Cookie();

    dispatch(setUser());
    dispatch(getProfileData());

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    let errorsList = [];
    if (errors) {
      errors.forEach((err) => {
        errorsList.push(err.msg);
      });
    }

    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: errorsList,
    });
  }
};

export const authFailed = () => async (dispatch) => {
  console.log("IB");
  dispatch({
    type: actionTypes.AUTH_FAILED,
  });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_AUTH_ERRORS });
};

export const checkAuth = () => async (dispatch) => {
  if (localStorage.getItem("movieTrackerAccessToken")) {
    setAuthToken(localStorage.getItem("movieTrackerAccessToken"));
    dispatch({ type: actionTypes.AUTH_CHECK_SUCCESS });
  } else {
    dispatch({ type: actionTypes.AUTH_CHECK_FAIL });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("movieTrackerAccessToken");
  dispatch({
    type: actionTypes.USER_LOGOUT_SUCCESS,
  });
  // const history = useHistory();
  // history.push('/login');
};
