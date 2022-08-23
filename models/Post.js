// This file creates a Post table in our blog database to store information about posts made on the site

// Destructure Model and DataTypes from Sequelize database to make them available for use in our table creation
const { Model, DataTypes } = require('sequelize');

// Create database connection
const sequelize = require('../config/connection');

// Create a new Sequelize model for blog posts
class Post extends Model {}

// Create a Post table in the blog database
Post.init(
	// Define the columns in the Post table of the database
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		// Link User table to database connection
		sequelize,
		// Remove `created_at` (when row created) and `updated_at` (when row updated) fields
		timestamps: false,
		// Prevent Sequelize from renaming the table
		freezeTableName: true,
		// Set the name on all attributes to the snake_case version of its name
		underscored: true,
		// Set the name used to reference the User table in other places
		modelName: 'post',
	}
);

module.exports = Post;
