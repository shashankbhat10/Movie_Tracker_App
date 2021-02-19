import axios from 'axios';
import {
  LOAD_TRAILER,
  MOVIE_LOADED,
  UNLOAD_TRAILER,
  MOVIE_LOADING,
} from './types';

// Get all details for individual movie
export const getMovieById = (movieId) => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_LOADING,
    });
    const movieDetails = await axios.get(`/api/movies/movie/${movieId}`);
    console.log(movieDetails.data);
    dispatch({
      type: MOVIE_LOADED,
      payload: movieDetails.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadTrailer = () => async (dispatch) => {
  dispatch({
    type: LOAD_TRAILER,
  });
};

export const unloadTrailer = () => async (dispatch) => {
  dispatch({
    type: UNLOAD_TRAILER,
  });
};
