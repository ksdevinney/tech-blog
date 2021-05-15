const signupFormHandler = async (event) => {
    event.preventDefault();

    const nameEl = document.querySelector('#username-signup').value.trim();
    const emailEl = document.querySelector('#email-signup').value.trim();
    const passwordEl = document.querySelector('#password-signup').value.trim();

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ 
                username: nameEl, 
                email: emailEl, 
                password: passwordEl 
            }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Cannot create account');
        }
};


document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);