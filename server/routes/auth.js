const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1: Create a user using POST '/api/auth/createuser' doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name.').isLength({min:3}),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'The password should be atleast 6 characters.').isLength({min: 6})
], async (req,res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    try {
        //creating secure password with hash and salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //creating user
        const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.status(201).json({success, auth_token});
    } catch(err) {
        if (err.code === 11000) {
            success = false;
            return res.status(400).json({success, error: 'Email already exists' });
        }
        console.error(err);
        res.status(500).send('Server error');
    }
});

//ROUTE 2: login a user
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank.').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success, error: "Enter correct credentials."});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({success, error: "Enter correct credentials."});
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, auth_token});
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

//ROUTE 3: get logged in user details using post - login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user)
    } catch(err) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;