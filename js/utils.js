export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nn-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function truncate(text, maxLength) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trimEnd() + '...';
}

export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
