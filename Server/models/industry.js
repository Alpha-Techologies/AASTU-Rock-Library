const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema({
  name: {type: String},
  use:[{type: String}]
});

const Industry = new mongoose.model("industry", industrySchema);

module.exports = Industry;
