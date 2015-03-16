'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(app){
    fs
    .readdirSync(path.join(__dirname,"/schema"))
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = app.db.sequelize.import(path.join(__dirname,"schema", file));
        app.db.models[model.name] = model;
    });

    ['Game', 'User', 'Player'].forEach(function(modelName) {
        if ('associate' in app.db.models[modelName]) {
            app.db.models[modelName].associate(app.db.models);
            app.db.models[modelName].sync().then(function() {console.log("Synced ", modelName)});
        } 
    });

    app.db.models.User.create({
        firstName: 'Ahmed',
        lastName: 'Jafri'
    });
    app.db.models.User.create({
            firstName: 'Paul',
            lastName: 'Yi'
        });
    app.db.models.User.create({
            firstName: 'Taiga',
            lastName: 'Matsumoto'
        });
    app.db.models.User.create({
            firstName: 'Vien',
            lastName: 'Ly'
        });
    app.db.models.User.create({
            firstName: 'Jake',
            lastName: 'Yang'
        });
};