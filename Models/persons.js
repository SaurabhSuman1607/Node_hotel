const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  username: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  // if something other than pasword is modified
  if (!person.isModified("password")) return;

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //Override the plain password with the hashed one
    person.password = hashedPassword;
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (err) {
    throw err;
  }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
