const mongoose = require("mongoose");

const mineralSchema = new mongoose.Schema({
  name: { type: String },
  class: { type: String },
  crystal: { type: String },
});

const Mineral = new mongoose.model("mineral", mineralSchema);

module.exports = Mineral;
