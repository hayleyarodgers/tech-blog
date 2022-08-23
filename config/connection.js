// When imported, this file allows another file to create a connection with the blog database

// Import Sequelize for working with mySQL database more easily
const Sequelize = require('sequelize');

// Load environmental variables from .env file into process.env to connect with mySQL database with hidden credentials
require('dotenv').config();

// Create a Sequelize instance to connect to the database
// If there is an existing JAWSDB server ... oherwise, create a connection ... ?
let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: 'localhost',
			dialect: 'mysql',
			port: 3306,
		}
	);
}

module.exports = sequelize;
