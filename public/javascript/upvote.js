async function upvoteClickHandler(event) {
    event.preventDefault();

    // take URL string, split it into an array, then grab the last item (which should be 'post_id')
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // console.log(id);
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT', 
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(respone.statusText);
    }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);