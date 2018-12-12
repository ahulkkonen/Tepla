const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if (users.length > 0) {
            res.status(409).json({
                message: 'User already exists'
            })
        } else {
            // Ok, user does not exist
            // Create new
            // Hash password, if it works save user
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    // Hashing failed, return error
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    // Create new user
                    let user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });

                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch(err => {
                        console.log(err);

                        res.status(500).json({
                            error: err
                        })
                    });
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

// Login
router.post('/login', (req, res, next) => {
    // Find user by email
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        // Check if user exists
        if (users.length < 1) {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        } else {
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Invalid credentials'
                    })
                }
                
                if (result) {
                    // Create JSON web token
                    let token = jwt.sign(
                    {
                        email: users[0].email,
                        userId: users[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                    );

                    // Return OK with token
                    res.status(200).header('Authorization', "Bearer " + token).json({
                        message: 'Logged in successfully'
                    })
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

// Delete user
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.id})
    .exec()
    .then(users => {
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;