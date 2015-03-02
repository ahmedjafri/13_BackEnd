var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var User = sequelize.define('user', {
	  firstName: {
	    type: Sequelize.STRING,
	    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
	  },
	  lastName: {
	    type: Sequelize.STRING
	  }
	}, {
	  freezeTableName: true // Model tableName will be the same as the model name
	});

	User.sync({force: true}).then(function () {
	  // Table created
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

	return User;
}

