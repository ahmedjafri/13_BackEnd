'use strict';

var app = require('./routes');
var Sequelize = require('sequelize');
var port = process.env.PORT || 3000;


app.listen(port, function() {
  console.log('server running on port: %d', port);
});

var sequelize = new Sequelize('thirteen', 'thirteen', 'ZPMKZ82fhNjXDD78', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var User = require("./models/Users")(sequelize);

module.exports = app;