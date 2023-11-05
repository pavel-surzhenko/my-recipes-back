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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const food = schemas.Food;
    const id = req.params.id;

    try {
        await food.deleteOne({ _id: id });
        res.status(204).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    const food = schemas.Food;
    const { id, ...data } = req.body;

    try {
        await food.updateOne({ _id: id }, { ...data });
        res.status(200).json({ message: 'File updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
