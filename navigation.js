// ========================================
// TEAMSYNC AI - NAVIGATION SYSTEM
// ========================================
// Version: 0.2
// Date: November 1, 2025
// Purpose: Page switching, command palette, and navigation
// ========================================

// ========================================
// PAGE MANAGEMENT
// ========================================

const PAGES = ['landing', 'build', 'optimize', 'supervisor', 'conflict'];
let currentPage = 'landing';

/**
 * Show a specific page and hide others
 */
function showPage(pageId) {
  // Hide all pages
  PAGES.forEach(page => {
    const element = document.getElementById(`${page}-page`);
    if (element) {
      element.classList.remove('active');
      element.style.display = 'none';
    }
  });
  
  // Show target page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.style.display = 'block';
    // Trigger reflow for animation
    void targetPage.offsetWidth;
    targetPage.classList.add('active');
  }
  
  // Update current page
  currentPage = pageId;
  
  // Update back button visibility
  updateBackButton();
  
  // Initialize page-specific features
  initializePageFeatures(pageId);
  
  // Update URL hash (optional, for bookmarking)
  window.location.hash = pageId;
}

/**
 * Go back to landing page
 */
function goBackToLanding() {
  showPage('landing');
}

/**
 * Update back button visibility
 */
function updateBackButton() {
  const backButton = document.getElementById('back-button');
  if (backButton) {
    if (currentPage === 'landing') {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'flex';
    }
  }
}

/**
 * Initialize features specific to each page
 */
function initializePageFeatures(pageId) {
  switch(pageId) {
    case 'build':
      renderMemberPools();
      break;
    case 'optimize':
      renderOptimizationInterface();
      window.TeamSyncApp.initializeDragAndDrop();
      break;
    case 'supervisor':
      renderSupervisorCandidates();
      break;
    case 'conflict':
      renderConflictInterface();
      break;
  }
}

// ========================================
// COMMAND PALETTE
// ========================================

let commandPaletteOpen = false;
let selectedCommandIndex = 0;

const COMMANDS = [
  { id: 'build', name: 'Build a Team', description: 'Create and deploy a new team', icon: '👥' },
  { id: 'optimize', name: 'Optimize Team', description: 'Improve team chemistry and structure', icon: '⚡' },
  { id: 'supervisor', name: 'Match Supervisor', description: 'Find the best leader match', icon: '🎯' },
  { id: 'conflict', name: 'Resolve Conflict', description: 'Analyze and address team conflicts', icon: '🤝' }
];

/**
 * Toggle command palette
 */
function toggleCommandPalette() {
  commandPaletteOpen = !commandPaletteOpen;
  const palette = document.getElementById('command-palette');
  
  if (commandPaletteOpen) {
    palette.classList.add('active');
    document.getElementById('command-input').focus();
    selectedCommandIndex = 0;
    renderCommandResults(COMMANDS);
  } else {
    palette.classList.remove('active');
    document.getElementById('command-input').value = '';
  }
}

/**
 * Handle command palette keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
  // Cmd+K (Mac) or Ctrl+K (Windows)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggleCommandPalette();
  }
  
  // Escape to close
  if (e.key === 'Escape' && commandPaletteOpen) {
    toggleCommandPalette();
  }
  
  // Arrow navigation
  if (commandPaletteOpen) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedCommandIndex = Math.min(selectedCommandIndex + 1, COMMANDS.length - 1);
      updateSelectedCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedCommandIndex = Math.max(selectedCommandIndex - 1, 0);
      updateSelectedCommand();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeSelectedCommand();
    }
  }
});

/**
 * Filter commands based on search
 */
function filterCommands() {
  const input = document.getElementById('command-input').value.toLowerCase();
  const filtered = COMMANDS.filter(cmd => 
    cmd.name.toLowerCase().includes(input) || 
    cmd.description.toLowerCase().includes(input)
  );
  selectedCommandIndex = 0;
  renderCommandResults(filtered);
}

/**
 * Render command results
 */
function renderCommandResults(commands) {
  const resultsContainer = document.getElementById('command-results');
  
  if (commands.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">No modules found</div>';
    return;
  }
  
  resultsContainer.innerHTML = commands.map((cmd, index) => `
    <div class="command-item ${index === selectedCommandIndex ? 'selected' : ''}" 
         data-command="${cmd.id}"
         onclick="executeCommand('${cmd.id}')">
      <span class="command-icon">${cmd.icon}</span>
      <div class="command-info">
        <div class="command-name">${cmd.name}</div>
        <div class="command-description">${cmd.description}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Update selected command highlight
 */
function updateSelectedCommand() {
  const items = document.querySelectorAll('.command-item');
  items.forEach((item, index) => {
    if (index === selectedCommandIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      item.classList.remove('selected');
    }
  });
}

/**
 * Execute selected command
 */
function executeSelectedCommand() {
  const command = COMMANDS[selectedCommandIndex];
  if (command) {
    executeCommand(command.id);
  }
}

/**
 * Execute a command by ID
 */
function executeCommand(commandId) {
  toggleCommandPalette();
  showPage(commandId);
}

// ========================================
// MODULE CARD INTERACTIONS
// ========================================

/**
 * Handle module card click with ripple effect
 */
function handleModuleClick(event, moduleId) {
  // Create ripple effect
  const card = event.currentTarget;
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  card.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => ripple.remove(), 600);
  
  // Navigate to module
  setTimeout(() => showPage(moduleId), 200);
}

/**
 * Initialize 3D tilt effect on module cards
 */
function initialize3DTilt() {
  const cards = document.querySelectorAll('.module-card');
  
  cards.forEach(card => {
    // Mouse move handler for 3D tilt
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X position within card
      const y = e.clientY - rect.top;  // Mouse Y position within card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position (-1 to 1 range)
      const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg tilt on X axis
      const rotateY = ((x - centerX) / centerX) * 8;  // Max 8deg tilt on Y axis
      
      // Calculate mouse position as percentage for light reflection
      const mouseXPercent = (x / rect.width) * 100;
      const mouseYPercent = (y / rect.height) * 100;
      
      // Apply 3D transform
      this.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
      `;
      
      // Update light reflection position
      this.style.setProperty('--mouse-x', `${mouseXPercent}%`);
      this.style.setProperty('--mouse-y', `${mouseYPercent}%`);
    });
    
    // Mouse leave handler - reset to flat state
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.removeProperty('--mouse-x');
      this.style.removeProperty('--mouse-y');
    });
  });
}

// ========================================
// PAGE RENDERING FUNCTIONS
// ========================================

/**
 * Render member pools for build team module
 */
function renderMemberPools() {
  const engineeringPool = document.getElementById('engineering-pool');
  const productPool = document.getElementById('product-pool');
  
  if (engineeringPool) {
    engineeringPool.innerHTML = renderMemberCards(window.TeamSyncApp.memberPools.engineering);
  }
  
  if (productPool) {
    productPool.innerHTML = renderMemberCards(window.TeamSyncApp.memberPools.productDesign);
  }
}

function renderMemberCards(members) {
  return members.map(member => `
    <div class="member-card" onclick='window.TeamSyncApp.toggleMemberSelection(${JSON.stringify(member)})'>
      <div class="member-avatar" style="background: ${member.avatarColor}">
        ${member.initials}
      </div>
      <div class="member-info">
        <div class="member-name">${member.name}</div>
        <div class="member-role">${member.role}</div>
        <div class="member-survey">
          <span class="survey-status">✓ Fresh: ${member.surveyTimestamp}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render optimization interface
 */
function renderOptimizationInterface() {
  // Render existing teams
  const completedTeams = window.TeamSyncApp.state.teams.filter(t => t.status === 'completed');
  const pendingTeams = window.TeamSyncApp.state.teams.filter(t => t.status === 'pending');
  
  const completedContainer = document.getElementById('completed-teams-list');
  const pendingContainer = document.getElementById('pending-teams-list');
  
  if (completedContainer) {
    if (completedTeams.length === 0) {
      completedContainer.innerHTML = '<p class="empty-state">No optimized teams yet</p>';
    } else {
      completedContainer.innerHTML = completedTeams.map(team => `
        <div class="team-list-item">
          <div class="team-header">
            <h4>${team.name}</h4>
            <span class="chemistry-badge score-${getScoreLevel(team.chemistryScore)}">
              ${team.chemistryScore}%
            </span>
          </div>
          <p class="team-purpose">${team.purpose}</p>
          <div class="team-meta">
            ${team.members.length} members • Created ${formatDate(team.createdAt)}
          </div>
        </div>
      `).join('');
    }
  }
  
  if (pendingContainer) {
    if (pendingTeams.length === 0) {
      pendingContainer.innerHTML = '<p class="empty-state">No teams awaiting surveys</p>';
    } else {
      pendingContainer.innerHTML = pendingTeams.map(team => `
        <div class="team-list-item pending">
          <div class="team-header">
            <h4>${team.name}</h4>
            <span class="status-badge">Pending</span>
          </div>
          <p class="team-purpose">${team.purpose}</p>
          <div class="quiz-progress">
            ${team.quizProgress.map(done => `
              <div class="progress-dot ${done ? 'completed' : ''}"></div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }
}

/**
 * Render supervisor candidates
 */
function renderSupervisorCandidates() {
  const container = document.getElementById('supervisors-grid');
  if (!container) return;
  
  container.innerHTML = window.TeamSyncApp.supervisors.map(supervisor => `
    <div class="supervisor-card">
      <div class="supervisor-header">
        <div class="member-avatar-lg" style="background: ${supervisor.avatarColor}">
          ${supervisor.initials}
        </div>
        <div class="supervisor-info">
          <h3>${supervisor.name}</h3>
          <p class="supervisor-title">${supervisor.title}</p>
        </div>
      </div>
      <div class="compatibility-score score-${getScoreLevel(supervisor.compatibilityScore)}">
        <span class="score-value">${supervisor.compatibilityScore}%</span>
        <span class="score-label">Compatibility</span>
      </div>
      <div class="match-factors">
        ${supervisor.matchFactors.map(factor => `
          <div class="factor-item ${factor.type}">
            <span class="factor-icon">${factor.type === 'strength' ? '✓' : '!'}</span>
            <span class="factor-text">${factor.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Render conflict resolution interface
 */
function renderConflictInterface() {
  const allMembers = [
    ...window.TeamSyncApp.memberPools.engineering,
    ...window.TeamSyncApp.memberPools.productDesign
  ];
  
  const selector1 = document.getElementById('conflict-member-1');
  const selector2 = document.getElementById('conflict-member-2');
  
  if (selector1 && selector2) {
    const options = allMembers.map(m => 
      `<option value="${m.id}">${m.name} - ${m.role}</option>`
    ).join('');
    
    selector1.innerHTML = '<option value="">Select first person...</option>' + options;
    selector2.innerHTML = '<option value="">Select second person...</option>' + options;
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function getScoreLevel(score) {
  if (score >= 85) return 'excellent';
  if (score >= 75) return 'good';
  return 'needs-improvement';
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return `${diffDays} days ago`;
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize navigation system on page load
 */
function initializeNavigation() {
  // Show landing page by default
  showPage('landing');
  
  // Initialize 3D tilt effects on module cards
  initialize3DTilt();
  
  // Check for hash in URL
  if (window.location.hash) {
    const pageId = window.location.hash.substring(1);
    if (PAGES.includes(pageId)) {
      showPage(pageId);
    }
  }
  
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
  showPage,
  goBackToLanding,
  toggleCommandPalette,
  handleModuleClick,
  executeCommand,
  initialize3DTilt
};
