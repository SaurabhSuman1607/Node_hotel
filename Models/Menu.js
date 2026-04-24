const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingrediants: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    Default: 0,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
