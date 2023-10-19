import axios from "axios";
import * as actionTypes from "./types";
import { updateListContentAfterClear } from "./dashboard";

export const addContentToWatched = (content) => async (dispatch) => {
  try {
    // ADD REDUCER FOR LOAD/WAIT ANIMATION
    // console.log(content);
    const res = await axios.post("/api/profile/add-to-watched", content);
    console.log(res);
    dispatch({
      type: actionTypes.CONTENT_ADDED_TO_WATCH,
      payload: res.data.content,
    });
  } catch (error) {}
};

export const getProfileData = () => async (dispatch) => {
  if (localStorage.getItem("movieTrackerAccessToken")) {
    try {
      const res = await axios.get("/api/profile/me");
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
    console.log("action remove content", content);
    const res = await axios.delete(`/api/profile/remove-watched/${content.type}/${content.id}`);
    console.log("remove action", res.data);
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

export const addContentToList = (listId, listType, type, content) => async (dispatch) => {
  try {
    let payload = {
      listId: listId,
      listType: listType,
      content: {
        id: content.id,
        title: content.title,
        poster: content.poster_path,
        backdrop: content.backdrop_path,
        type: type,
      },
    };
    const res = await axios.post("/api/profile/list/add", payload);
    console.log(res);

    if (listType === "custom") {
      dispatch({
        type: actionTypes.CONTENT_ADDED_TO_LIST,
        payload: {
          type: type,
          id: content.id,
        },
      });
    } else {
      dispatch({
        type: actionTypes.CONTENT_ADDED_TO_WATCHLIST,
        payload: {
          type: type,
          id: content.id,
        },
      });
    }
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const removeContentFromList = (listId, type, item) => async (dispatch) => {
  try {
    const payload = {
      listId: listId,
      type: type,
      contentId: item.id,
    };

    // const res = await axios.post("/api/profile/list/remove", payload);
    await axios.post("/api/profile/list/remove", payload);
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

export const addRating = (content, type, rating) => async (dispatch) => {
  try {
    console.log("addRating");
    console.log(type);
    // console.log(content);
    // console.log(type);
    // console.log(rating);
    const payload = {
      id: content.id,
      title: content.title,
      rating: rating,
      poster: content.poster_path,
      backdrop: content.backdrop_path,
      type: type,
    };
    const res = await axios.post("api/profile/rating/add", payload);
    console.log(res.data);
    dispatch({
      type: actionTypes.CONTENT_RATING_ADDED,
      payload: payload,
    });
  } catch (error) {
    //Handle error message display
    console.log(error.message);
  }
};

export const updateRating = (id, type, rating) => async (dispatch) => {
  try {
    const payload = {
      id: id,
      type: type,
      rating: rating,
    };

    // const res = await axios.patch("/api/profile/rating/update", payload);
    await axios.patch("/api/profile/rating/update", payload);

    dispatch({
      type: actionTypes.CONTENT_RATING_UPDATED,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const removeRating = (id, type) => async (dispatch) => {
  try {
    // const res = await axios.delete(`api/profile/rating/remove/${type}/${id}`);
    await axios.delete(`api/profile/rating/remove/${type}/${id}`);

    dispatch({
      type: actionTypes.CONTENT_RATING_REMOVED,
      payload: {
        id: id,
        type: type,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createList = (name) => async (dispatch) => {
  const payload = {
    name: name,
  };
  console.log(name);

  try {
    const res = await axios.post("/api/profile/list", payload);
    dispatch({
      type: actionTypes.CREATE_LIST,
      payload: res.data.list,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/list/${id}`);

    dispatch({
      type: actionTypes.DELETE_LIST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const clearContents = (listId, clearType) => async (dispatch) => {
  try {
    console.log("CLEAR");
    let res = null;
    if (clearType === "all") {
      console.log("ALL");
      res = await axios.delete(`/api/profile/clearAllListContent/${listId}`);
    } else {
      res = await axios.delete(`/api/profile/clearListContent/${listId}/${clearType}`);
    }

    console.log(res.data);
    dispatch(updateListContentAfterClear(res.data.payload));
  } catch (error) {
    console.log(error);
  }
};
