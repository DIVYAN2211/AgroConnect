const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// GET all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// POST a new post
router.post("/", upload.single("image"), async (req, res) => {
  const { text, username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  const image = req.file ? `/uploads/${req.file.filename}` : "";
  const post = await Post.create({ 
    text, 
    image,
    username,
    userId: req.body.userId // Optional: if you want to store user ID
  });
  res.json(post);
});

// POST a comment
router.post("/:id/comment", async (req, res) => {
  const { text, username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  const post = await Post.findById(req.params.id);
  post.comments.push({ 
    text,
    username,
    userId: req.body.userId // Optional: if you want to store user ID
  });
  await post.save();
  res.json(post);
});

// DELETE /posts/:id
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  // Optional: Add authorization check here
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

// DELETE /posts/:postId/comment/:commentIndex
router.delete("/:postId/comment/:commentIndex", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  // Optional: Add authorization check here
  post.comments.splice(req.params.commentIndex, 1);
  await post.save();
  res.json({ message: "Comment deleted" });
});

module.exports = router;
