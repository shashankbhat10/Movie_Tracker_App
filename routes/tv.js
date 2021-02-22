const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

router.get('/popular', async (req, res) => {
  let shows = [];
  try {
    const popularTVRes = await axios.get(
      `${moviedbBaseURI}tv/popular${moviedbAPIKey}`
    );

    popularTVRes.data.results.map((show) => {
      let show_data = {};
      show_data['id'] = show.id;
      show_data['title'] = show.name;
      show_data['poster_path'] = show.poster_path;
      show_data['backdrop_path'] = show.backdrop_path;
      show_data['language'] = show.original_language;

      shows.push(show_data);
    });

    res.json(shows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

router.get('/trending', async (req, res) => {
  let shows = [];
  try {
    const trendingTVRes = await axios.get(
      `${moviedbBaseURI}trending/tv/week${moviedbAPIKey}`
    );

    trendingTVRes.data.results.map((show) => {
      let show_data = {};
      show_data['id'] = show.id;
      show_data['title'] = show.name;
      show_data['poster_path'] = show.poster_path;
      show_data['backdrop_path'] = show.backdrop_path;
      show_data['language'] = show.original_language;

      shows.push(show_data);
    });

    res.json(shows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /genres
// @desc    Get list of genres of tv shows
// @Access  Private
router.get('/genres', async (req, res) => {
  try {
    const genresRes = await axios.get(
      `${moviedbBaseURI}genre/tv/list${moviedbAPIKey}`
    );

    res.json(genresRes.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
