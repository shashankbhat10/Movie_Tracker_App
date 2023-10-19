const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const { body } = require('express-validator');
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
        movie_data['backdrop_path'] = movie.backdrop_path;

        movies.push(movie_data);
      });
      res.json(movies);
    })
    .catch((err) => console.log(err.message));
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
      response.data.results.map((movie) => {
        let movie_data = {};
        movie_data['title'] = movie.title;
        movie_data['id'] = movie.id;
        movie_data['release_date'] = movie.release_date;
        movie_data['overview'] = movie.overview;
        movie_data['poster_path'] = movie.poster_path;
        movie_data['language'] = movie.original_language;
        movie_data['backdrop_path'] = movie.backdrop_path;

        movies.push(movie_data);
      });
      res.json(movies);
    })
    .catch((err) => console.log(err));
});

// @route   GET /:id
// @desc    Get all details of individual movie
// @Access  Private
router.get('/movie/:id', async (req, res) => {
  let details = {};
  let images = {};
  let cast = {};
  let reviews = {};
  let watchlinks = {};
  let trailer = {};
  let similar = {};
  let media = {};
  try {
    const detailsURL = `${moviedbBaseURI}movie/${req.params.id}${moviedbAPIKey}`;
    const creditsURL = `${moviedbBaseURI}movie/${req.params.id}/credits${moviedbAPIKey}`;
    const imagesURL = `${moviedbBaseURI}movie/${req.params.id}/images${moviedbAPIKey}`;
    const reviewsURL = `${moviedbBaseURI}movie/${req.params.id}/reviews${moviedbAPIKey}`;
    const watchlinksURL = `${moviedbBaseURI}movie/${req.params.id}/watch/providers${moviedbAPIKey}`;
    const trailerURL = `${moviedbBaseURI}movie/${req.params.id}/videos${moviedbAPIKey}`;
    const similarURL = `${moviedbBaseURI}movie/${req.params.id}/similar${moviedbAPIKey}`;
    const externalRes = await axios.get(
      `${moviedbBaseURI}movie/${req.params.id}/external_ids${moviedbAPIKey}`
    );
    const languageRes = await axios.get(
      `${moviedbBaseURI}configuration/languages${moviedbAPIKey}`
    );

    // get details
    const detailsRes = await axios.get(detailsURL);
    const creditsRes = await axios.get(creditsURL);
    const imagesRes = await axios.get(imagesURL);
    const reviewsRes = await axios.get(reviewsURL);
    const watchlinksRes = await axios.get(watchlinksURL);
    const trailerRes = await axios.get(trailerURL);
    const similarRes = await axios.get(similarURL);
    // Need to add media and videos

    // build required objects
    details = {
      id: detailsRes.data.id,
      title: detailsRes.data.title,
      overview: detailsRes.data.overview,
      release_date: detailsRes.data.release_date,
      tagline: detailsRes.data.tagline,
      budget: detailsRes.data.budget,
      revenue: detailsRes.data.revenue,
      runtime: detailsRes.data.runtime,
    };
    let genres = detailsRes.data.genres.map((genre) => {
      return genre.name;
    });
    details['genres'] = genres;

    // Send 1st poster and backdrop as main images
    // ToDo: Refactor object name
    images = {
      poster: imagesRes.data.posters[0].file_path,
      backdrop: imagesRes.data.backdrops[0].file_path,
    };

    // cast = {
    //   director: castsRes.data.crew.filter((crew) => {
    //     return crew.job === 'Director';
    //   })[0],
    //   producer: castsRes.data.crew.filter((crew) => {
    //     return crew.job === 'Executive Producer';
    //   })[0],
    //   screenplay: castsRes.data.crew.filter((crew) => {
    //     return crew.job === 'Screenplay';
    //   })[0],
    //   cast: castsRes.data.cast,
    // };

    const crewNames = {};
    creditsRes.data.crew.forEach((person) => {
      const id = person.id;
      if (!crewNames[id]) {
        crewNames[id] = person;
      } else {
        crewNames[id]['job'] += '/ ' + person.job;
      }
    });
    const crew = [];
    Object.keys(crewNames).forEach((id) => crew.push(crewNames[id]));
    credits = { cast: creditsRes.data.cast, crew: crew };

    reviews = reviewsRes.data;

    // Get Watchlinks based on Region
    // ToDo: Get high-level location data such as country to send proper watchlink
    watchlinks = watchlinksRes.data.results['IN'];

    // Send 1st trailer as main trailer
    trailer = trailerRes.data.results.filter((trailer) => {
      return trailer.type === 'Trailer';
    })[0];

    // Process Similar Movie response
    similar = similarRes.data.results
      .map((result) => {
        return {
          id: result.id,
          release_date: result.release_date,
          title: result.title,
          backdrop_path: result.backdrop_path,
          popularity: result.popularity,
        };
      })
      .sort((a, b) => {
        return b.popularity - a.popularity;
      });

    // Process media response
    const poster_count = imagesRes.data.posters.length;
    const backdrop_count = imagesRes.data.backdrops.length;
    const video_count = trailerRes.data.results.length;
    media = {
      posters: {
        count: poster_count,
        images: imagesRes.data.posters.slice(
          0,
          poster_count > 15 ? 15 : poster_count
        ),
      },
      backdrops: {
        count: backdrop_count,
        images: imagesRes.data.backdrops.slice(
          0,
          backdrop_count > 15 ? 15 : backdrop_count
        ),
      },
      videos: {
        count: video_count,
        videos: trailerRes.data.results.slice(
          0,
          video_count > 15 ? 15 : video_count
        ),
      },
    };

    const additionalDetails = {
      status: detailsRes.data.status,
      originalLanguage: languageRes.data.filter(
        (lang) => lang['iso_639_1'] === detailsRes.data.original_language
      )[0].english_name,
      releaseDate: detailsRes.data.release_date,
      production: detailsRes.data.production_companies.filter(
        (company) => company.logo_path !== null
      ),
      trailer: trailerRes.data.results.filter(
        (video) => video.type === 'Trailer'
      )[0],
      budget: detailsRes.data.budget,
      revenue: detailsRes.data.revenue,
    };

    const links = {
      homepage: detailsRes.data.homepage,
      social: {
        facebook: externalRes.data.facebook_id,
        instagram: externalRes.data.instagram_id,
        twitter: externalRes.data.twitter_id,
      },
    };

    const response = {
      details: details,
      additionalDetails: additionalDetails,
      credits: credits,
      images: images,
      reviews: reviews,
      watchlinks: watchlinks,
      trailer: trailer,
      similar: similar,
      media: media,
      links: links,
    };

    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.json({ msg: 'Server Error' });
  }
});

// @route   GET /genres
// @desc    Get list of genres of movies
// @Access  Private
router.get('/genres', async (req, res) => {
  try {
    const genresRes = await axios.get(
      `${moviedbBaseURI}genre/movie/list${moviedbAPIKey}`
    );

    res.json(genresRes.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/:id/credits', async (req, res) => {
  try {
    const creditsRes = await axios.get(
      `${moviedbBaseURI}movie/${req.params.id}/credits${moviedbAPIKey}`
    );

    // const crewNames = {};
    // creditsRes.data.crew.forEach((person) => {
    //   const id = person.id;
    //   if (!crewNames[id]) {
    //     crewNames[id] = person;
    //   } else {
    //     crewNames[id]['job'] = crewNames[id]['job'].concat('/ ', person.job);
    //   }
    // });
    // const crew = [];
    // Object.keys(crewNames).forEach((id) => crew.push(crewNames[id]));
    const crewNames = {};
    creditsRes.data.crew.forEach((person) => {
      const id = person.id;
      if (!crewNames[id]) {
        crewNames[id] = person;
      } else {
        crewNames[id]['job'] += '/ ' + person.job;
      }
    });
    const crew = [];
    Object.keys(crewNames).forEach((id) => crew.push(crewNames[id]));

    const credits = {
      cast: creditsRes.data.cast,
      crew: crew,
    };

    res.json(credits);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
