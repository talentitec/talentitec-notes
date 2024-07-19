const express = require('express');
const routes = express.Router();

// Importando Controllers
const Notes = require('./src/controller/notesController');
const CheckNotes = require('./src/controller/checkNotesController');

// Importando Middlewares
const ValidateTokenMiddleware = require('./src/middleware/validateTokenMiddleware');

// Middlewares coletico
routes.use(ValidateTokenMiddleware);

// Routes
routes.delete('/note/:id', Notes.destroy);
routes.put('/note/:id', Notes.update);
routes.post('/note', Notes.store);
routes.get('/note', Notes.index);

routes.put('/check_note/:id', CheckNotes.update);

module.exports = routes;