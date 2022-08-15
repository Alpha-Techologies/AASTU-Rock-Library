const mongoose = require("mongoose");

const referencesSchema = new mongoose.Schema({
  description: { type: String },
  author: { type: String },
  title: { type: String },
  publicationYear: { type: Date },
  link: { type: String }
});

const References = new mongoose.model("references", referencesSchema);

module.exports = References;
