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

    ['Game', 'Player'].forEach(function(modelName) {
        if ('associate' in app.db.models[modelName]) {
            app.db.models[modelName].associate(app.db.models);
            app.db.models[modelName].sync().then(function() {console.log("Synced ", modelName)});
        } 
    });

    app.db.models.User.hasMany(app.db.models.Player, {foreignKey : 'user_id'});

    var testUsers = [];
    testUsers.push({
        username: "ajafri",
        password: "lol",
        name_full: "Ahmed Jafri"
    });
    testUsers.push({
        username: "paulyi",
        password: "lol",
        name_full: "Paul Yi"
    });
    testUsers.push({
        username: "tmatsumoto",
        password: "lol",
        name_full: "Taiga Matsumoto"
    });    
    testUsers.push({
        username: "vienly",
        password: "lol",
        name_full: "Vien Ly"
    }); 

    testUsers.forEach(function(testUser){
        app.db.models.User.findAndCountAll({where: { username: testUser.username }})
        .catch(function (err) {
            console.log('exception', err);
        })
        .then(function (result) {
            if (result.count > 0) {
                console.log(testUser.username, " already taken");
            } else {
                app.db.models.User.encryptPassword(testUser.password, function(err, hash) {
                    app.db.models.User.create({username:testUser.username,password:hash,'isVerified':'yes'})
                    .catch(function (err) {
                        console.log('exception', err);
                    })
                    .then(function(user) {
                        app.db.models.Account.create({'isVerified':'yes','name_full':testUser.name_full,'user_id':user.id})
                        .catch(function (err) {
                            console.log('exception', err);
                        })
                        .then(function(account) {
                            //
                        });
                    });
                });
            }
        });
    })
};