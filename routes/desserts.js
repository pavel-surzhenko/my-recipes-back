const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    const food = schemas.Food;
    const { sort, page } = req.query;
    const itemsPerPage = 12;

    try {
        const totalItems = await food.countDocuments({ category: 'desserts' });
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
        const foodData = await food
            .find({ category: 'desserts' })
            .sort(sortOptions)
            .skip(skip)
            .limit(itemsPerPage)
            .exec();

        if (foodData && foodData.length) {
            res.status(200).json({
                data: foodData,
                page,
                totalPages: Math.ceil(totalItems / itemsPerPage),
            });
        } else {
            res.status(404).json({ error: 'No desserts find' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
