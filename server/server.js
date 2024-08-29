const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const quizRoutes = require('./routes/quizRoutes'); // Ensure path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/quiz', quizRoutes);

// Serve React application
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
