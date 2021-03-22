const express = require('express');
const auth = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();
const mongo = require('mongodb');
const { check, validationResult } = require('express-validator/check');
const { response } = require('express');
const profileCollection = 'userProfile';
const listCollection = 'lists';

router.get('/me/watchlist', auth, async (req, res) => {
  console.log('Hello');
});

router.post('/add-to-watched', auth, async (req, res) => {
  try {
    const content = req.body;
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        { userId: mongo.ObjectID(req.user.id) },
        { $addToSet: { watched: content } },
        (err, response) => {
          if (err) throw err;
          if (response.modifiedCount !== 1) {
            res
              .status(400)
              .json({ message: 'Content couldnt be added to Watched' });
          } else {
            res.json({
              status: 200,
              message: 'Content Added to Watched',
              content: content,
            });
          }
        }
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Server Error' });
  }
});

router.delete('/remove-watched/:type/:id', auth, async (req, res) => {
  try {
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        {
          userId: mongo.ObjectID(req.user.id),
        },
        {
          $pull: {
            watched: { id: parseInt(req.params.id), type: req.params.type },
          },
        },
        (err, response) => {
          if (err) {
            console.log(err.message);
            throw err;
          } else if (response.modifiedCount !== 1) {
            return res
              .status(400)
              .json({ message: 'Content not found in Watched' });
          } else {
            return res
              .status(200)
              .json({ message: 'Content removed from Watched' });
          }
        }
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    await db
      .getDB()
      .collection(profileCollection)
      .findOne(
        { userId: mongo.ObjectID(req.user.id) },
        async (err, profile) => {
          if (err) {
            console.log('Profile find Error', error);
            throw err;
          } else {
            await db
              .getDB()
              .collection(listCollection)
              .findOne(
                { _id: mongo.ObjectID(profile.lists[0]) },
                (err, watchlist) => {
                  if (err) {
                    console.log(
                      'Error finding watchlist of profile',
                      err.message
                    );
                  } else {
                    profile.watchlist = watchlist;
                    res.json(profile);
                  }
                }
              );
          }
        }
      );

    // profile.watchlist = await watchlist;

    // console.log(profile);
    // profile.watchlist = watchlist;
    // const list = await db
    //   .getDB()
    //   .collection(listCollection)
    //   .findOne({ _id: mongo.ObjectID(profile.lists[0]) });
    // res.json(profile);
  } catch (error) {
    console.log(profile);
    console.log(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.post('/list/add', auth, async (req, res) => {
  try {
    // const content = req.body;
    // let addContent = {
    //   type: content.type,
    //   id: content.id,
    //   // title: content.type === 'tv' ? content.name : content.title,
    //   title: content.title,
    //   poster: content.poster_path,
    //   backdrop: content.backdrop_path,
    // };
    const payload = req.body;

    await db
      .getDB()
      .collection(listCollection)
      .updateOne(
        { _id: mongo.ObjectID(payload.listId) },
        { $addToSet: { content: payload.content } },
        (err, response) => {
          if (err) {
            console.log(err.message);
            throw err;
          } else if (response.modifiedCount === 0) {
            return res
              .status(400)
              .json({ message: 'Content already present in Watchlist' });
          } else {
            res.json({
              message: 'Content added to Watchlist',
              content: payload.content,
            });
          }
        }
      );
  } catch (error) {
    console.log('catch error', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/list/remove', auth, async (req, res) => {
  try {
    const payload = req.body;
    await db
      .getDB()
      .collection(listCollection)
      .updateOne(
        {
          userId: mongo.ObjectID(req.user.id),
          _id: mongo.ObjectID(payload.listId),
        },
        {
          $pull: {
            content: { type: payload.type },
            id: parseInt(payload.contentId),
          },
        },
        (err, response) => {
          if (err) {
            console.log(err.message);
            throw err;
          } else if (response.modifiedCount === 0) {
            return res
              .status(400)
              .json({ message: 'Content not present in Watchlist' });
          } else {
            res.json({ message: 'Content removed from Watchlist' });
          }
        }
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/rating/add', auth, async (req, res) => {
  try {
    const content = req.body;
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        { userId: mongo.ObjectID(req.user.id) },
        { $addToSet: { ratings: content } },
        (err, response) => {
          if (err) throw err;
          if (response.modifiedCount !== 1) {
            res
              .status(400)
              .json({ message: 'Content couldnt be added to Watched' });
          } else {
            res.json({
              status: 200,
              message: 'Content Added to Watched',
              content: content,
            });
          }
        }
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/rating/remove/:type/:id', auth, async (req, res) => {
  try {
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        { userId: mongo.ObjectID(req.user.id) },
        {
          $pull: {
            ratings: { id: parseInt(req.params.id), type: req.params.type },
          },
        },
        (err, response) => {
          console.log(response.modifiedCount);
          if (err) throw err;
          else if (response.modifiedCount !== 1) {
            return res
              .status(400)
              .json({ message: 'Couldnt remove content rating' });
          } else {
            return res.status(200).json({ message: 'Content rating deleted' });
          }
        }
      );
  } catch (error) {
    console.log(error);
  }
});

router.patch('/rating/update', auth, async (req, res) => {
  try {
    const content = req.body;
    console.log(content);
    // const doc = await db
    //   .getDB()
    //   .collection(profileCollection)
    //   .findOne({
    //     userId: mongo.ObjectID(req.user.id),
    //     'ratings.id': parseInt(content.id),
    //     'ratings.type': content.type,
    //   });
    // console.log(doc);
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        {
          userId: mongo.ObjectID(req.user.id),
          ratings: {
            $elemMatch: { type: content.type, id: parseInt(content.id) },
          },

          // 'ratings.type': content.type,
          // 'ratings.id': parseInt(content.id),
        },
        {
          $set: { 'ratings.$.rating': content.rating },
        },
        (err, response) => {
          if (err) throw err;
          else if (response.modifiedCount === 0) {
            // console.log(response.message.documents);
            res.status(400).json({ message: 'Could not update rating' });
          } else {
            console.log(response.documents);
            res.status(200).json({
              message: 'Rating updated succesfully',
              content: content,
            });
          }
        }
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
