import { login, isLoggedIn } from './auth.js';

if (await isLoggedIn()) {
    window.location.href = '../';
}

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const button = form.querySelector('button');

    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (!email || !password) {
        errorMessage.textContent = 'Fyll inn både e-post og passord.';
        return;
    }

    button.disabled = true;

    try {
        await login(email, password);

        successMessage.textContent = 'Velkomen tilbake!';
        setTimeout(() => {
            window.location.href = '../';
        }, 1500);
    } catch (error) {
        errorMessage.textContent = error.message;
        button.disabled = false;
    }
}
