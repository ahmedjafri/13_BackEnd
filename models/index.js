'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('thirteen', 'thirteen', 'ZPMKZ82fhNjXDD78', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
        db[modelName].sync().then(function() {console.log("Synced ", modelName)});
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.create({
    firstName: 'Ahmed',
    lastName: 'Jafri'
});
db.User.create({
        firstName: 'Paul',
        lastName: 'Yi'
    });
db.User.create({
        firstName: 'Taiga',
        lastName: 'Matsumoto'
    });
db.User.create({
        firstName: 'Vien',
        lastName: 'Ly'
    });
db.User.create({
        firstName: 'Jake',
        lastName: 'Yang'
    });

module.exports = db;