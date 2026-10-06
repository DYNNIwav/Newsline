import { isLoggedIn, logout } from './auth.js';

const navLinks = document.getElementById('nav-links');
const path = window.location.pathname;
const root = path.includes('/post/') || path.includes('/account/') ? '../' : './';

if (navLinks) {
    if (await isLoggedIn()) {
        navLinks.innerHTML = `
            <a href="${root}post/create.html">Opprett nyheit</a>
            <button type="button" id="logout-btn">Logg ut</button>
        `;

        document.getElementById('logout-btn').addEventListener('click', async function () {
            await logout();
            window.location.href = root;
        });
    } else {
        navLinks.innerHTML = `
            <a href="${root}account/login.html">Logg inn</a>
            <a href="${root}account/register.html">Registrer</a>
        `;
    }
}
