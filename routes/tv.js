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

// @route   GET /:id
// @desc    Get details of TV show
// @Access  Private
router.get('/:id', async (req, res) => {
  try {
    const detailsRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}${moviedbAPIKey}`
    );
    const creditsRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/aggregate_credits${moviedbAPIKey}`
    );
    const watchproviderRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/watch/providers${moviedbAPIKey}`
    );
    const reviewRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/reviews${moviedbAPIKey}&language=en-US&page=1`
    );
    const mediaRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/images${moviedbAPIKey}`
    );
    const videoRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/videos${moviedbAPIKey}`
    );
    const similarRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/similar${moviedbAPIKey}`
    );
    const externalRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/external_ids${moviedbAPIKey}`
    );
    const languageRes = await axios.get(
      `${moviedbBaseURI}configuration/languages${moviedbAPIKey}`
    );

    const show = {
      id: detailsRes.data.id,
      name: detailsRes.data.name,
      numberOfSeasons: detailsRes.data.number_of_seasons,
      overview: detailsRes.data.overview,
      backdrop_path: detailsRes.data.backdrop_path,
      poster_path: detailsRes.data.poster_path,
      seasons: detailsRes.data.seasons,
      tagline: detailsRes.data.tagline,
      inProduction: detailsRes.data.in_production,
      genres: detailsRes.data.genres,
      startDate: detailsRes.data.first_air_date,
    };

    const cast = creditsRes.data.cast.map((cast) => {
      return {
        id: cast.id,
        name: cast.name,
        profile_path: cast.profile_path,
        character: cast.roles
          .map((role) => role.character)
          .slice(0, cast.roles.length > 1 ? 2 : 1)
          .join(' / '),
        episodeCount: cast.total_episode_count,
      };
    });
    // const crewNames = {};
    // creditsRes.data.crew.forEach((person) => {
    //   const id = person.id;
    //   if (!crewNames[id]) {
    //     crewNames[id] = person;
    //   } else {
    //     console.log(crewNames[id]['job']);
    //     crewNames[id]['job'] = crewNames[id]['job'].concat('/ ', person.job);
    //   }
    //   console.log(crewNames[id]);
    // });
    // const crew = [];
    // Object.keys(crewNames).forEach((id) => crew.push(crewNames[id]));

    const credits = { cast: cast, crew: creditsRes.data.crew };

    const watch = watchproviderRes.data.results['IN'];

    const reviews = reviewRes.data;

    const images = mediaRes.data;

    const videos = videoRes.data.results;

    const posterCount = images.posters.length;
    const backdropCount = images.backdrops.length;
    const videoCount = videos.length;
    const media = {
      posters: {
        count: posterCount,
        images: images.posters.slice(0, posterCount > 15 ? 15 : posterCount),
      },
      backdrops: {
        count: backdropCount,
        images: images.backdrops.slice(
          0,
          backdropCount > 15 ? 15 : backdropCount
        ),
      },
      videos: {
        count: videoCount,
        videos: videos.slice(0, videoCount > 15 ? 15 : videoCount),
      },
    };

    const similar = similarRes.data.results;

    const links = {
      homepage: detailsRes.data.homepage,
      social: {
        facebook: externalRes.data.facebook_id,
        instagram: externalRes.data.instagram_id,
        twitter: externalRes.data.twitter_id,
      },
    };

    const additionalDetails = {
      episodeRunTime: detailsRes.data.episode_run_time[0],
      status: detailsRes.data.status,
      type: detailsRes.data.type,
      originalLanguage: languageRes.data.filter(
        (lang) => lang['iso_639_1'] === detailsRes.data.original_language
      )[0].english_name,
      networks: detailsRes.data.networks,
      firstAirDate: detailsRes.data.first_air_date,
      production: detailsRes.data.production_companies.filter(
        (company) => company.logo_path !== null
      ),
      trailer: videoRes.data.results.filter(
        (video) => video.type === 'Trailer'
      )[0],
    };

    const response = {
      details: show,
      additionalDetails: additionalDetails,
      credits: credits,
      providers: watch,
      reviews: reviews,
      media: media,
      similar: similar,
      links: links,
    };

    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   GET /:id/credits
// @desc    Get details of TV show
// @Access  Private
router.get('/:id/credits', async (req, res) => {
  try {
    const creditsRes = await axios.get(
      `${moviedbBaseURI}tv/${req.params.id}/aggregate_credits${moviedbAPIKey}`
    );

    const cast = creditsRes.data.cast.map((cast) => {
      return {
        id: cast.id,
        name: cast.name,
        profile_path: cast.profile_path,
        character: cast.roles
          .map((role) => role.character)
          .slice(0, cast.roles.length > 1 ? 2 : 1)
          .join(' / '),
        episodeCount: cast.total_episode_count,
      };
    });

    const crewNames = {};
    creditsRes.data.crew.forEach((person) => {
      const id = person.id;
      if (!crewNames[id]) {
        crewNames[id] = person;
      } else {
        crewNames[id]['jobs'].push(...person.jobs);
      }
    });
    const crew = [];
    Object.keys(crewNames).forEach((id) => crew.push(crewNames[id]));
    crew.sort((a, b) => b.total_episode_count - a.total_episode_count);

    const credits = {
      cast: cast,
      crew: crew,
    };

    res.json(credits);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});
module.exports = router;
