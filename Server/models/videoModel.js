const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
  caption: { type: String, required: [true, "A location must have a name"] },
  link: { type: String },
  path: { type: String },//might not be necessary
  size: { type: Number },
  length: { type: String },
});

const Video = new mongoose.model("video", videoSchema);

module.exports = Video;
