const notes = require('express').Router();
const { readFromFile, readAndAppend} = require('../helpers/fsUtil');
const uuid = require('../helpers/uuid');

//retreives data from notes.json
notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);

    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
})

//adds new note object to notes.json and posts it to the stored notes
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

notes.delete('/:id', (req, res) => {
    const {id} = req.params;
})
module.exports = notes;