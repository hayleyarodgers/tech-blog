const addComment = async (event) => {
	event.preventDefault();

	const postId = pet.getAttribute('data-post');
	const comment = document.querySelector('#new-comment').value.trim();

	const response = await fetch('/api/comment', {
		method: 'POST',
		body: JSON.stringify({
			post_id: postId,
			comment: comment,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert('Failed to add comment.');
	}
};

document.querySelector('#comment-button').addEventListener('click', addComment);
