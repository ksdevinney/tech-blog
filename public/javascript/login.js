// mini-project from week 14
const loginFormHandler = async (event) => {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input-login');
    const passwordEl = document.querySelector('#password-input-login');

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
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);