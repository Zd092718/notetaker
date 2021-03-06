const notes = require('express').Router();
const { readAndAppend, writeToFile } = require('../helpers/fsUtil');
const uuid = require('../helpers/uuid');
let data = require('../db/notes.json');

//retreives data from notes.json
notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);

    res.json(data);
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
        data.push(newNote);
        readAndAppend(newNote, './db/notes.json');
        res.json(newNote);
    }
})

//deletes selected note from the page and the json
notes.delete('/:id', (req, res) => {
    const { id } = req.params;

    console.log(data)

    data = data.filter(p => p.id !== id);

    writeToFile('./db/notes.json', data);

    res.json(data);

})

module.exports = notes;