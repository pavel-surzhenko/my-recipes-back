const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.find({ category: 'desserts' });

        if (foodData && foodData.length) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'No desserts find' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
