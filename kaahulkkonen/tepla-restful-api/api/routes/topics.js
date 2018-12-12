const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topic = require('../models/topic');
const ip = require('ip');
const checkAuth = require('../../auth/check-auth');

// GET all topics
router.get('/', (req, res, next) => {
    Topic.find({})
    .select('-__v') // only get name data and id fields, not _v
    .exec()
    .then(docs => {
        // Custom response format
        let response = {
            count: docs.length,
            topics: docs.map(doc => {
                return {
                    name: doc.name,
                    data: doc.data,
                    _id: doc._id,
                    
                    request: {
                        type: 'GET',
                        url: 'http://' + ip.address() + ':' + process.env.port || 3000 + '/topics/' + result._id
                    }
                }
            })
        }

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);

        res.status(500).json({
            message: err
        });
    });
});

// GET single topic
router.get('/:topicId', (req, res, next) => {
    let id = req.params.topicId;

    // Check if ID is of valid type
    if (mongoose.Types.ObjectId.isValid(id)) {
        Topic.findById(id)
        .exec()
        .then(doc => {
            let response = {
                name: doc.name,
                data: doc.data,
                visible: doc.visible,
                author: doc.author
            }

            if (doc) {
                res.status(200).json(response);
            } else {
                res.status(400).json({
                    message: 'Resource not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
    } else {
        res.status(500).json({
            message: 'Invalid ID'
        })
    }
});

// PATCH (update) single topic
router.patch('/:topicId', checkAuth, (req, res, next) => {
    let id = req.params.topicId;
    let operations = {};

    for (let ops of req.body) {
        operations[ops.propName] = ops.value;
    }

    Topic.update(
        {_id: id}, 
        {$set: operations}
    )
    .exec()
    .then(result => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);

        res.status(500).json({
            message: err
        })
    });
});

// DELETE single topic
router.delete('/:topicId', checkAuth, (req, res, next) => {
    let id = req.params.topicId;

    // Check if ID is of valid type
    if (mongoose.Types.ObjectId.isValid(id)) {
        Topic.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Topic deleted'
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                message: err
            })
        });
    } else {
        res.status(500).json({
            message: 'Invalid ID'
        })
    }
});

// POST creates new topic
router.post('/', checkAuth, (req, res, next) => {
    let topic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        data: req.body.data,
        visible: req.body.visible || true // visible true/false default true
    });

    topic
    .save()
    .then(result => {
        let response = {
            name: result.name,
            data: result.data,
            visible: result.visible,
            _id: result.id,
            request: {
                type: 'GET',
                url: 'http://' + ip.address() + ':' + (process.env.PORT || 3000) + '/topics/' + result._id
            }
        }

        res.status(201).json({
            message: 'New topic created',
            createdTopic: response
        });
    })
    .catch(err => {
        console.log(err);

        res.status(500).json({
            message: err
        })
    });

});

module.exports = router;