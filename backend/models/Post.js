const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String
});

const PostSchema = new mongoose.Schema({
  text: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  comments: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema);
