const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    const { sort } = req.query;

    try {
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

        const foodData = await food.find({ category: 'salads' }).sort(sortOptions);

        if (foodData && foodData.length) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'No salads found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
