// server.js

require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());

// ✅ CORS configuration for multiple allowed origins
const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI);
let usersCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db('agri_project');
    usersCollection = db.collection('users');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

// ✅ Register route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role,
  };

  await usersCollection.insertOne(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  res.status(200).json({
    message: `Login successful as ${user.role}`,
    name: user.name,
    role: user.role
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});
