const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

router.get('/me/watchlist', auth, async (req, res) => {
  console.log('Hello');
});

module.exports = router;
