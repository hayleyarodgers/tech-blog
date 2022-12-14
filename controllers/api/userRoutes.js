/* This file contains all routes related to users in the blog database */

// Import express and create a new router module
const router = require('express').Router();

// Import User model
const { User } = require('../../models');

// Sign up to create new user account
router.post('/', async (req, res) => {
	try {
		// Create new user based on request information
		const userData = await User.create(req.body);

		// Save user information in session data to be accessed in other places, eg. authentication
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Log in to existing user account
router.post('/login', async (req, res) => {
	try {
		// Get user based on email
		const userData = await User.findOne({
			where: { username: req.body.username },
		});

		// Error if no user with username matching the one in the request
		if (!userData) {
			res.status(400).json({
				message: 'Incorrect username, please try again.',
			});
			return;
		}

		// Checks if password in request matches user's password in database
		const validPassword = await userData.checkPassword(req.body.password);

		// Error if password doesn't match one in database
		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect password, please try again.',
			});
			return;
		}

		// Save user information in session data to be accessed in other places, eg. authentication
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// Log out
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// Export router module
module.exports = router;
