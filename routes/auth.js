const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

// "/api/auth" Endpoint

//Route 1 : POST: Create a User /createuser 
    //No Login Required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Minimum Password Length : 5').isLength({ min: 5 })
], async (req, res) => {
    try {
        // If there are errors, return Bad Request and the Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check if the Email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already Exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Create new User
        user = await User({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        }).save()

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error")
    }
})

// Route 2 : POST : Authenticate user /login
    // No Login Required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // If there are errors, return Bad Request and the Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }

}) 


// Route 3 : POST: User details /getuser
    //Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id 
        const user = await User.findById(userId).select("-password")
        return res.send(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router