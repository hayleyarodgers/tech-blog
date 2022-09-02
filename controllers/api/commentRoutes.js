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

// Export router module
module.exports = router;
