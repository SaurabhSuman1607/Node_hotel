const mongoose = require("mongoose");

const mongoURL = "mongodb://Localhost:27017/hosts";

mongoose.connect(mongoURL, {
  // Removed deprecated options
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
