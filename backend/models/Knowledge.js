const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Crop Management
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Knowledge', knowledgeSchema);
