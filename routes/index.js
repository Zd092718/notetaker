const express = require('express');
//Imports notes router
const  notesRouter = require('./notes');

const app = express();

//associates notes endpoint with notesRouter
app.use('/notes', notesRouter);

module.exports = app;