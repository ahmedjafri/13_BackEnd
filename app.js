'use strict';

var express = require('express');
var app = express();
app.drywall = require('drywall');
var Sequelize = require('sequelize');

app.db = {models:[]};

app.db.sequelize = new Sequelize('thirteen', 'thirteen', 'ZPMKZ82fhNjXDD78', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
app.db.Sequelize = Sequelize;

app.drywall.useDB(app.db);
app.use(app.drywall);

require('./models')(app);

require('./routes')(app);


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server running on port: %d', port);
});

module.exports = app;