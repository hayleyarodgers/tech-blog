// This file contains all routes related to reading and viewing data from the blog database

//
const router = require('express').Router();

// Import models
const { User, Post, Comment } = require('../models');

// Import authorisation helper function
const withAuth = require('../utils/auth');

// View homepage showing all blog posts
router.get('/', async (req, res) => {
	try {
		// Get all blog posts
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		// Serialise postData into a plain object so handlebars template can read it
		const posts = postData.map((post) => post.get({ plain: true }));

		// Pass serialised data into handlebars template
		res.render('homepage', {
			posts,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// View blog post

// View dashboard containing list of blog posts submitted by logged in user

// View log in page

// View sign in page

module.exports = router;
