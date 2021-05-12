const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
    date: Date,
    customer: {},
    total: Number,
    details: []
});

const Order = mongoose.model('Order', orderSchema, 'order');
module.exports = Order