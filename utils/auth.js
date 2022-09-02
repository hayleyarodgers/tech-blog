/* This file contains a helper function for authentication */

// In routes that require the user to be logged in, withAuth is the first callback function
// If they're not logged in, the user is redirected to log in page
// If they are logged in, the next callback function is executed

const withAuth = (req, res, next) => {
	// If the user is not logged in, redirect the request to the login route
	if (!req.session.logged_in) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = withAuth;
