// This file contains all routes related to reading and viewing data from the blog database

//
const router = require('express').Router();

// Import models
const { User, Post, Comment } = require('../models');

// Import authentication helper function
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
		res.render('homepage', { posts });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View blog post
// withAuth helper function is run first; if not logged in the user is redirected to log in page
router.get('/post/:id', withAuth, async (req, res) => {
	try {
		// Get blog post based on id
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		// Serialise postData into a plain object so handlebars template can read it
		const post = postData.get({ plain: true });

		// Pass serialised data into handlebars template
		res.render('post', { post, logged_in: true });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View dashboard containing list of blog posts submitted by logged in user
// withAuth helper function is run first; if not logged in the user is redirected to log in page
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		// Find logged in user based on session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: Post,
				},
			],
		});

		// Serialise userData into a plain object so handlebars template can read it
		const user = userData.get({ plain: true });

		// Pass serialised data into handlebars template
		res.render('dashboard', { user, logged_in: true });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View log in page

// View sign in page

module.exports = router;
