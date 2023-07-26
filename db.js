const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/inotebook";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
  }
};

module.exports = connectToMongo;
