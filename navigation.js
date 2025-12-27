// ========================================
// TEAMSYNC AI - NAVIGATION SYSTEM
// ========================================
// Version: 0.3
// Date: November 1, 2025
// Purpose: View switching, command palette, interactions
// ========================================

// ========================================
// VIEW MANAGEMENT
// ========================================

const views = {
    landing: 'landingView',
    build: 'buildView',
    optimize: 'optimizeView',
    supervisor: 'supervisorView',
    conflict: 'conflictView'
};

let currentView = 'landing';

// ========================================
// DROPDOWN MENUS
// ========================================

/**
 * Toggle settings dropdown menu
 */
function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settingsMenu');
    const userMenu = document.getElementById('userMenu');
    
    // Close user menu if open
    if (userMenu) userMenu.classList.remove('show');
    
    // Toggle settings menu
    if (settingsMenu) settingsMenu.classList.toggle('show');
}

/**
 * Toggle user dropdown menu
 */
function toggleUserMenu() {
    const settingsMenu = document.getElementById('settingsMenu');
    const userMenu = document.getElementById('userMenu');
    
    // Close settings menu if open
    if (settingsMenu) settingsMenu.classList.remove('show');
    
    // Toggle user menu
    if (userMenu) userMenu.classList.toggle('show');
}

/**
 * Close all dropdowns when clicking outside
 */
function initializeDropdowns() {
    document.addEventListener('click', function(event) {
        const settingsMenu = document.getElementById('settingsMenu');
        const userMenu = document.getElementById('userMenu');
        
        // Check if click is outside dropdowns
        if (!event.target.closest('.dropdown-container') && 
            !event.target.closest('.settings-icon')) {
            if (settingsMenu) settingsMenu.classList.remove('show');
            if (userMenu) userMenu.classList.remove('show');
        }
    });
}

/**
 * Show a specific view and hide others
 */
function showView(viewName) {
    // Hide all views
    Object.values(views).forEach(viewId => {
        const element = document.getElementById(viewId);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Show target view
    const targetView = document.getElementById(views[viewName]);
    if (targetView) {
        targetView.classList.remove('hidden');
        currentView = viewName;
    }
}

/**
 * Navigate to a module view
 */
function navigateToModule(moduleName) {
    const moduleMap = {
        'build-team': 'build',
        'optimize-team': 'optimize',
        'match-supervisor': 'supervisor',
        'resolve-conflict': 'conflict'
    };
    
    const viewName = moduleMap[moduleName] || moduleName;
    showView(viewName);
    
    // Phase 2B - Initialize Build Team view when it loads
    if (viewName === 'build' && typeof initializeBuildTeamView === 'function') {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            initializeBuildTeamView();
        }, 10);
    }
    
    // Phase 4A - Initialize Conflict view when it loads
    if (viewName === 'conflict' && typeof populateConflictSelects === 'function') {
        setTimeout(() => {
            populateConflictSelects();
            // Reset the view - clear selections and hide results
            if (typeof resetConflictView === 'function') {
                resetConflictView();
            }
        }, 10);
    }
    
    // Module 3 - Initialize Supervisor view when it loads
    if (viewName === 'supervisor' && typeof populateSupervisorSelects === 'function') {
        setTimeout(() => {
            populateSupervisorSelects();
            // Reset the view - clear selections and hide results
            if (typeof resetSupervisorView === 'function') {
                resetSupervisorView();
            }
        }, 10);
    }
}

/**
 * Go back to landing page
 */
function goToLanding() {
    showView('landing');
}

// ========================================
// MODULE CARD INTERACTIONS
// ========================================

/**
 * Initialize module card click handlers
 */
function initializeModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card[data-module]');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking a link inside the card
            if (e.target.closest('.module-action')) {
                e.preventDefault();
            }
            
            const moduleName = this.dataset.module;
            
            // Add ripple effect
            createRipple(e, this);
            
            // Navigate after short delay for ripple effect
            setTimeout(() => {
                navigateToModule(moduleName);
            }, 150);
        });
        
        // Initialize 3D tilt effect
        initialize3DTilt(card);
    });
}

/**
 * Create ripple effect on click
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 700);
}

/**
 * Initialize 3D tilt effect on element
 */
function initialize3DTilt(element) {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

// ========================================
// BACK BUTTON HANDLERS
// ========================================

function initializeBackButtons() {
    const backButtons = [
        'backFromBuild',
        'backFromOptimize',
        'backFromSupervisor',
        'backFromConflict'
    ];
    
    backButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', goToLanding);
        }
    });
}

// ========================================
// COMMAND PALETTE
// ========================================

let commandPaletteOpen = false;
let selectedCommandIndex = 0;

const commands = [
    { 
        id: 'build-team', 
        title: 'Build a Team', 
        desc: 'Create new teams with chemistry scoring',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    { 
        id: 'optimize-team', 
        title: 'Optimize Team', 
        desc: 'Test configurations and improve performance',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`
    },
    { 
        id: 'match-supervisor', 
        title: 'Match Supervisor', 
        desc: 'Find leaders for your team',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`
    },
    { 
        id: 'resolve-conflict', 
        title: 'Resolve Conflict', 
        desc: 'Diagnose and resolve team issues',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`
    },
    {
        id: 'toggle-theme',
        title: 'Toggle Theme',
        desc: 'Switch between light and dark mode',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`
    }
];

/**
 * Toggle command palette visibility
 */
function toggleCommandPalette() {
    const backdrop = document.getElementById('commandPaletteBackdrop');
    const input = document.getElementById('commandInput');
    
    commandPaletteOpen = !commandPaletteOpen;
    
    if (commandPaletteOpen) {
        backdrop.classList.add('active');
        input.value = '';
        input.focus();
        selectedCommandIndex = 0;
        renderCommandResults(commands);
    } else {
        backdrop.classList.remove('active');
    }
}

/**
 * Filter and render command results
 */
function filterCommands(query) {
    const filtered = commands.filter(cmd => 
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.desc.toLowerCase().includes(query.toLowerCase())
    );
    selectedCommandIndex = 0;
    renderCommandResults(filtered);
}

/**
 * Render command results
 */
function renderCommandResults(cmds) {
    const container = document.getElementById('commandResults');
    
    if (cmds.length === 0) {
        container.innerHTML = `
            <div class="command-empty">
                <div class="command-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
                <p>No results found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="command-group">
            <div class="command-group-title">Modules & Actions</div>
            ${cmds.map((cmd, index) => `
                <div class="command-item ${index === selectedCommandIndex ? 'selected' : ''}" 
                     data-command="${cmd.id}"
                     onclick="executeCommand('${cmd.id}')">
                    <div class="command-item-icon">${cmd.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${cmd.title}</div>
                        <div class="command-item-desc">${cmd.desc}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Execute a command
 */
function executeCommand(commandId) {
    toggleCommandPalette();
    
    if (commandId === 'toggle-theme') {
        toggleTheme();
    } else {
        navigateToModule(commandId);
    }
}

/**
 * Handle keyboard navigation in command palette
 */
function handleCommandKeyboard(e) {
    if (!commandPaletteOpen) return;
    
    const items = document.querySelectorAll('.command-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCommandIndex = Math.min(selectedCommandIndex + 1, items.length - 1);
        updateCommandSelection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
        updateCommandSelection();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem = items[selectedCommandIndex];
        if (selectedItem) {
            executeCommand(selectedItem.dataset.command);
        }
    } else if (e.key === 'Escape') {
        toggleCommandPalette();
    }
}

/**
 * Update visual selection in command palette
 */
function updateCommandSelection() {
    const items = document.querySelectorAll('.command-item');
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedCommandIndex);
    });
}

/**
 * Initialize command palette
 */
function initializeCommandPalette() {
    const backdrop = document.getElementById('commandPaletteBackdrop');
    const input = document.getElementById('commandInput');
    
    // Close on backdrop click
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            toggleCommandPalette();
        }
    });
    
    // Filter on input
    input.addEventListener('input', function() {
        filterCommands(this.value);
    });
    
    // Keyboard shortcut to open (Cmd+K or Ctrl+K)
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleCommandPalette();
        }
        
        handleCommandKeyboard(e);
    });
}

// ========================================
// THEME TOGGLE
// ========================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('teamsync-theme', isDark ? 'dark' : 'light');
    
    // Update theme toggle button appearance
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.classList.toggle('light', !isDark);
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('teamsync-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    // Default is light mode (no class needed)
}

// ========================================
// DEMO TOGGLE
// ========================================

let isPopulated = false;
let isLoading = false;

function initializeDemoToggle() {
    const demoToggle = document.getElementById('demoToggle');
    const toggleLabel = document.getElementById('toggleLabel');
    const userAvatar = document.getElementById('userAvatar');
    
    if (!demoToggle) return;
    
    demoToggle.addEventListener('click', async function() {
        if (isLoading) return;
        
        isLoading = true;
        isPopulated = !isPopulated;
        
        // Show loading state
        toggleLabel.innerHTML = '<span class="spinner"></span>';
        demoToggle.disabled = true;
        
        // Add loading class to badges
        document.querySelectorAll('.module-badge').forEach(badge => {
            badge.classList.add('loading');
        });
        
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Update UI
        if (isPopulated) {
            toggleLabel.textContent = 'Reset';
            demoToggle.classList.add('active');
            userAvatar.textContent = 'HH';
            
            // Animate badge counts
            animateBadges();
            
            // Update welcome message
            const welcomeTitle = document.getElementById('welcomeTitle');
            const welcomeSubtitle = document.getElementById('welcomeSubtitle');
            if (welcomeTitle) welcomeTitle.textContent = 'Welcome back, Hannah';
            if (welcomeSubtitle) welcomeSubtitle.textContent = 'Your teams are performing well today';
            
        } else {
            toggleLabel.textContent = 'Populate';
            demoToggle.classList.remove('active');
            userAvatar.textContent = 'NU';
            
            // Reset badges
            resetBadges();
            
            // Reset welcome message
            const welcomeTitle = document.getElementById('welcomeTitle');
            const welcomeSubtitle = document.getElementById('welcomeSubtitle');
            if (welcomeTitle) welcomeTitle.textContent = 'Welcome to TeamSync';
            if (welcomeSubtitle) welcomeSubtitle.textContent = 'Select a module to begin optimizing your teams';
        }
        
        demoToggle.disabled = false;
        isLoading = false;
    });
}

function animateBadges() {
    const badgeData = [
        { id: 'badge-build', value: '12 Active', color: 'badge-blue' },
        { id: 'badge-optimize', value: '7 Opportunities', color: 'badge-purple' },
        { id: 'badge-supervisor', value: '3 Need Match', color: 'badge-pink' },
        { id: 'badge-conflict', value: '5 Pending', color: 'badge-green' }
    ];
    
    badgeData.forEach((data, index) => {
        setTimeout(() => {
            const badge = document.getElementById(data.id);
            if (badge) {
                badge.classList.remove('loading');
                badge.textContent = data.value;
            }
        }, index * 150);
    });
}

function resetBadges() {
    const badgeData = [
        { id: 'badge-build', value: 'Start' },
        { id: 'badge-optimize', value: 'Analyze' },
        { id: 'badge-supervisor', value: 'Explore' },
        { id: 'badge-conflict', value: 'Diagnose' }
    ];
    
    badgeData.forEach(data => {
        const badge = document.getElementById(data.id);
        if (badge) {
            badge.classList.remove('loading');
            badge.textContent = data.value;
        }
    });
}

// ========================================
// THEME TOGGLE BUTTON
// ========================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// ========================================
// INITIALIZATION
// ========================================

function initializeNavigation() {
    // Load saved theme
    loadTheme();
    
    // Initialize all components
    initializeModuleCards();
    initializeBackButtons();
    initializeCommandPalette();
    initializeDemoToggle();
    initializeThemeToggle();
    initializeDropdowns();
    
    // Show landing view by default
    showView('landing');
    
    console.log('Navigation system initialized with 3D tilt effects');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

// ========================================
// EXPORT FOR GLOBAL ACCESS
// ========================================

window.TeamSyncNav = {
    showView,
    navigateToModule,
    goToLanding,
    toggleCommandPalette,
    toggleTheme,
    toggleSettingsMenu,
    toggleUserMenu,
    executeCommand
};
