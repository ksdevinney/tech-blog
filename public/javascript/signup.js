let signupFormHandler = async (event) => {
    event.preventDefault();

    const nameEl = document.querySelector('#username-input-signup').value.trim();
    const emailEl = document.querySelector('#email-input-signup').value.trim();
    const passwordEl = document.querySelector('#password-input-signup').value.trim();
    console.log("USer entry",nameEl,emailEl,passwordEl);

         fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ 
                username: nameEl, 
                email: emailEl, 
                password: passwordEl 
            }),
            headers: { 'Content-Type': 'application/json'},
        }).then(response => {
         console.log(req)
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Cannot create account');
        }
    })
};


document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);