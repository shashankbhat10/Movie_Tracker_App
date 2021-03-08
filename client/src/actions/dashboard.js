import axios from 'axios';
import { authFailed } from './auth';
import * as actionTypes from './types';
import setAuthToken from './utils/setAuthToken';

export const getGenres = () => async (dispatch) => {
  try {
    const movieGenresRes = await axios.get('/api/movies/genres');
    const tvGenresRes = await axios.get('/api/tv/genres');

    const genres = {
      movie: movieGenresRes.data.genres,
      tv: tvGenresRes.data.genres,
    };
    dispatch({
      type: actionTypes.GENRES_LOADED,
      payload: genres,
    });

    dispatch(selectRandomGenres(genres.movie, genres.tv));
  } catch (err) {
    console.log(err);
  }
};

export const getDashboardMovies = () => async (dispatch) => {
  try {
    const popularMoviesRes = await axios.get('/api/movies/popular');
    const trendingMoviesRes = await axios.get('/api/movies/trending');

    const dashboardMovies = {
      popular: popularMoviesRes.data,
      trending: trendingMoviesRes.data,
    };

    dispatch({
      type: actionTypes.DASHBOARD_MOVIES_LOADED,
      payload: dashboardMovies,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDashboardTV = () => async (dispatch) => {
  try {
    const popularTVRes = await axios.get('/api/tv/popular');
    const trendingTVRes = await axios.get('/api/tv/trending');

    const dashboardTV = {
      popular: popularTVRes.data,
      trending: trendingTVRes.data,
    };

    dispatch({
      type: actionTypes.DASHBOARD_TV_LOADED,
      payload: dashboardTV,
    });
  } catch (error) {
    console.log(error);
  }
};

export const selectRandomGenres = (movieGenres, tvGenres) => async (
  dispatch
) => {
  try {
    let genres = movieGenres.map((genre) => {
      return { ...genre, type: 'movie' };
    });
    tvGenres = tvGenres.map((genre) => {
      return { ...genre, type: 'tv' };
    });
    Array.prototype.push.apply(genres, tvGenres);

    const randomList = getRandom(genres, genres.length > 5 ? 5 : genres.length);
    const genre = {
      movie: randomList.filter((genre) => {
        return genre.type === 'movie';
      }),
      tv: randomList.filter((genre) => {
        return genre.type === 'tv';
      }),
    };

    dispatch({
      type: actionTypes.RANDOM_GENRES_SELECTED,
      payload: genre,
    });

    // const discoverGenresRes = await axios.put(
    //   '/api/discover/contentByGenre',
    //   genre
    // );
    // console.log(discoverGenresRes.data);
    dispatch(getGenresContent(genre));
  } catch (err) {
    console.log(err);
  }
};

export const getGenresContent = (genres) => async (dispatch) => {
  try {
    if (!axios.defaults.headers.common['x-auth-token']) {
      setAuthToken(localStorage.getItem('movieTrackerAccessToken'));
    }

    const discoverGenresRes = await axios.put(
      '/api/discover/contentByGenre',
      genres
    );
    console.log(discoverGenresRes.data);
    dispatch({
      type: actionTypes.PARTIAL_GENRE_MOVIES_LOADED,
      payload: discoverGenresRes.data,
    });
  } catch (err) {
    dispatch(authFailed());
    console.log(err);
  }
};

// Need to understand :D
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const clearDashboard = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_DASHBOARD,
  });
};
