/* When imported, this file allows another file to create a connection with the blog database */

// Import Sequelize for working with mySQL database more easily
const Sequelize = require('sequelize');

// Load environmental variables from .env file into process.env to connect with database on localhost with hidden credentials
require('dotenv').config();

// Create a Sequelize instance to connect to the database
let sequelize;

if (process.env.JAWSDB_URL) {
	// If application is running on Heroku, connect to the database using the JAWSDB server
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	// If application is running on localhost, connect to the database in alternative way
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
