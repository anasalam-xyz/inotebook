const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');
const {body, validationResult} = require('express-validator');

//ROUTE 1: get all the notes for a user using GET request
router.get('/all-notes', fetchuser, async (req,res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch(error) {
        res.status(500).send('Internal server error');
    }
});

//ROUTE 2: add new note using POST: login required
router.post('/new-note', fetchuser, [
    body('description', 'Write something...').notEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error) {
        res.status(500).send('Internal server error');
    }
});

//ROUTE 3: update an existing note PUT: login required
router.put('/edit-note/:id', fetchuser, async (req,res) => {
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title) newNote.title=title;
        if(description) newNote.description=description;
        if(tag) newNote.tag=tag;
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send('Not Found!');
        if(note.user.toString()!== req.user.id) return res.status(401).send('Unauthorized Access!');
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
    } catch(error) {
        res.status(500).send('Internal server error');
    }
});

//ROUTE 4: delete an existing note DELETE: login required
router.delete('/delete-note/:id', fetchuser, async (req,res) => {
    try {
        //finding the note
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send('Not Found!');
        //delete note if its of the correct user
        if(note.user.toString()!== req.user.id) return res.status(401).send('Unauthorized Access!');
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.json({"Success": "Note has been deleted."});
    } catch(error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;