import { supabase } from './supabase.js';
import { getUser } from './auth.js';

const user = await getUser();
if (!user) {
    window.location.href = '../account/login.html';
}

const createPostForm = document.getElementById('create-post-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

createPostForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const body = document.getElementById('body').value.trim();
    const button = createPostForm.querySelector('button');

    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (title.length < 3) {
        errorMessage.textContent = 'Tittelen må vera minst 3 teikn.';
        return;
    }

    if (!category) {
        errorMessage.textContent = 'Vel ein kategori.';
        return;
    }

    if (body.length < 20) {
        errorMessage.textContent = 'Innhaldet må vera minst 20 teikn.';
        return;
    }

    button.disabled = true;

    const { data, error } = await supabase
        .from('articles')
        .insert({ title, category, body, submitted_by: user.id })
        .select()
        .single();

    if (error) {
        errorMessage.textContent = 'Kunne ikkje publisera nyheita: ' + error.message;
        button.disabled = false;
        return;
    }

    successMessage.textContent = 'Nyheita er publisert!';
    setTimeout(() => {
        window.location.href = `./index.html?id=${data.id}`;
    }, 1500);
}
