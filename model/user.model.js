const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    address: String,
    password: String,
    phone: String,
    fullname: String,
    permission: {}
});

const User = mongoose.model('User', userSchema, 'user');
module.exports = User