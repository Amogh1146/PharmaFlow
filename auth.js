// Called at top of every page's JS file
function getHomeLink(user) {
    if (!user) return 'shared_pg_login.html';
    return user.role === 'SYSTEM' ? 'admin_pg_dashboard.html' : 'client_pg_overview.html';
}

function initTheme() {
    const theme = localStorage.getItem('pharmaflow_theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pharmaflow_theme', next);
    initTheme();
    showUserMenu(); // Hide menu after toggle
}

const PHARMAFLOW_CURRENCIES = {
    'USD': { symbol: '$', rate: 1, locale: 'en-US' },
    'EUR': { symbol: '€', rate: 0.92, locale: 'de-DE' },
    'GBP': { symbol: '£', rate: 0.79, locale: 'en-GB' },
    'INR': { symbol: '₹', rate: 82.5, locale: 'en-IN' },
    'JPY': { symbol: '¥', rate: 150.2, locale: 'ja-JP' }
};

function getCurrency() {
    return localStorage.getItem('pharmaflow_currency') || 'USD';
}

function setCurrency(curr) {
    localStorage.setItem('pharmaflow_currency', curr);
    window.location.reload();
}

function formatCurrency(amount) {
    const currency = getCurrency();
    const config = PHARMAFLOW_CURRENCIES[currency];
    const converted = amount * config.rate;
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currency
    }).format(converted);
}

function initAuth(requiredRole) {
    const user = JSON.parse(localStorage.getItem('pharmaflow_user'));
    if (!user) {
        window.location.href = 'shared_pg_login.html';
        return null;
    }
    if (requiredRole === 'SYSTEM' && user.role !== 'SYSTEM') {
        window.location.href = 'client_pg_overview.html';
        return null;
    }
    if (requiredRole === 'CLIENT' && user.role === 'SYSTEM') {
        window.location.href = 'admin_pg_dashboard.html';
        return null;
    }
    if (requiredRole === 'SUPPLIER' && user.role !== 'SUPPLIER' && user.role !== 'SYSTEM') {
        window.location.href = user.role === 'CLIENT' ? 'client_pg_overview.html' : 'admin_pg_dashboard.html';
        return null;
    }
    return user;
}

function toggleSidebar() {
    const body = document.body;
    body.classList.toggle('sidebar-collapsed');
    const isCollapsed = body.classList.contains('sidebar-collapsed');
    localStorage.setItem('pharmaflow_sidebar_collapsed', isCollapsed);
}

function initSidebarState() {
    const isCollapsed = localStorage.getItem('pharmaflow_sidebar_collapsed') === 'true';
    if (isCollapsed) {
        document.body.classList.add('sidebar-collapsed');
    }
}

function logout() {
    localStorage.removeItem('pharmaflow_user');
    window.location.href = 'shared_pg_login.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('pharmaflow_user'));
}

// Populate topbar username and tenant badge on every page
function populateTopbar() {
    const user = getCurrentUser();
    if (!user) return;
    const nameEl = document.getElementById('topbar-username');
    const tenantEl = document.getElementById('topbar-tenant');
    if (nameEl) nameEl.textContent = user.name;
    if (tenantEl) {
        tenantEl.textContent = user.role === 'SYSTEM' ? 'ALL TENANTS' : (user.tenant_name || 'SUPPLIER');
    }
}

function showUserMenu() {
    const menu = document.getElementById('user-dropdown');
    if (menu) {
        // Ensure currency selector is injected if not exists
        if (!document.getElementById('currency-selector-item')) {
            const separator = document.createElement('div');
            separator.className = 'border-t border-border mt-2 pt-2';
            separator.id = 'currency-selector-item';

            const title = document.createElement('div');
            title.className = 'px-4 py-1 text-[10px] font-black text-secondary uppercase tracking-widest';
            title.textContent = 'Regional Currency';

            const select = document.createElement('select');
            select.className = 'mx-4 mb-2 p-1 text-xs border border-border rounded w-[calc(100%-32px)] bg-app/5';
            select.innerHTML = Object.keys(PHARMAFLOW_CURRENCIES).map(c => `
                <option value="${c}" ${c === getCurrency() ? 'selected' : ''}>${c} (${PHARMAFLOW_CURRENCIES[c].symbol})</option>
            `).join('');
            select.onchange = (e) => setCurrency(e.target.value);

            menu.appendChild(separator);
            menu.appendChild(title);
            menu.appendChild(select);
        }
        menu.classList.toggle('hidden');
    }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', initTheme);

// Close dropdowns on outside click
window.addEventListener('click', (e) => {
    if (!e.target.closest('.topbar-user-area')) {
        const menu = document.getElementById('user-dropdown');
        if (menu) menu.classList.add('hidden');
    }
});
