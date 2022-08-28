const login = async (event) => {
	event.preventDefault();

	// Collect values from the login form
	const username = document.querySelector('#login-username').value.trim();
	const password = document.querySelector('#login-password').value.trim();

	if (username && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
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

document.querySelector('#login-button').addEventListener('click', login);
