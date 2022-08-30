const deletePost = async (event) => {
	const button = event.target;
	const postId = button.getAttribute('data-post-id');

	const response = await fetch(`api/post/${postId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete post.');
	}
};

document.querySelectorAll('.delete-post-button').forEach((button) => {
	button.addEventListener('click', deletePost);
});
