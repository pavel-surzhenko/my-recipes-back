const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;

    try {
        const foodData = await food.aggregate([
            { $match: { category: 'salads' } },
            { $sample: { size: 1 } },
        ]);

        if (foodData.length) {
            const randomFoodObject = foodData[0];
            res.send(JSON.stringify(randomFoodObject));
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
