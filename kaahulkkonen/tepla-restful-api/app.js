// 3rd party imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const connection = require('./connection');
const mongoose = require('mongoose');

// Routes
const topicsRoutes = require('./api/routes/topics');
const loginRoutes = require('./api/routes/user');

// MongoDB
mongoose.connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@tepla-i17xx.mongodb.net/test?retryWrites=true", {
    useNewUrlParser: true
}).catch(err => {
    console.log("Failed to connect to MongoDB:\n" + err)
});

// Dev output - TODO: CHANGE TO PRODUCTION
app.use(morgan('dev'));

// Allow CORS-header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // What OPTIONS do we serve?
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

        return res.status(200).json({}); // Empty response
    }

    next();
});

// Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Topics route
app.use('/topics', topicsRoutes);

// Login route
app.use('/user', loginRoutes);

// If none of the above work, error -> gets forwarded to error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;