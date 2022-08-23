// This file contains all routes related to posts in the blog database

//
const router = require('express').Router();

// Import Post model
const { Post } = require('../../models');

// Import authentication helper function
const withAuth = require('../../utils/auth');

// Create new blog post
router.post('/', withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newPost);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Update blog post

// Delete blog post

module.exports = router;
