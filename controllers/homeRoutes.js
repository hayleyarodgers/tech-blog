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
		res.render('homepage', { posts });
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
					attributes: ['id', 'username'],
				},
				{
					model: Comment,
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
		res.render('dashboard', { user });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// View add post page
router.get('/addpost', (req, res) => {
	res.render('addPost');
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
		res.render('updatePost', { post });
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
