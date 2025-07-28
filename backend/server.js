require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const orderRoutes = require("./routes/order");
const knowledgeRoutes = require("./routes/KnowledgeRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // For images if needed

// Routes
app.use("/posts", postRoutes);
app.use("/api", orderRoutes);
app.use("/api/knowledge", knowledgeRoutes); // Mounted as /api/knowledge

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.error(err));
