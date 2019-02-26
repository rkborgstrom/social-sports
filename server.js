'use strict';

const bodyParser = require('body-parser');
const config = require('./knexfile.js')['development'];
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const knex = require('knex')(config);
const morgan = require('morgan');
const index = require('./routes/index');
const post = require('./routes/post');

app.set('view engine', 'ejs');

app.disable('x-powered-by');
app.use(morgan('short'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.render('index', {bettors: []});
})

app.use('/index', index);
app.use(post);

app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;
