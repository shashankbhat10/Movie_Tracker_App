import axios from 'axios';
import * as actionTypes from './types';

export const createList = (name) => async (dispatch) => {
  const payload = {
    name: name,
  };

  try {
    const res = await axios.post('/api/profile/list/create', payload);

    dispatch({
      type: actionTypes.CREATE_LIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/delete/list/${id}`);

    dispatch({
      type: actionTypes.DELETE_LIST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getListData = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.get(`/api/profile/list/${id}`);
    console.log(res.data);

    dispatch({
      type: actionTypes.LIST_DATA_RECEIVED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getStatsContent = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/stats');

    console.log(res.data);

    dispatch({
      type: actionTypes.CONTENT_STATS_RECEIVED,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCustomListsContent = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/customListsData');

    console.log(res.data);

    dispatch({
      type: actionTypes.CUSTOM_LIST_DATE_RECEIVED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
