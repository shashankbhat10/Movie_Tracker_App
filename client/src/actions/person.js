import * as actionTypes from './types';
import axios from 'axios';

export const getPersonDetails = (id) => async (dispatch) => {
  try {
    const personRes = await axios.get(`/api/person/${id}`);

    dispatch({
      type: actionTypes.PERSON_DATA_LOADED,
      payload: personRes.data,
    });
  } catch (err) {
    console.log(err);
  }
};
