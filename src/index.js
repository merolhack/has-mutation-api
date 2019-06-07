// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const hasMutation = require('./functions/has-mutation');
const getWholePercent = require('./functions/ratio');
const Validation = require('./models/validation');

const app = express();
const port = 80;
// parse application/json
app.use(bodyParser.json());

// Set up mongoose connection
const USER = process.env.MDB_USER;
const PASS = process.env.MDB_PASS;
const HOST = process.env.MDB_HOST;
const NAME = process.env.MDB_NAME;
const DB_URI = `mongodb+srv://${USER}:${PASS}@${HOST}/${NAME}?retryWrites=true&w=majority`;
mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Mutant REST API!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/mutation', function (req, res) {
    let responseObject = {
        message: 'You are a Human!! :-D'
    };
    if (typeof req.body.dna !== 'undefined') {
        const dna = req.body.dna;
        if (hasMutation(dna)) {
            responseObject.message = 'You are Mutant!! :-O';
            let validation = new Validation({ type: 'mutant' });
            validation.save(function (err) {
                if (err) return next(err);
            });
            res.send(responseObject);
        } else {
            let validation = new Validation({ type: 'human' });
            validation.save(function (err) {
                if (err) return next(err);
            });
            res.status(403).send(responseObject);
        }
    } else {
        responseObject.message = 'Include a DNA in your request!';
        let validation = new Validation({ type: 'unknown' });
        validation.save(function (err) {
            if (err) return next(err);
        });
        res.status(403).send(responseObject);
    }
});
app.get('/stats', function (req, res) {
    let humanCount = 0;
    let mutantCount = 0;
    Validation.countDocuments({ type: 'human' }, function (err, count) {
        humanCount = count;
        Validation.countDocuments({ type: 'mutant' }, function (err, count) {
            mutantCount = count;

            let responseObject = {
                count_mutations: mutantCount,
                count_no_mutation: humanCount,
                ratio: getWholePercent(mutantCount,humanCount)
            };
            res.send(responseObject);
        });
    });
});

module.exports = app
