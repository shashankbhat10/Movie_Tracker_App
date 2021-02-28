const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const moviedbBaseURI = config.get('moviedbBaseURI');
const moviedbAPIKey = config.get('moviedbAPIKey');

// @route   GET /genres
// @desc    Get list of genres of tv shows
// @Access  Private
router.get('/:id', async (req, res) => {
  try {
    const personRes = await axios.get(
      `${moviedbBaseURI}person/${req.params.id}${moviedbAPIKey}&append_to_response=combined_credits,external_ids`
    );

    const details = {};
    Object.keys(personRes.data).map((item) => {
      if (item !== 'combined_credits' || item !== 'external_ids') {
        if (item === 'biography') {
          details[item] = personRes.data[item].replace(/\n/g, '\\n');
        } else {
          details[item] = personRes.data[item];
        }
      }
    });

    const person = {
      details: details,
      credits: personRes.data.combined_credits,
      external_ids: personRes.data.external_ids,
    };

    res.json(person);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

module.exports = router;
