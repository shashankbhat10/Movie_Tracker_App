const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

router.get('/popular', (req, res) => {
  let url = moviedbBaseURI + 'movie/popular' + moviedbAPIKey;
  let movies = [];
  axios
    .get(url)
    .then((response) => {
      response.data.results.map((movie) => {
        let movie_data = {};
        movie_data['title'] = movie.title;
        movie_data['id'] = movie.id;
        movie_data['release_date'] = movie.release_date;
        movie_data['overview'] = movie.overview;
        movie_data['poster_path'] = movie.poster_path;
        movie_data['language'] = movie.original_language;

        movies.push(movie_data);
      });
      res.json(movies);
    })
    .catch((err) => console.log(err));
});

router.get('/trending', (req, res, next) => {
  const trend_timeline = 'week';
  let url = moviedbBaseURI + 'trending/movie/' + trend_timeline + moviedbAPIKey;
  let movies = [];
  axios
    .get(url)
    .then((response) => {
      console.log(response.data.results);
      response.data.results.map((movie) => {
        let movie_data = {};
        movie_data['title'] = movie.title;
        movie_data['id'] = movie.id;
        movie_data['release_date'] = movie.release_date;
        movie_data['overview'] = movie.overview;
        movie_data['poster_path'] = movie.poster_path;
        movie_data['language'] = movie.original_language;

        movies.push(movie_data);
      });
      res.json(movies);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
