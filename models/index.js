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
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.sync({force: true})
    .then(function() {
        User.create({
            firstName: 'Ahmed',
            lastName: 'Jafri'
        }).then(function () {
            return User.create({
                firstName: 'Paul',
                lastName: 'Yi'
            });
        }).then(function () {
            return User.create({
                firstName: 'Taiga',
                lastName: 'Matsumoto'
            });
        }).then(function () {
            return User.create({
                firstName: 'Vien',
                lastName: 'Ly'
            });
        }).then(function () {
            return User.create({
                firstName: 'Jake',
                lastName: 'Yang'
            });
        });
    });

module.exports = db;