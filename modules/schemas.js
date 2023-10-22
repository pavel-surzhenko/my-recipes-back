const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        category: { type: String, required: true },
        name: { type: String, required: true },
        instruction: { type: [String], required: true },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model('Food', foodSchema, 'food');

const mySchemas = { Food: Food };

module.exports = mySchemas;
