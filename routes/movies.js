const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

// @route   GET /popular
// @desc    Get list of popular movies
// @Access  Private
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

// @route   GET /trending
// @desc    Get list of trending movies
// @Access  Private
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

// @route   GET /:id
// @desc    Get all details of individual movie
// @Access  Private
router.get('/:id', async (req, res) => {
  let details = {};
  let images = {};
  let cast = {};
  let reviews = {};
  let watchlinks = {};
  try {
    const detailsURL = `${moviedbBaseURI}movie/${req.params.id}${moviedbAPIKey}`;
    const castURL = `${moviedbBaseURI}movie/${req.params.id}/credits${moviedbAPIKey}`;
    const imagesURL = `${moviedbBaseURI}movie/${req.params.id}/images${moviedbAPIKey}&languages=en`;
    const reviewsURL = `${moviedbBaseURI}movie/${req.params.id}/reviews${moviedbAPIKey}`;
    const watchlinksURL = `${moviedbBaseURI}movie/${req.params.id}/watch/providers${moviedbAPIKey}`;

    // get details
    const detailsRes = await axios.get(detailsURL);
    const castsRes = await axios.get(castURL);
    const imagesRes = await axios.get(imagesURL);
    const reviewsRes = await axios.get(reviewsURL);
    const watchlinksRes = await axios.get(watchlinksURL);

    // build required objects
    details = {
      id: detailsRes.data.id,
      title: detailsRes.data.title,
      overview: detailsRes.data.overview,
      release_date: detailsRes.data.release_date,
      tagline: detailsRes.data.tagline,
      budget: detailsRes.data.budget,
      revenue: detailsRes.data.revenue,
    };

    images = {
      poster: imagesRes.data.posters[0].file_path,
      backdrop: imagesRes.data.backdrops[0].file_path,
    };

    cast = {
      director: castsRes.data.crew.filter((crew) => {
        return crew.job === 'Director';
      })[0],
      producer: castsRes.data.crew.filter((crew) => {
        return crew.job === 'Executive Producer';
      })[0],
      screenplay: castsRes.data.crew.filter((crew) => {
        return crew.job === 'Screenplay';
      })[0],
      cast: castsRes.data.cast.splice(0, 10),
    };

    reviews = reviewsRes.data;

    watchlinks = watchlinksRes.data.results['IN'];

    const response = {
      details: details,
      cast: cast,
      images: images,
      reviews: reviews,
      watchlinks: watchlinks,
    };

    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.json({ msg: 'Server Error' });
  }
});

module.exports = router;
