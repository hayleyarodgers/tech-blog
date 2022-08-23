const router = require('express').Router();

const { User } = require('../../models');

// Sign up to create new user account
router.post('/', async (req, res) => {
	try {
		// Create new user based on request information
		const userData = await User.create(req.body);

		// Save user information in session data to be accessed in other places, eg authentication
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

// Log out

module.exports = router;
