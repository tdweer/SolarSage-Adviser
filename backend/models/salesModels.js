const mongoose = require('mongoose')

const Schema = mongoose.Schema

const staffSchema = new Schema({
    salesid: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    clientid: {
        type: Number,
        required: true
    },

    clientname: {
        type: String,
        required: true
    },

    productinfo: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sales', staffSchema)