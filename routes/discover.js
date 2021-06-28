const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const auth = require('../middleware/auth');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

// @route   GET /contentByGenre
// @desc    Get list of tv and movie based on respective genre
// @Access  Private
router.put('/contentByGenre', auth, async (req, res) => {
  try {
    let movieGenre = req.body.movie;
    let tvGenre = req.body.tv;
    let movies = [];
    let tv = [];
    let genreType = [];

    const promises = [];
    movieGenre.forEach((genre) => {
      genreType.push('movie');
      promises.push(
        axios.get(
          `${moviedbBaseURI}discover/movie${moviedbAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre.id}`
        )
      );
    });
    const genreTVstart = promises.length;
    tvGenre.forEach((genre) => {
      genreType.push('tv');
      promises.push(
        axios.get(
          `${moviedbBaseURI}discover/tv${moviedbAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre.id}`
        )
      );
    });

    const outputRes = await Promise.all(promises);
    outputRes.forEach((output, index) => {
      if (genreType[index] === 'movie') {
        const movie = {
          id: movieGenre[index].id,
          name: movieGenre[index].name,
          type: 'movie',
          list: output.data.results,
        };
        movies.push(movie);
      } else {
        const show = {
          id: tvGenre[index - genreTVstart].id,
          name: tvGenre[index - genreTVstart].name,
          type: 'tv',
        };
        output.data.results.forEach((item) => {
          item['title'] = item.name;
          delete item['name'];
        });
        show['list'] = output.data.results;
        tv.push(show);
      }
    });

    Array.prototype.push.apply(movies, tv);

    const contentList = {
      content: movies,
    };

    res.json(contentList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
