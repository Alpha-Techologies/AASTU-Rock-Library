const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A location must have a name"] },
  coordinates: { type: String },
  city: { type: String },
  region: { type: String },
});

const Location = new mongoose.model("location", locationSchema);

module.exports = Location;
