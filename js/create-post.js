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
        errorMessage.textContent = 'The title must be at least 3 characters.';
        return;
    }

    if (!category) {
        errorMessage.textContent = 'Please choose a category.';
        return;
    }

    if (body.length < 20) {
        errorMessage.textContent = 'The article text must be at least 20 characters.';
        return;
    }

    button.disabled = true;

    const { data, error } = await supabase
        .from('articles')
        .insert({ title, category, body, submitted_by: user.id })
        .select()
        .single();

    if (error) {
        errorMessage.textContent = 'Could not publish the article: ' + error.message;
        button.disabled = false;
        return;
    }

    successMessage.textContent = 'Your article is published!';
    setTimeout(() => {
        window.location.href = `./index.html?id=${data.id}`;
    }, 1500);
}
