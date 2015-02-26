'use strict';
var express = require('express');
var app = module.exports = express();
var path = require('path');
var bodyparser = require('body-parser');

var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, '/build')));

require('./routes/test')(app);

app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/build/index.html'));
});

server.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});