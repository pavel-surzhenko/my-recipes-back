const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    entryDate: { type: Date, default: Date.now() },
});

const Users = mongoose.model('Users', userSchema, 'users');

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

const mySchemas = { Users: Users, Food: Food };

module.exports = mySchemas;
