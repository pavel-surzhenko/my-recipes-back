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

// main
router.get('/food/main', async (req, res) => {
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

// salads
router.get('/food/salads', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.find({ category: 'salads' });

        if (foodData) {
            res.send(JSON.stringify(foodData));
        }
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

// deserts
router.get('/food/deserts', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.find({ category: 'deserts' });

        if (foodData) {
            res.send(JSON.stringify(foodData));
        }
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

module.exports = router;
