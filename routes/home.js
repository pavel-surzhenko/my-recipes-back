const express = require('express');
const router = express.Router();
const schemas = require('../modules/schemas');

router.get('/', async (req, res) => {
    res.send(JSON.stringify('hi'));
});

module.exports = router;
