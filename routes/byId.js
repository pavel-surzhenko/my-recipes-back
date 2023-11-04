const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    const id = req.params.id;

    try {
        const foodData = await food.findById(id);

        if (foodData && foodData.length) {
            res.send(JSON.stringify(foodData));
        } else {
            res.status(404).json({ error: 'No object find by this id' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
