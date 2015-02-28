'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	console.log('yeeee buddy');
	res.status(200).send('success');
});

module.exports = app;