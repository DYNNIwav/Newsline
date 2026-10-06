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
        errorMessage.textContent = 'Passordet må vera minst 8 teikn.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passorda er ikkje like.';
        return;
    }

    button.disabled = true;

    try {
        const data = await register(email, password);

        if (data.user && data.user.identities.length === 0) {
            errorMessage.textContent = 'Det finst allereie ein konto med denne e-posten.';
            button.disabled = false;
            return;
        }

        form.reset();
        successMessage.textContent = 'Kontoen din er oppretta! Sjekk e-posten din og trykk på lenkja for å stadfesta han, så kan du logga inn.';
    } catch (error) {
        errorMessage.textContent = error.message;
    }

    button.disabled = false;
}
