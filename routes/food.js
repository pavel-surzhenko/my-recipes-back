const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;

    const foodData = await food.find().exec();

    if (foodData) {
        res.send(JSON.stringify(foodData));
    }
});

router.post('/', async (req, res) => {
    const { category, name, instruction } = req.body;

    const newFood = new schemas.Food({ category, name, instruction });
    const savedFood = await newFood.save();

    if (savedFood) {
        res.send('Food saved');
    }

    res.end();
});

router.get('/:id', async (req, res) => {
    const food = schemas.Food;
    const id = req.params.id;

    try {
        const foodData = await food.findById(id);

        if (foodData && foodData.length) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
