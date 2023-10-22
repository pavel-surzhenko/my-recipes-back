const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/users', async (req, res) => {
    const users = schemas.Users;

    const userData = await users.find().exec();

    if (userData) {
        res.send(JSON.stringify(userData));
    }
});

router.post('/users', async (req, res) => {
    const { email, name } = req.body;

    const newUser = new schemas.Users({ email, name });
    const savedUser = await newUser.save();

    if (savedUser) {
        res.send('Message send');
    }

    res.end();
});

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

module.exports = router;
