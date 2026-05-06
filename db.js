const mongoose = require("mongoose");
require("dotenv").config();

const mongoAtlastUrl = process.env.MONGO_URL;
const compassUrl = process.env.DB_COMPASS_URI;
// console.log(mongoAtlasUrl);

// mongoose.connect(mongoAtlasUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose
  .connect(mongoAtlastUrl)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Error:", err));

const db = mongoose.connection;

// db.on("disconnected", () => {
//   console.log("Successfully disconnected to the database");
// });

// db.on("error", () => {
//   console.log("error in connecting to the database");
// });

// db.on("connected", () => {
//   console.log("Successfully connected to the database");
// });

module.exports = db;
