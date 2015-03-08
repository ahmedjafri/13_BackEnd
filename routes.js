'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var gameController = require('./controllers/gameController');

app.get('/', function(req, res) {
	console.log('yeeee buddy');
	res.status(200).send('success');
});

app.post('/game', gameController.createGame);
app.get('/game/:id', gameController.getGame);

module.exports = app;