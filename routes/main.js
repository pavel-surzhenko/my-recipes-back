const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.find({ category: 'main' });

        if (foodData) {
            res.send(JSON.stringify(foodData));
        }
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

module.exports = router;
