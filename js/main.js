import { supabase } from './supabase.js';
import { formatDate, truncate, escapeHtml } from './utils.js';

const postsContainer = document.getElementById('posts');

async function loadPosts() {
    postsContainer.insertAdjacentHTML('beforeend', '<div class="loading"></div>');

    const { data: posts, error } = await supabase
        .from('articles')
        .select('id, title, body, category, created_at')
        .order('created_at', { ascending: false });

    postsContainer.querySelector('.loading').remove();

    if (error) {
        postsContainer.insertAdjacentHTML('beforeend', '<p class="error-message">Kunne ikkje lasta inn nyheiter. Prøv igjen seinare.</p>');
        return;
    }

    if (posts.length === 0) {
        postsContainer.insertAdjacentHTML('beforeend', '<p>Det er ingen nyheiter enno. Logg inn og skriv den første!</p>');
        return;
    }

    displayPosts(posts);
}

function displayPosts(posts) {
    const grid = document.createElement('div');
    grid.className = 'post-grid';

    posts.forEach(function (post) {
        const card = document.createElement('a');
        card.href = `./post/index.html?id=${post.id}`;
        card.className = 'post-card';

        card.innerHTML = `
            <p class="post-card-category">${escapeHtml(post.category)}</p>
            <h2>${escapeHtml(post.title)}</h2>
            <p class="post-card-excerpt">${escapeHtml(truncate(post.body, 120))}</p>
            <p class="post-card-date">${formatDate(post.created_at)}</p>
        `;

        grid.appendChild(card);
    });

    postsContainer.appendChild(grid);
}

loadPosts();
