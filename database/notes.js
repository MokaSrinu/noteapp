const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: String,
    note: String,
    label: String,
    user: {  
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Note = mongoose.model('Note', notesSchema)

module.exports = Note;