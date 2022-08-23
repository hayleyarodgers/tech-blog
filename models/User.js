// This file creates a User table in our blog database to store information about users on the site

// Destructure Model and DataTypes from Sequelize database to make them available for use in our table creation
const { Model, DataTypes } = require('sequelize');

// Import bcrypt for hashing a user's password to keep it safe
const bcrypt = require('bcrypt');

// Create database connection
const sequelize = require('../config/connection');

// Create a new Sequelize model for users
class User extends Model {
	// Instance method to check whether a user's password attempt matches the password in the database
	checkPassword(loginPassword) {
		return bcrypt.compareSync(loginPassword, this.password);
	}
}

// Create a User table in the blog database
User.init(
	// Define the columns in the User table of the database
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isAlphanumeric: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				validatePassword() {
					if (
						!/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{10,}$/
					) {
						throw new Error(
							'The password must contain at least ten characters including at least one uppercase letter, one lowercase letter, one number and one special character.'
						);
					}
				},
			},
		},
	},
	{
		// Hooks are triggered every time the User table is updated
		hooks: {
			// Hash password ten times when a new user is created
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(
					newUserData.password,
					10
				);
				return newUserData;
			},
			// Hash password ten times when an existing user updates their password
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},
		// Link User table to database connection
		sequelize,
		// Remove `created_at` (when row created) and `updated_at` (when row updated) fields
		timestamps: false,
		// Prevent Sequelize from renaming the table
		freezeTableName: true,
		// Set the name on all attributes to the snake_case version of its name
		underscored: true,
		// Set the name used to reference the User table in other places
		modelName: 'user',
	}
);

module.exports = User;
