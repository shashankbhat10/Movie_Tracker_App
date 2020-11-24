import axios from 'axios';
import { GET_MOVIE } from './types';

// Get all details for individual movie
export const getMovieById = (movieId) => async (dispatch) => {
  try {
    const movieDetails = await axios.get(`/api/movies/${movieId}`);
    console.log(movieDetails.data);
    console.log('THASDAS');
    dispatch({
      type: GET_MOVIE,
      payload: movieDetails.data,
    });
  } catch (err) {
    console.log(err);
  }
};
