const express = require('express')
const router = express.Router()
const Note = require('../models/Note.js')
const { body } = require('express-validator')
const fetchuser = require('../middleware/fetchuser.js')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

// "/api/notes" Endpoint

//Route 1 : POST : Create a Note /createnote
    //Login Required
router.post('/createnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

// Route 2 : GET : Get all Notes using /fetchallnotes
    //Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note)
    }
    catch (err) {
        console.log(err)
    }
})


// Route 3 :PUT:  Updating Note : /updatenote/:id
    //Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //Checking if user is the otnwer of the note
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized")
        }
        //Finding note to be updated
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({note});

    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})


// Route 4 :DELETE: Deleting Note /deletenote/:id
    //Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Checking if user is the otnwer of the note
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized")
        }
        //Finding note to be updated
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note});
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router