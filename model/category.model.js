const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String
});

const Category = mongoose.model('Category', categorySchema, 'category');
module.exports = Category