export function checkLoadMore(total, skip, limit) {
    return total - skip - limit > 0;
}

export function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
}

export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.dataset.theme = savedTheme;

    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');

    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}