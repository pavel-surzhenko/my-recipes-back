const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    const name = req.query.name;

    try {
        const regex = new RegExp(name, 'i');

        const foodData = await food.find({ name: { $regex: regex } }).exec();

        console.log(foodData);
        if (foodData && foodData.length) {
            res.status(200).json({
                data: foodData,
            });
        } else {
            res.status(200).json({ data: [], message: 'No matching food found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
