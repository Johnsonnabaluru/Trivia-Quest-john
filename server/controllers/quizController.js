const express = require('express');
const axios = require('axios');
const router = express.Router();

// Function to fetch quiz questions
const getQuizQuestions = async (req, res) => {
  try {
    const { category = 9, difficulty = 'easy' } = req.query;  // Default values if not provided
    const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple', {
      params: {
        amount: 10,
        category,
        difficulty,
        type: 'multiple'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

// Route to handle quiz questions
router.get('/questions', getQuizQuestions);

module.exports = router;
