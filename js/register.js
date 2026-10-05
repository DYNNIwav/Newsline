import { register, isLoggedIn } from './auth.js';

if (await isLoggedIn()) {
    window.location.href = '../';
}

const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const button = form.querySelector('button');

    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (password.length < 8) {
        errorMessage.textContent = 'The password must be at least 8 characters.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'The passwords do not match.';
        return;
    }

    button.disabled = true;

    try {
        const data = await register(email, password);

        if (data.user && data.user.identities.length === 0) {
            errorMessage.textContent = 'There is already an account with this email.';
            button.disabled = false;
            return;
        }

        form.reset();
        successMessage.textContent = 'Your account is created! Check your email and click the link to confirm it, then log in.';
    } catch (error) {
        errorMessage.textContent = error.message;
    }

    button.disabled = false;
}
