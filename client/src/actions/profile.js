import axios from 'axios';
import * as actionTypes from './types';

export const addContentToWatched = (content) => async (dispatch) => {
  try {
    // ADD REDUCER FOR LOAD/WAIT ANIMATION
    const res = await axios.post('/api/profile/add-to-watched', content);
    console.log(res);
    dispatch({
      type: actionTypes.CONTENT_ADDED_TO_WATCH,
      payload: res.data.content,
    });
  } catch (error) {}
};

export const getProfileData = () => async (dispatch) => {
  if (localStorage.getItem('movieTrackerAccessToken')) {
    try {
      const res = await axios.get('/api/profile/me');
      console.log(res.data);
      dispatch({
        type: actionTypes.PROFILE_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const removeContentFromWatched = (content) => async (dispatch) => {
  try {
    // Add dispatch to handle button/icon loading/disable before sending request
    console.log(content);
    const res = await axios.delete(
      `/api/profile/remove-watched/${content.type}/${content.id}`
    );
    console.log('remove action', res.data);
    dispatch({
      type: actionTypes.CONTENT_REMOVED_FROM_WATCH,
      payload: content,
    });
  } catch (error) {
    if (error.response.status === 400) {
      // show some message to user that content not in watched
    }
    console.log(error);
  }
};

export const addContentToList = (listId, type, content) => async (dispatch) => {
  try {
    let payload = {
      listId: listId,
      content: {
        id: content.id,
        title: content.title,
        poster: content.poster_path,
        backdrop: content.backdrop_path,
        type: type,
      },
    };
    const res = await axios.post('/api/profile/list/add', payload);
    console.log(res);
    dispatch({
      type: actionTypes.CONTENT_ADDED_TO_LIST,
      payload: { type: type, id: content.id },
    });
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const removeContentFromList = (listId, type, item) => async (
  dispatch
) => {
  try {
    const payload = {
      listId: listId,
      type: type,
      contentId: item.id,
    };

    const res = await axios.post('/api/profile/list/remove', payload);
    dispatch({
      type: actionTypes.CONTENT_REMOVED_FROM_LIST,
      payload: {
        type: type,
        id: item.id,
      },
    });
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
