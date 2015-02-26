'use strict';


module.exports = function(app) {

  app.post('/api/test', function(req,res) {
    res.status(500).send("Implement this");
  });

  app.get('/api/test', function(req, res) {
    res.status(400).send("Nothing here");
  });

};
