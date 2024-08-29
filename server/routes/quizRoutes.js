const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/questions', async (req, res) => {
    const { category, difficulty } = req.query;
    try {
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
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});

module.exports = router;
