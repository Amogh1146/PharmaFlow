/**
 * PharmaFlow Command Nexus (Ctrl+K)
 * Universal search and navigation system
 */

const CommandPalette = {
    isOpen: false,
    selectedIndex: 0,
    filteredItems: [],

    // Command registry
    items: [
        { id: 'dash', title: 'Dashboard', desc: 'System-wide operational overview', icon: 'layout-dashboard', url: 'admin_pg_dashboard.html', role: 'SYSTEM' },
        { id: 'route', title: 'Route Planning', desc: 'Tactical lane configuration', icon: 'map', url: 'admin_pg_route_planning.html', role: 'SYSTEM' },
        { id: 'temp', title: 'Temp Monitor', desc: 'Real-time thermal stability', icon: 'thermometer', url: 'admin_pg_temp_monitoring.html', role: 'SYSTEM' },
        { id: 'cost', title: 'Cost & Risk', desc: 'Financial optimization engine', icon: 'trending-up', url: 'admin_pg_cost_risk.html', role: 'SYSTEM' },
        { id: 'vendor', title: 'Vendor Management', desc: 'Partner network & fleet vitals', icon: 'truck', url: 'admin_pg_vendor_mgmt.html', role: 'SYSTEM' },

        { id: 'client_dash', title: 'Overview', desc: 'Client operational health', icon: 'home', url: 'client_pg_overview.html', role: 'CLIENT' },
        { id: 'client_order', title: 'New Order', desc: 'Initialize shipment protocol', icon: 'plus-circle', url: 'client_pg_new_order.html', role: 'CLIENT' },
        { id: 'client_temp', title: 'Live Tracking', desc: 'Active asset telemetry', icon: 'activity', url: 'client_pg_temp_monitor.html', role: 'CLIENT' },
        { id: 'client_certs', title: 'Compliance Docs', desc: 'GDP/GXP audit repository', icon: 'file-text', url: 'client_pg_compliance_docs.html', role: 'CLIENT' },

        { id: 'settings', title: 'Control Center', desc: 'User profile & system settings', icon: 'settings', url: 'shared_pg_settings.html' },
        { id: 'logout', title: 'Logout', desc: 'Terminate secure session', icon: 'log-out', action: () => logout() }
    ],

    init() {
        // Add dynamic shipments to items
        if (window.PHARMAFLOW_DATA && window.PHARMAFLOW_DATA.shipments) {
            window.PHARMAFLOW_DATA.shipments.forEach(s => {
                this.items.push({
                    id: `ship-${s.id}`,
                    title: `Shipment: ${s.id}`,
                    desc: `${s.product} | ${s.origin} → ${s.destination}`,
                    icon: 'package',
                    url: `shared_pg_shipment_detail.html?id=${s.id}`
                });
            });
        }

        // Listen for shortcuts
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Initialize UI
        this.renderOverlay();

        // Find existing search inputs and hook them
        const searchInputs = document.querySelectorAll('.topbar input[type="text"]');
        searchInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.preventDefault();
                input.blur();
                this.open();
            });
        });
    },

    renderOverlay() {
        if (document.getElementById('command-palette')) return;

        const overlay = document.createElement('div');
        overlay.id = 'command-palette';
        overlay.className = 'command-palette-overlay hidden';
        overlay.innerHTML = `
            <div class="command-palette-modal">
                <input type="text" class="command-palette-search" placeholder="Type a command or search shipments..." spellcheck="false">
                <div class="command-results" id="command-results"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        const search = overlay.querySelector('.command-palette-search');
        search.addEventListener('input', (e) => this.filter(e.target.value));
        search.addEventListener('keydown', (e) => this.handleKeydown(e));
    },

    toggle() {
        this.isOpen ? this.close() : this.open();
    },

    open() {
        const overlay = document.getElementById('command-palette');
        overlay.classList.remove('hidden');
        this.isOpen = true;
        this.selectedIndex = 0;

        const search = overlay.querySelector('.command-palette-search');
        search.value = '';
        search.focus();
        this.filter('');
    },

    close() {
        const overlay = document.getElementById('command-palette');
        overlay.classList.add('hidden');
        this.isOpen = false;
    },

    filter(query) {
        const user = JSON.parse(localStorage.getItem('pharmaflow_user') || '{}');
        const role = user.role;

        this.filteredItems = this.items.filter(item => {
            const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.desc.toLowerCase().includes(query.toLowerCase());
            const matchesRole = !item.role || item.role === role;
            return matchesQuery && matchesRole;
        }).slice(0, 10);

        this.renderResults();
    },

    renderResults() {
        const results = document.getElementById('command-results');
        results.innerHTML = '';

        if (this.filteredItems.length === 0) {
            results.innerHTML = `<div class="p-8 text-center text-secondary text-xs uppercase font-black">No results found</div>`;
            return;
        }

        this.filteredItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `command-item ${index === this.selectedIndex ? 'selected' : ''}`;
            div.innerHTML = `
                <i data-lucide="${item.icon}"></i>
                <div>
                    <div class="command-title">${item.title}</div>
                    <div class="command-desc">${item.desc}</div>
                </div>
                ${index < 9 ? `<div class="command-shortcut">↵</div>` : ''}
            `;
            div.onclick = () => this.execute(item);
            div.onmouseover = () => {
                this.selectedIndex = index;
                this.renderResults();
            };
            results.appendChild(div);
        });

        lucide.createIcons();
    },

    handleKeydown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex + 1) % this.filteredItems.length;
            this.renderResults();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
            this.renderResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.filteredItems[this.selectedIndex]) {
                this.execute(this.filteredItems[this.selectedIndex]);
            }
        }
    },

    execute(item) {
        if (item.action) {
            item.action();
        } else if (item.url) {
            window.location.href = item.url;
        }
        this.close();
    }
};

// Initialize once data and lucide are ready
document.addEventListener('DOMContentLoaded', () => {
    CommandPalette.init();
});
