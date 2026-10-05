import { supabase } from './supabase.js';
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const postContainer = document.getElementById('post');

function formatBody(text) {
    const paragraphs = text.split('\n\n');
    let html = '';
    for (const p of paragraphs) {
        if (p.trim()) {
            html += `<p>${escapeHtml(p.trim())}</p>`;
        }
    }
    return html;
}

async function loadPost() {
    if (!postId) {
        postContainer.innerHTML = '<p class="error-message">No article selected.</p><a href="../" class="back-link">&larr; Back to all articles</a>';
        return;
    }

    postContainer.innerHTML = '<div class="loading"></div>';

    const { data: post, error } = await supabase
        .from('articles')
        .select('id, title, body, category, created_at')
        .eq('id', postId)
        .maybeSingle();

    if (error || !post) {
        postContainer.innerHTML = '<p class="error-message">Could not find this article.</p><a href="../" class="back-link">&larr; Back to all articles</a>';
        return;
    }

    document.title = post.title + ' - Newsline';

    postContainer.innerHTML = `
        <p class="post-category">${escapeHtml(post.category)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="post-meta">Published ${formatDate(post.created_at)}</p>
        <hr class="post-divider">
        <div class="post-body">${formatBody(post.body)}</div>
        <a href="../" class="back-link">&larr; Back to all articles</a>
    `;
}

loadPost();