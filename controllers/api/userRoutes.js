const router = require('express').Router();

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
			where: { email: req.body.email },
		});

		// Error if no user with email matching the one in the request
		if (!userData) {
			res.status(400).json({
				message: 'Incorrect email, please try again.',
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

module.exports = router;
