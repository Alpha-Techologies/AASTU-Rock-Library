const mongoose = require("mongoose");

const editHistorySchema = new mongoose.Schema({
  editedBy: {type: String},
  date:{
    type: Date,
    default: Date.now(),
},
  reason:{
    what:{type: String},
    why:{type:String}},
});

const EditHistory = new mongoose.model("editHistory", editHistorySchema);

module.exports = EditHistory;
