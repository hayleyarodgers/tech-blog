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
		// Create new post based on request information
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
router.put('/:id', async (req, res) => {
	try {
		// Find and update post based on id and request information
		const postData = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		// Error if no post with id matching the one in the request
		if (!postData) {
			res.status(404).json({ message: 'No post found with that id.' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Delete blog post

module.exports = router;
