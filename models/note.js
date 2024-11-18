const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/notesApp')

const noteSchema = mongoose.Schema({
    title: String,
    details: String
})

module.exports = mongoose.model('note', noteSchema)