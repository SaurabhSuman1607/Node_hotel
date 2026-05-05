const mongoose = require("mongoose");
require("dotenv").config();

const mongoAtlasUrl = process.env.MONGO_URI;

mongoose.connect(mongoAtlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("Successfully disconnected to the database");
});

db.on("error", () => {
  console.log("error in connecting to the database");
});

db.on("connected", () => {
  console.log("Successfully connected to the database");
});

module.exports = db;
