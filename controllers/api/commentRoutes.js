/* This file contains all routes related to comments in the blog database */

// Import express and create a new router module
const router = require('express').Router();

// Import Comment model
const { Comment } = require('../../models');

// Import authentication helper function
const withAuth = require('../../utils/auth');

// Create new comment
router.post('/', withAuth, async (req, res) => {
	try {
		// Create new comment based on request information
		const newComment = await Comment.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newComment);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Update comment
router.put('/:id', withAuth, async (req, res) => {
	try {
		// Find and update comment based on id and request information
		const commentData = await Comment.update(req.body, {
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		// Error if no comment with id matching the one in the request
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with that id.' });
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Delete comment
router.delete('/:id', withAuth, async (req, res) => {
	try {
		// Find and delete comment based on id
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		// Error if no comment with id matching the one in the request
		if (!commentData) {
			res.status(404).json({ message: 'No comment found with that id.' });
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Export router module
module.exports = router;
