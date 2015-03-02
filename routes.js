'use strict';

var gameController = require('./controllers/GameController');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	console.log('yeeee buddy');
	res.status(200).send('success');
});

app.post('/game', gameController.createGame);

module.exports = app;