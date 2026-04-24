const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    required: true,
  },

  work: {
    type: String,
    enum: ["Chef", "Manager", "Waiter"],
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
