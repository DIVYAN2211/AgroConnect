const express = require('express');
const router = express.Router();
const Knowledge = require('../models/Knowledge');

// GET all knowledge, optional filter by category
router.get('/', async (req, res) => {
  const category = req.query.category;
  try {
    const query = category ? { category } : {};
    const knowledgeList = await Knowledge.find(query).sort({ createdAt: -1 });
    res.json(knowledgeList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET knowledge by ID
router.get('/:id', async (req, res) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);
    if (!knowledge) return res.status(404).json({ message: 'Knowledge not found' });
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new knowledge entry
router.post('/', async (req, res) => {
  const { title, category, content, author } = req.body;
  const newKnowledge = new Knowledge({ title, category, content, author });
  try {
    const saved = await newKnowledge.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH like a knowledge entry
router.patch('/:id/like', async (req, res) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);
    if (!knowledge) return res.status(404).json({ message: 'Knowledge not found' });
    knowledge.likes += 1;
    await knowledge.save();
    res.json({ likes: knowledge.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a knowledge entry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Knowledge.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Knowledge not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
