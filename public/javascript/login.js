// mini-project from week 14
const loginFormHandler = async (event) => {
    event.preventDefault();

    const usernameEl = document.querySelector('#login-username').value.trim();
    const passwordEl = document.querySelector('#login-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ 
                username: usernameEl.value, 
                password: passwordEl.value, 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Cannot log in');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);