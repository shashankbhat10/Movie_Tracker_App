const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const collection = 'users';
const authCollection = 'auth';

const auth = require('../middleware/auth');
const db = require('../config/db');

router.post(
  '/register',
  [
    check('name', 'Please enter a name').exists(),
    check('email', 'Please Enter a Email address').isEmail(),
    check('password', 'Please provide a Password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await db
        .getDB()
        .collection(collection)
        .findOne({ email: email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const userEntry = {
        name: name,
        email: email,
        password: password,
      };

      const salt = await bcrypt.genSalt(10);
      userEntry.password = await bcrypt.hash(password, salt);

      await db
        .getDB()
        .collection(collection)
        .insertOne(userEntry, async (err, response) => {
          if (err) {
            console.log(err);
            throw err;
          } else {
            const payload = {
              user: {
                id: userEntry.id,
              },
            };

            const accessToken = jwt.sign(payload, config.get('accessTokenKey'));
            const refreshToken = jwt.sign(
              payload,
              config.get('refreshTokenKey')
            );

            const authPayload = {
              userID: userEntry.id,
              refreshToken: refreshToken,
              name: userEntry.name,
              email: userEntry.email,
            };
            await db
              .getDB()
              .collection(authCollection)
              .insertOne(authPayload, (err, response) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .send({ msg: 'Error inserting refreshToken' });
                }
              });

            res.json({ accessToken, refreshToken });
          }
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please Enter a Email address').isEmail(),
    check('password', 'Please provide a Password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await db
        .getDB()
        .collection(collection)
        .findOne({ email: email });

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const accessToken = jwt.sign(payload, config.get('accessTokenKey'));

      const refreshToken = jwt.sign(payload, config.get('refreshTokenKey'));

      const authPayload = {
        userID: user.id,
        refreshToken: refreshToken,
        name: user.name,
        email: user.email,
      };

      const decoded = jwt.verify(
        accessToken,
        config.get('accessTokenKey'),
        (err) => {
          if (err) {
            return res.status(403).send({ msg: 'Access Token not valid' });
          }
        }
      );
      console.log('decoded', decoded);

      decoded = jwt.verify(
        accessToken,
        config.get('refreshTokenKey'),
        (err) => {
          if (err) {
            return res.status(403).send({ msg: 'Access Token not valid' });
          }
        }
      );

      console.log('decoded', decoded);
      await db
        .getDB()
        .collection(authCollection)
        .insertOne(authPayload, (err, response) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ msg: 'Error inserting refreshToken' });
          }
        });

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post('/refresh', auth, (req, res) => {});

module.exports = router;
