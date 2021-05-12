const mongoose = require('mongoose')
const { Schema } = mongoose;

const perSchema = new Schema({
    name: String
});

const Permission = mongoose.model('Permission', perSchema, 'permission');
module.exports = Permission