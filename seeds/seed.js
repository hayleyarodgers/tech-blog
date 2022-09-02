/* When run, this file seeds the database with sample data */

// Import the database connection object
const sequelize = require('../config/connection');

// Import models
const { User, Post, Comment } = require('../models');

// Import sample data
const userSeedData = require('./userData.json');
const postSeedData = require('./postData.json');
const commentSeedData = require('./commentData.json');

// Seed database
const seedDatabase = async () => {
	// Creates the connection, dropping it first if it already existed
	await sequelize.sync({ force: true });

	await User.bulkCreate(userSeedData, {
		individualHooks: true,
		returning: true,
	});

	await Post.bulkCreate(postSeedData);

	await Comment.bulkCreate(commentSeedData);

	process.exit(0);
};

seedDatabase();
