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
