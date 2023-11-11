const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    const { sort, page } = req.query;
    const itemsPerPage = 12;

    try {
        const totalItems = await food.countDocuments();
        const skip = (page - 1) * itemsPerPage;
        let sortOptions = {};

        switch (sort) {
            case 'date_desc':
                sortOptions = { updatedAt: -1 };
                break;
            case 'date_asc':
                sortOptions = { updatedAt: 1 };
                break;
            case 'name_asc':
                sortOptions = { name: 1 };
                break;
            case 'name_desc':
                sortOptions = { name: -1 };
                break;
            default:
                sortOptions = {};
                break;
        }
        const foodData = await food.find().sort(sortOptions).skip(skip).limit(itemsPerPage).exec();

        if (foodData) {
            res.status(200).json({
                data: foodData,
                page,
                totalPages: Math.ceil(totalItems / itemsPerPage),
            });
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
            res.status(201).json({ message: 'Food created', id: savedFood._id });
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
