'use strict';

var app = require('./routes');
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

require('./models')(app);

app.drywall.useDB(app.db);
app.use(app.drywall);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server running on port: %d', port);
});

module.exports = app;