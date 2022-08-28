const signup = async (event) => {
	event.preventDefault();

	// Collect values from the sign up form
	const username = document.querySelector('#signup-username').value.trim();
	const email = document.querySelector('#signup-email').value.trim();
	const password = document.querySelector('#signup-password').value.trim();

	if (username && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the user's dashboard
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('#signup-button')
	.addEventListener('click', signupFormHandler);
