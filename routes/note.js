const express = require('express');
const { createNote, updateNote, deleteNote,getNoteOfUser } = require('../handlers/note');
const auth = require('./middlewares/auth');

const noteRouter = express.Router()

noteRouter.get('/notes',auth, getNoteOfUser);
noteRouter.post('/notes',auth, createNote);
noteRouter.patch('/notes/:id',auth, updateNote);
noteRouter.delete('/notes/:id',auth, deleteNote);

module.exports = noteRouter;