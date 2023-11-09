// this file is for the front-end javascript that will get all data within the user login/signup forms

// create a function that will gather 'signup' form data from 'login.handlebars'
async function signupFormHandler(event) {
    event.preventDefault();
    
    // need to POST the username, email, and password from the form to our server
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    // make a 'fetch()' POST request to the /api/users/ by updating this functions logic
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post', 
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status by adding error handling using '.ok' property on the response object
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);