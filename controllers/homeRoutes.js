// This file contains all routes related to reading and viewing data from the blog database

// Import express and create a new router module
const router = require('express').Router();

// Import models
const { User, Post, Comment } = require('../models');

// Import authentication helper function
const withAuth = require('../utils/auth');

// View homepage showing all blog posts
router.get('/', async (req, res) => {
	try {
		// Get all blog posts and join with user data
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['id', 'username'],
				},
			],
		});

		// Serialise postData into a plain object so handlebars template can read it
		const posts = postData.map((post) => post.get({ plain: true }));

		// Pass serialised data into handlebars template
		res.render('homepage', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View blog post
router.get('/post/:id', withAuth, async (req, res) => {
	try {
		// Get blog post based on id
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					exclude: ['password'],
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							exclude: ['password'],
						},
					],
				},
			],
		});

		if (!postData) {
			res.status(404).json({ message: 'No post found with that id.' });
			return;
		}

		// Serialise postData into a plain object so handlebars template can read it
		const post = postData.get({ plain: true });

		// Pass serialised data into handlebars template
		res.render('post', {
			...post,
			logged_in: req.session.logged_in,
			post_user_id: postData.id,
			current_user_id: req.session.user_id,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View dashboard containing list of blog posts submitted by logged in user
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
					attributes: ['title', 'date_created'],
				},
			],
		});

		// Serialise userData into a plain object so handlebars template can read it
		const user = userData.get({ plain: true });

		// Pass serialised data into handlebars template
		res.render('dashboard', {
			...user,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View add post page
router.get('/addpost', (req, res) => {
	res.render('addPost', {
		logged_in: req.session.logged_in,
	});
});

// View and update blog post
router.get('/updatepost/:id', withAuth, async (req, res) => {
	try {
		// Get blog post based on id
		const postData = await Post.findByPk(req.params.id);

		if (!postData) {
			res.status(404).json({ message: 'No post found with that id.' });
			return;
		}

		// Serialise postData into a plain object so handlebars template can read it
		const post = postData.get({ plain: true });

		// Pass serialised data into handlebars template
		res.render('updatePost', {
			...post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View log in page
router.get('/login', (req, res) => {
	// If the user is already logged in, redirect them to their dashboard
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

// View sign up page
router.get('/signup', (req, res) => {
	res.render('signup');
});

// Export router module
module.exports = router;
