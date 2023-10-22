const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

// All food
router.get('/food', async (req, res) => {
    const food = schemas.Food;

    const foodData = await food.find().exec();

    if (foodData) {
        res.send(JSON.stringify(foodData));
    }
});

router.post('/food', async (req, res) => {
    const { category, name, instruction } = req.body;

    const newFood = new schemas.Food({ category, name, instruction });
    const savedFood = await newFood.save();

    if (savedFood) {
        res.send('Food saved');
    }

    res.end();
});

// soup
router.get('/food/soups', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.find({ category: 'soups' });

        if (foodData) {
            res.send(JSON.stringify(foodData));
        }
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

module.exports = router;
