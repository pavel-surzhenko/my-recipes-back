const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    try {
        const foodData = await food.find().exec();

        if (foodData) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { category, name, instruction, time, ingredients, images } = req.body;

    try {
        const newFood = new schemas.Food({
            category,
            name,
            instruction,
            time,
            ingredients,
            images,
        });
        const savedFood = await newFood.save();

        if (savedFood) {
            res.send('Food saved');
        } else {
            res.status(404).json({ error: 'Not saved' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

    res.end();
});

router.get('/:id', async (req, res) => {
    const food = schemas.Food;
    const id = req.params.id;

    try {
        const foodData = await food.findById(id);

        if (foodData) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
