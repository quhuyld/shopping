const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    date : Date,
    image: String,
    sold: Number,
    discount: Number,
    description: String,
    qty: Number,
    category: {}
});

const Product = mongoose.model('Product', productSchema, 'product');
module.exports = Product