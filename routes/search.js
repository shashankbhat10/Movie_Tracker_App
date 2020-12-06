const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const { body } = require('express-validator');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

// @route   GET /searchAll
// @desc    Get all details of individual movie
// @Access  Private
router.get('/searchAll/:searchString', async (req, res) => {
  let movies = {};
  let tv = {};
  let people = {};
  let company = {};

  const searchMovieURI = `${moviedbBaseURI}search/movie${moviedbAPIKey}&query=${req.params.searchString}&include_adult=false`;
  const searchTVURI = `${moviedbBaseURI}search/tv${moviedbAPIKey}&query=${req.params.searchString}&include_adult=false`;
  const searchPeopleURI = `${moviedbBaseURI}search/person${moviedbAPIKey}&query=${req.params.searchString}&include_adult=false`;
  const searchCompanyURI = `${moviedbBaseURI}search/company${moviedbAPIKey}&query=${req.params.searchString}&include_adult=false`;

  try {
    let searchMovieResults = await axios.get(searchMovieURI);
    let searchTVResults = await axios.get(searchTVURI);
    let searchPeopleResults = await axios.get(searchPeopleURI);
    let searchCompanyResults = await axios.get(searchCompanyURI);

    // Structure Searched Movie Data
    movies.totalPages = searchMovieResults.data.total_pages;
    movies.totalResults = searchMovieResults.data.total_results;
    movies.data = searchMovieResults.data.results;
    movies.currentPage = 1;

    // Structure Searched TV Data
    tv.totalPages = searchTVResults.data.total_pages;
    tv.totalResults = searchTVResults.data.total_results;
    tv.data = searchTVResults.data.results;
    tv.currentPage = 1;

    // Structure Searched People Data
    people.totalPages = searchPeopleResults.data.total_pages;
    people.totalResults = searchPeopleResults.data.total_results;
    people.data = searchPeopleResults.data.results;
    people.currentPage = 1;

    // Structure Searched Company Data
    company.totalPages = searchCompanyResults.data.total_pages;
    company.totalResults = searchCompanyResults.data.total_results;
    company.data = searchCompanyResults.data.results;
    company.currentPage = 1;

    let response = {};
    response.movies = movies;
    response.tv = tv;
    response.people = people;
    response.company = company;
    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.json({ msg: 'Server Error' });
  }
});

// @route   GET /searchAll
// @desc    Get all details of individual movie
// @Access  Private
router.post('/searchSingle', async (req, res) => {
  console.log(req.body);
  let { query, resultType, pageNumber } = req.body;
  console.log(resultType + ' + ' + pageNumber);

  const searchSingleURI = `${moviedbBaseURI}search/${resultType}${moviedbAPIKey}&query=${query}&page=${pageNumber}&include_adult=false`;
  console.log(searchSingleURI);
  try {
    let searchResult = await axios.get(searchSingleURI);

    res.json(searchResult.data);
  } catch (err) {
    console.log(err.message);
    res.json({ msg: 'Server Error' });
  }
});

module.exports = router;
