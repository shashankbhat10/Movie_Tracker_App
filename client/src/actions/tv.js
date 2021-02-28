import * as actionTypes from './types';
import axios from 'axios';

export const getTVDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOADING_TV_DETAILS,
    });
    const detailsRes = await axios.get(`/api/tv/${id}`);
    console.log(detailsRes.data);
    dispatch({
      type: actionTypes.TV_DETAILS_LOADED,
      payload: detailsRes.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTVCredits = (tvId) => async (dispatch) => {
  console.log('IN');
  try {
    dispatch({
      type: actionTypes.TV_CREDITS_LOADING,
    });
    const tvCredits = await axios.get(`/api/tv/${tvId}/credits`);
    console.log(tvCredits.data.test);
    dispatch({
      type: actionTypes.TV_CREDITS_LOADED,
      payload: tvCredits.data,
    });
  } catch (err) {
    console.log(err);
  }
};
