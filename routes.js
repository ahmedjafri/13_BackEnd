'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var gameController = require('./controllers/gameController');

app.post('/game', gameController.createGame);
app.get('/game/:id', gameController.getGame);

module.exports = app;