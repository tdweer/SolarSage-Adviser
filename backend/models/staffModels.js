const mongoose = require('mongoose')

const Schema = mongoose.Schema  

const staffSchema = new Schema({
    staffid: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    contact: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Staff', staffSchema)