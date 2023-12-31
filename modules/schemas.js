const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        category: { type: String, required: true },
        name: { type: String, required: true },
        instruction: { type: [String], required: true },
        time: { type: String, require: true },
        ingredients: { type: [{ name: String, quantity: String, unit: String }], require: true },
        images: { type: [String] },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model('Food', foodSchema, 'food');

const mySchemas = { Food: Food };

module.exports = mySchemas;
