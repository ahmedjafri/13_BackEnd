'use strict';

var app = require('./routes');

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server running on port: %d', port);
});

module.exports = app;