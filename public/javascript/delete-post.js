async function deleteFormHandler(event) {
    event.preventDefault();

    // capture id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    // make DELETE request
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // if request successful, redirect the user to dashboard
    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);