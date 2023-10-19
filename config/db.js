const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");
const dbName = "movie-tracker";
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
// "mongoURI": "mongodb+srv://dbUser:pass@123@cluster0.ac7n2.mongodb.net/movie-tracker?retryWrites=true&w=majority",
const state = {
  db: null,
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useFindAndModify: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });

//     console.log('MongoDB Connected');
//   } catch (err) {
//     console.error(err.message());
//     //Exit process with failure
//     process.exit(1);
//   }
// };

const connectDB = async (callback) => {
  if (state.db) {
    callback();
  } else {
    const client = new MongoClient(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect((err, client) => {
      if (err) {
        callback(err);
      } else {
        state.db = client.db(dbName);
        callback();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { connectDB, getPrimaryKey, getDB };
