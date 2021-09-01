const notes = require('express').Router();
const { readFromFile, readAndAppend} = require('../helpers/fsUtil');

notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

module.exports = notes;