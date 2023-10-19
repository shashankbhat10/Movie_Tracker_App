const express = require("express");
const auth = require("../middleware/auth");
const db = require("../config/db");
// const dbo = db.getDB();
const router = express.Router();
const mongo = require("mongodb");
const { check, validationResult } = require("express-validator/check");
const { response } = require("express");
const axios = require("axios");
const config = require("config");
const moviedbBaseURI = config.get("moviedbBaseURI");
const moviedbAPIKey = config.get("moviedbAPIKey");
const profileCollection = "userProfile";
// const pc = dbo.collection(profileCollection);
const listCollection = "lists";
const statsCollection = "contentStats";

router.get("/me/watchlist", auth, async (req, res) => {
  console.log("Hello");
});

router.post("/add-to-watched", auth, async (req, res) => {
  try {
    const content = req.body;
    const dbo = db.getDB();
    const pc = dbo.collection(profileCollection);
    const sc = dbo.collection(statsCollection);
    const updateRes = await pc.updateOne(
      {
        userId: mongo.ObjectID(req.user.id),
      },
      {
        $addToSet: { watched: content },
      }
    );

    const details = await sc.findOne({
      type: content.type,
      contentId: content.id,
    });
    if (details === null) {
      const details = await axios.get(
        `${moviedbBaseURI}${content.type}/${content.id}${moviedbAPIKey}&append_to_response=credits`
      );
      const payload = {
        type: content.type,
        contentId: content.id,
        runtime:
          content.type === "movie"
            ? details.data.runtime
            : details.data.episode_run_time[0],
        genres: details.data.genres,
        credits: details.data.credits,
        title: details.data.title,
        tmdb_rating: details.data.vote_average,
      };
      const insertStatRes = await sc.insertOne(payload);
    }
    if (updateRes.modifiedCount === 1) {
      res.json({
        status: 200,
        message: "Content Added to Watched",
        content: content,
      });
    } else {
      res.json({
        status: 400,
        message: "Content already added",
        content: content,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Server Error" });
  }
});

router.delete("/remove-watched/:type/:id", auth, async (req, res) => {
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
              .json({ message: "Content not found in Watched" });
          } else {
            return res
              .status(200)
              .json({ message: "Content removed from Watched" });
          }
        }
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    await db
      .getDB()
      .collection(profileCollection)
      .findOne(
        { userId: mongo.ObjectID(req.user.id) },
        async (err, profile) => {
          if (err) {
            console.log("Profile find Error", error);
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
                      "Error finding watchlist of profile",
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
      message: "Server Error",
    });
  }
});

router.post("/list", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const pc = dbo.collection(profileCollection);
    const lc = dbo.collection(listCollection);

    const lc_find_res = await lc.findOne({
      userId: mongo.ObjectID(req.user.id),
      type: "custom",
      name: req.body.name,
    });
    if (lc_find_res !== null) {
      return res.status(400).json({ message: "List already exists" });
    }

    const lc_payload = {
      userId: mongo.ObjectID(req.user.id),
      type: "custom",
      content: [],
      name: req.body.name,
    };
    const lc_res = await lc.insertOne(lc_payload);

    const list = {
      listId: mongo.ObjectID(lc_res.insertedId),
      name: req.body.name,
      type: "custom",
    };
    const pc_res = await pc.updateOne(
      { userId: mongo.ObjectID(req.user.id) },
      {
        $push: {
          lists: list,
        },
      }
    );

    if (lc_res.insertedCount === 1 && pc_res.modifiedCount === 1) {
      return res.json({
        message: "Custom List Created",
        list: list,
      });
    }
    res.json({ message: "Could not create custom list" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/list/add", auth, async (req, res) => {
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

    // await db
    //   .getDB()
    //   .collection(listCollection)
    //   .updateOne(
    //     { _id: mongo.ObjectID(payload.listId) },
    //     { $addToSet: { content: payload.content } },
    //     (err, response) => {
    //       if (err) {
    //         console.log(err.message);
    //         throw err;
    //       } else if (response.modifiedCount === 0) {
    //         return res
    //           .status(400)
    //           .json({ message: 'Content already present in Watchlist' });
    //       } else {
    //         res.json({
    //           message: 'Content added to Watchlist',
    //           content: payload.content,
    //         });
    //       }
    //     }
    //   );

    // console.log(payload);
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    const sc = dbo.collection(statsCollection);
    const updateRes = await lc.updateOne(
      {
        _id: mongo.ObjectID(payload.listId),
      },
      {
        $addToSet: { content: payload.content },
      }
      // (err) => {
      //   if (err) {
      //     console.log(err.message);
      //     throw err;
      //   }
      // }
    );
    // console.log(updateRes);

    const details = await sc.findOne({
      type: payload.content.type,
      contentId: payload.content.id,
    });
    if (details === null) {
      const details = await axios.get(
        `${moviedbBaseURI}${payload.content.type}/${payload.content.id}${moviedbAPIKey}&append_to_response=credits`
      );
      const statsPayload = {
        type: payload.content.type,
        contentId: payload.content.id,
        runtime:
          payload.content.type === "movie"
            ? details.data.runtime
            : details.data.episode_run_time[0],
        genres: details.data.genres,
        credits: details.data.credits,
        title: details.data.title,
        tmdb_rating: details.data.vote_average,
      };
      const insertStatRes = await sc.insertOne(statsPayload);
    }
    if (updateRes.modifiedCount === 1) {
      res.json({
        status: 200,
        message: "Content added to list",
        content: payload.content,
      });
    } else {
      res.json({
        status: 400,
        message: "Content already present in list",
        // content: content,
      });
    }
  } catch (error) {
    console.log("catch error", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/list/remove", auth, async (req, res) => {
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
              .json({ message: "Content not present in Watchlist" });
          } else {
            res.json({ message: "Content removed from Watchlist" });
          }
        }
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/rating/add", auth, async (req, res) => {
  try {
    const content = req.body;
    // await db
    //   .getDB()
    //   .collection(profileCollection)
    //   .updateOne(
    //     { userId: mongo.ObjectID(req.user.id) },
    //     { $addToSet: { ratings: content } },
    //     (err, response) => {
    //       if (err) throw err;
    //       if (response.modifiedCount !== 1) {
    //         res.status(400).json({ message: 'Could not add Rating' });
    //       } else {
    //         res.json({
    //           status: 200,
    //           message: 'Rating Added Succesfully',
    //           content: content,
    //         });
    //       }
    //     }
    //   );
    const dbo = db.getDB();
    const pc = dbo.collection(profileCollection);
    const sc = dbo.collection(statsCollection);
    const updateRes = await pc.updateOne(
      {
        userId: mongo.ObjectID(req.user.id),
      },
      {
        $addToSet: { ratings: content },
      }
      // (err) => {
      //   if (err) {
      //     console.log(err.message);
      //     throw err;
      //   }
      // }
    );

    const details = await sc.findOne({
      type: content.type,
      contentId: content.id,
    });
    if (details === null) {
      const details = await axios.get(
        `${moviedbBaseURI}${content.type}/${content.id}${moviedbAPIKey}&append_to_response=credits`
      );
      const payload = {
        type: content.type,
        contentId: content.id,
        runtime:
          content.type === "movie"
            ? details.data.runtime
            : details.data.episode_run_time[0],
        genres: details.data.genres,
        credits: details.data.credits,
        title: details.data.title,
        tmdb_rating: details.data.vote_average,
      };
      const insertStatRes = await sc.insertOne(payload);
    }
    if (updateRes.modifiedCount === 1) {
      res.json({
        status: 200,
        message: "Rating Added Succesfully",
        content: content,
      });
    } else {
      res.json({
        status: 400,
        message: "Could not add Rating",
        content: content,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/rating/remove/:type/:id", auth, async (req, res) => {
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
          if (err) throw err;
          else if (response.modifiedCount !== 1) {
            return res
              .status(400)
              .json({ message: "Couldnt remove content rating" });
          } else {
            return res.status(200).json({ message: "Content rating deleted" });
          }
        }
      );
  } catch (error) {
    console.log(error);
  }
});

router.patch("/rating/update", auth, async (req, res) => {
  try {
    const content = req.body;
    await db
      .getDB()
      .collection(profileCollection)
      .updateOne(
        {
          userId: mongo.ObjectID(req.user.id),
          ratings: {
            $elemMatch: { type: content.type, id: parseInt(content.id) },
          },
        },
        {
          $set: { "ratings.$.rating": content.rating },
        },
        (err, response) => {
          if (err) throw err;
          else if (response.modifiedCount === 0) {
            res.status(400).json({ message: "Could not update rating" });
          } else {
            res.status(200).json({
              message: "Rating updated succesfully",
              content: content,
            });
          }
        }
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/list/:id", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    const list = await lc.findOne({ _id: mongo.ObjectID(req.params.id) });

    if (list === null) {
      return res.status(400).json({ message: "List does not exist" });
    }
    res.json({ message: "List data retrieved", list: list });
  } catch (error) {
    console.log(error);
  }
});

router.get("/stats", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const sc = dbo.collection(statsCollection);
    const pc = dbo.collection(profileCollection);
    const lc = dbo.collection(listCollection);

    const profile = await pc.findOne({ userId: mongo.ObjectID(req.user.id) });

    const watched = profile.watched;
    const lists = profile.lists;
    const ratings = profile.ratings;
    const reviews = profile.reviews;

    let contentFilter = { movie: [], tv: [] };

    watched.forEach((item) => {
      if (!contentFilter[item.type].includes(item.id)) {
        contentFilter[item.type].push(item.id);
      }
    });

    ratings.forEach((item) => {
      if (!contentFilter[item.type].includes(item.id)) {
        contentFilter[item.type].push(item.id);
      }
    });

    reviews.forEach((item) => {
      if (!contentFilter[item.type].includes(item.id)) {
        contentFilter[item.type].push(item.id);
      }
    });

    let listsData = await lc
      .find({
        userId: mongo.ObjectID(req.user.id),
      })
      .toArray();

    listsData = listsData
      .filter((item) => item.content.length !== 0)
      .map((item) => item.content);

    listsData.forEach((item) => {
      item.forEach((data) => {
        if (!contentFilter[data.type].includes(data.id)) {
          contentFilter[data.type].push(data.id);
        }
      });
    });

    // console.log(contentFilter.movie);
    const movieData = await sc
      .find({
        type: "movie",
        contentId: { $in: contentFilter.movie },
      })
      .toArray();

    const tvData = await sc
      .find({
        type: "tv",
        contentId: { $in: contentFilter.tv },
      })
      .toArray();

    const payload = {
      movie: movieData,
      tv: tvData,
    };
    // listsData.forEach((item) => {
    //   console.log(item);
    // });
    // console.log('1');
    // // const list = [];
    // const list = listsData.filter((item) => item.content.length !== 0);

    // // list.map(item => {return })
    // console.log('out');
    // console.log(movieData.length);

    res.json({
      message: "Data for stats retrieved succesfully",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/customListsData", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    const lists = await lc
      .find({ userId: mongo.ObjectID(req.user.id), type: "custom" })
      .project({ userId: 0, type: 0 })
      .toArray();

    res.json({ message: "Custom list data retrieved", listData: lists });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/clearListContent/:listId/:type", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    let response = null;
    // console.log(req.params.type);
    response = await lc.findOneAndUpdate(
      { _id: mongo.ObjectID(req.params.listId) },
      { $pull: { content: { type: req.params.type } } },
      { returnOriginal: false },
      (err, updatedDoc) => {
        if (err) throw err;
        res.json({
          message: `All ${
            req.params.type === "movie" ? "Movies" : "TV Shows"
          } cleared`,
          payload: updatedDoc.value,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while clearing contents" });
  }
});

router.delete("/clearAllListContent/:listId", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    let response = null;
    await lc
      .findOneAndUpdate(
        { _id: mongo.ObjectID(req.params.listId) },
        { $set: { content: [] } },
        { returnOriginal: false }
      )
      .then((updatedDoc) => {
        res.json({ message: "All Content cleared", payload: updatedDoc.value });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while clearing contents" });
  }
});

router.delete("/list/:listId", auth, async (req, res) => {
  try {
    const dbo = db.getDB();
    const lc = dbo.collection(listCollection);
    const pc = dbo.collection(profileCollection);

    // let payload = null;
    // throw err;
    await pc.findOneAndUpdate(
      { userId: mongo.ObjectID(req.user.id) },
      { $pull: { lists: mongo.ObjectID(req.params.listId) } },
      async (err, updatedDoc) => {
        if (err) throw err;
        if (updatedDoc.modifiedCount === 0) {
          res.status(400).json({ message: "List not found" });
        } else {
          // payload['customLists'] = updatedDoc.value;
          await lc.deleteOne(
            { _id: mongo.ObjectID(req.params.listId) },
            (err, result) => {
              if (err) throw err;
              console.log(result);
              res.json({
                message: "List Deleted Succesfully",
                payload: updatedDoc.value,
              });
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while deleting list" });
  }
});

module.exports = router;
