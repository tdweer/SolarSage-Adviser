const mongoose = require('mongoose')
const schema = new mongoose.Schema

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    reps: {
        type: Number,
        default: 0
    },
    load: {
        type: Number,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema)

