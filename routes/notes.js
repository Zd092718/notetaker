const notes = require('express').Router();
const { readFromFile, readAndAppend} = require('../helpers/fsUtil');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);

    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            id: uuid()
        }

        readAndAppend(newNote, './db/notes.json');
        res.json(newNote)
    }
})
module.exports = notes;