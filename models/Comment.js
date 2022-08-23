// Destructure Model and DataTypes from Sequelize database to make them available for use in our table creation
const { Model, DataTypes } = require('sequelize');

// Create database connection
const sequelize = require('../config/connection');

// Create a new Sequelize model for comments on blog posts
class Comment extends Model {}

// Create a Comment table in the blog database
Comment.init(
	// Define the columns in the Comment table of the database
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment: {
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
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'post',
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

module.exports = Comment;
