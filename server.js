// require express
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const uniqid = require('uniqid')
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});




app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    };
  

    notes.push(newNote);
    
    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            return res.status(500).json({err});
        }
        res.json(notes);
    });

});

app.delete('/api/notes/:id', (req,res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json'))
    let deleteNote = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
})




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});