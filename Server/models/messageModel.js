const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  name: { type: String,
  default:"Anonymus"},
  email: { type: String },
  subject:{type:String},
  content: { type: String },
  createdAt:{type: Date,
    default: Date.now()},
  status:{
    enum:["read","unread"]
    },
  marked:{type:Boolean,
        default:false}
});

const Message = new mongoose.model("message", messageSchema);

module.exports = Message;
