// When run, this file seeds the database with sample data

// Create a Sequelize instance to connect to the database
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

	//
	const users = await User.bulkCreate(userSeedData, {
		//
		individualHooks: true,
		//
		returning: true,
	});

	//
	for (const post of postSeedData) {
		//
		await Post.create({
			//
			...post,
		});
	}

	//
	for (const comment of commentSeedData) {
		//
		await Comment.create({
			//
			...comment,
		});
	}

	process.exit(0);
};

seedDatabase();
