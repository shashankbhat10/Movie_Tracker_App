import axios from 'axios';
import { MOVIE_LOADED } from './types';

// Get all details for individual movie
export const getMovieById = (movieId) => async (dispatch) => {
  try {
    const movieDetails = await axios.get(`/api/movies/${movieId}`);
    console.log(movieDetails.data);
    dispatch({
      type: MOVIE_LOADED,
      payload: movieDetails.data,
    });
  } catch (err) {
    console.log(err);
  }
};
