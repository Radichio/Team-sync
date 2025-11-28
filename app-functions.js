// ========================================
// TEAMSYNC AI - APPLICATION FUNCTIONS
// ========================================
// Version: 0.2
// Date: November 1, 2025
// Purpose: Business logic, algorithms, and state management
// ========================================

// ========================================
// STATE MANAGEMENT
// ========================================

const AppState = {
  demoMode: false,
  currentTheme: 'dark',
  teams: [],
  selectedMembers: [],
  draggedMember: null,
  optimizationTeam: null,
  conflictPair: [null, null],
  // Phase 2B - Build Team state
  currentQuizType: 'team',
  selectedMemberIds: [],
  currentNameIndex: 0
};

// ========================================
// DUMMY DATA
// ========================================

const MEMBER_POOLS = {
  engineering: [
    { id: 'e1', name: 'Alex Chen', role: 'Senior Engineer', initials: 'AC', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '2 days ago' },
    { id: 'e2', name: 'Jordan Martinez', role: 'Backend Developer', initials: 'JM', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '1 day ago' },
    { id: 'e3', name: 'Sam Kim', role: 'Frontend Engineer', initials: 'SK', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '3 days ago' },
    { id: 'e4', name: 'Taylor Brooks', role: 'DevOps Engineer', initials: 'TB', avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '2 days ago' },
    { id: 'e5', name: 'Morgan Lee', role: 'QA Engineer', initials: 'ML', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '4 days ago' },
    { id: 'e6', name: 'Riley Johnson', role: 'Full Stack Developer', initials: 'RJ', avatarColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '1 day ago' },
    { id: 'e7', name: 'Casey Williams', role: 'Platform Engineer', initials: 'CW', avatarColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '5 days ago' },
    { id: 'e8', name: 'Avery Davis', role: 'Systems Architect', initials: 'AD', avatarColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', department: 'Engineering', surveyCompleted: true, surveyTimestamp: '2 days ago' }
  ],
  productDesign: [
    { id: 'p1', name: 'Jamie Parker', role: 'Product Manager', initials: 'JP', avatarColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', department: 'Product', surveyCompleted: true, surveyTimestamp: '1 day ago' },
    { id: 'p2', name: 'Drew Anderson', role: 'UX Designer', initials: 'DA', avatarColor: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '3 days ago' },
    { id: 'p3', name: 'Quinn Taylor', role: 'UI Designer', initials: 'QT', avatarColor: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '2 days ago' },
    { id: 'p4', name: 'Blake Morrison', role: 'UX Researcher', initials: 'BM', avatarColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '4 days ago' },
    { id: 'p5', name: 'Reese Cooper', role: 'Product Designer', initials: 'RC', avatarColor: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '1 day ago' },
    { id: 'p6', name: 'Sage Mitchell', role: 'Design Lead', initials: 'SM', avatarColor: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '2 days ago' },
    { id: 'p7', name: 'River Hayes', role: 'Product Strategist', initials: 'RH', avatarColor: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', department: 'Product', surveyCompleted: true, surveyTimestamp: '3 days ago' },
    { id: 'p8', name: 'Phoenix Reed', role: 'Design Systems Lead', initials: 'PR', avatarColor: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', department: 'Design', surveyCompleted: true, surveyTimestamp: '1 day ago' }
  ]
};

const SUPERVISORS = [
  {
    id: 's1',
    name: 'Dr. Maya Patel',
    title: 'Engineering Director',
    initials: 'MP',
    avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    compatibilityScore: 92,
    matchFactors: [
      { type: 'strength', text: 'Strong technical mentorship background' },
      { type: 'strength', text: 'Collaborative leadership style' },
      { type: 'strength', text: 'Experience with cross-functional teams' },
      { type: 'concern', text: 'May be too hands-on for autonomous teams' }
    ]
  },
  {
    id: 's2',
    name: 'James Chen',
    title: 'VP of Product',
    initials: 'JC',
    avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    compatibilityScore: 78,
    matchFactors: [
      { type: 'strength', text: 'Strategic vision alignment' },
      { type: 'strength', text: 'Data-driven decision making' },
      { type: 'concern', text: 'Limited technical depth' },
      { type: 'concern', text: 'Directive management style' }
    ]
  },
  {
    id: 's3',
    name: 'Sarah Kim',
    title: 'Head of Design',
    initials: 'SK',
    avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    compatibilityScore: 85,
    matchFactors: [
      { type: 'strength', text: 'Empathetic leadership approach' },
      { type: 'strength', text: 'Strong conflict resolution skills' },
      { type: 'strength', text: 'Creative problem-solving mindset' },
      { type: 'concern', text: 'Less experience with engineering teams' }
    ]
  },
  {
    id: 's4',
    name: 'Michael Torres',
    title: 'Platform Engineering Lead',
    initials: 'MT',
    avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    compatibilityScore: 64,
    matchFactors: [
      { type: 'strength', text: 'Deep technical expertise' },
      { type: 'concern', text: 'Limited people management experience' },
      { type: 'concern', text: 'May prioritize technical over team needs' },
      { type: 'concern', text: 'Communication style mismatch' }
    ]
  }
];

// ========================================
// V45 DATA - MENTAL SYNCHRONY MEMBER POOLS
// ========================================

// SpaceX-style team names for suggestions
const TEAM_NAMES = [
  "All Systems Go",
  "Escape Velocity", 
  "Mission Success",
  "The Catalysts",
  "Optimal Configuration",
  "Peak Performance",
  "Full Throttle",
  "Maximum Efficiency Achieved",
  "Operating at Capacity",
  "Launch Sequence Initiated",
  "Synchronization Complete",
  "The Golden Record",
  "Hypothesis Confirmed",
  "Results: Reproducible",
  "The Proof of Concept",
  "Five Star Review",
  "Achievement Unlocked",
  "Version Final",
  "The Resonance",
  "Perfect Pitch"
];

// Member pools with Mental Synchrony profiles from quiz responses
const memberPools = {
  team: [
    { id: 'T001', name: 'Sarah Johnson', initials: 'SJ', quizDate: '2024-12-19', hasDual: true,
      msScore: 72, subscales: { understanding: 68, trust: 80, ease: 72, integration: 70 } },
    { id: 'T002', name: 'Michael Chen', initials: 'MC', quizDate: '2024-12-18',
      msScore: 68, subscales: { understanding: 64, trust: 76, ease: 66, integration: 68 } },
    { id: 'T003', name: 'Emily Parker', initials: 'EP', quizDate: '2024-12-16',
      msScore: 78, subscales: { understanding: 76, trust: 82, ease: 80, integration: 74 } },
    { id: 'T004', name: 'David Wilson', initials: 'DW', quizDate: '2024-12-05',
      msScore: 65, subscales: { understanding: 60, trust: 72, ease: 64, integration: 66 } },
    { id: 'T005', name: 'Jessica Rodriguez', initials: 'JR', quizDate: '2024-11-20',
      msScore: 74, subscales: { understanding: 72, trust: 78, ease: 70, integration: 76 } },
    { id: 'T006', name: 'Robert Kim', initials: 'RK', quizDate: '2024-10-15',
      msScore: 61, subscales: { understanding: 56, trust: 68, ease: 60, integration: 62 } },
    { id: 'T007', name: 'Amanda Foster', initials: 'AF', quizDate: '2024-09-30',
      msScore: 70, subscales: { understanding: 68, trust: 74, ease: 66, integration: 72 } },
    { id: 'T008', name: 'Alex Thompson', initials: 'AT', quizDate: '2024-08-01', hasDual: true,
      msScore: 76, subscales: { understanding: 80, trust: 72, ease: 78, integration: 74 } },
    { id: 'T009', name: 'Sophie Lee', initials: 'SL', quizDate: '2024-06-15', hasDual: true,
      msScore: 58, subscales: { understanding: 54, trust: 66, ease: 56, integration: 58 } },
    { id: 'T010', name: 'Kevin Brown', initials: 'KB', quizDate: null,
      msScore: 52, subscales: { understanding: 48, trust: 58, ease: 50, integration: 52 } }
  ],
  dyad: [
    { id: 'D001', name: 'Alex Thompson', initials: 'AT', quizDate: '2024-12-19', hasDual: true,
      msScore: 76, subscales: { understanding: 80, trust: 72, ease: 78, integration: 74 } },
    { id: 'D002', name: 'Rachel Smith', initials: 'RS', quizDate: '2024-12-17',
      msScore: 71, subscales: { understanding: 70, trust: 76, ease: 68, integration: 72 } },
    { id: 'D003', name: 'Daniel Martinez', initials: 'DM', quizDate: '2024-12-12',
      msScore: 66, subscales: { understanding: 62, trust: 70, ease: 68, integration: 64 } },
    { id: 'D004', name: 'Sophie Lee', initials: 'SL', quizDate: '2024-11-25', hasDual: true,
      msScore: 58, subscales: { understanding: 54, trust: 66, ease: 56, integration: 58 } },
    { id: 'D005', name: 'Marcus Johnson', initials: 'MJ', quizDate: '2024-11-01',
      msScore: 73, subscales: { understanding: 76, trust: 78, ease: 66, integration: 74 } },
    { id: 'D006', name: 'Nina Patel', initials: 'NP', quizDate: '2024-10-01',
      msScore: 79, subscales: { understanding: 82, trust: 84, ease: 72, integration: 78 } },
    { id: 'D007', name: 'Oliver Chen', initials: 'OC', quizDate: '2024-07-15',
      msScore: 60, subscales: { understanding: 58, trust: 64, ease: 62, integration: 56 } },
    { id: 'D008', name: 'Sarah Johnson', initials: 'SJ', quizDate: '2024-03-20', hasDual: true,
      msScore: 72, subscales: { understanding: 68, trust: 80, ease: 72, integration: 70 } }
  ]
};

// ========================================
// MENTAL SYNCHRONY ALGORITHM
// ========================================

/**
 * V45 Mental Synchrony Team Chemistry Calculation
 * Calculates team chemistry based on member MS scores and subscale alignment
 * @param {Array} members - Array of member objects with msScore and subscales
 * @returns {Number} Chemistry percentage (45-88 range)
 */
function calculateTeamChemistry(members) {
  if (members.length < 2) return 50;
  
  // Calculate average MS score
  const msScores = members.map(m => m.msScore);
  const avgMS = msScores.reduce((a, b) => a + b, 0) / msScores.length;
  
  // Calculate range factor (optimal range is 15-30 points)
  const range = Math.max(...msScores) - Math.min(...msScores);
  let rangeFactor;
  if (range < 10) {
    rangeFactor = 0.92; // Too similar, less dynamic
  } else if (range <= 15) {
    rangeFactor = 0.98; // Good diversity
  } else if (range <= 25) {
    rangeFactor = 1.0; // Optimal diversity
  } else if (range <= 35) {
    rangeFactor = 0.95; // Getting too diverse
  } else {
    rangeFactor = 0.88; // Too much variance
  }
  
  // Calculate trust foundation (critical for team function)
  const avgTrust = members.reduce((sum, m) => sum + m.subscales.trust, 0) / members.length;
  const trustFactor = avgTrust < 60 ? 0.85 : 
                     avgTrust < 70 ? 0.92 :
                     avgTrust < 75 ? 1.0 :
                     1.02; // High trust bonus
  
  // Calculate subscale alignment
  const alignmentScore = calculateSubscaleAlignment(members);
  
  // Team size modifier
  let sizeModifier;
  if (members.length === 2) {
    sizeModifier = 0.98; // Dyad
  } else if (members.length === 3) {
    sizeModifier = 1.0; // Small team
  } else if (members.length === 4) {
    sizeModifier = 1.02; // Optimal team size
  } else if (members.length === 5) {
    sizeModifier = 1.0; // Good size
  } else {
    sizeModifier = 0.96 - (members.length - 6) * 0.02; // Larger teams have coordination challenges
  }
  
  // Combine factors for final chemistry score
  const baseScore = (avgMS * 0.6 + alignmentScore * 0.4);
  const finalScore = baseScore * rangeFactor * trustFactor * sizeModifier;
  
  // Ensure realistic range (45-88%)
  return Math.min(88, Math.max(45, Math.round(finalScore)));
}

/**
 * Calculate subscale alignment across all 4 dimensions
 * Lower variance = better alignment
 * @param {Array} members - Array of member objects with subscales
 * @returns {Number} Average alignment score across dimensions
 */
function calculateSubscaleAlignment(members) {
  const dimensions = ['understanding', 'trust', 'ease', 'integration'];
  let totalAlignment = 0;
  
  dimensions.forEach(dim => {
    const values = members.map(m => m.subscales[dim]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
    
    // Lower variance = better alignment
    // Variance of 0-100 scaled to alignment score of 100-60
    const alignmentForDim = Math.max(60, 100 - variance * 0.4);
    totalAlignment += alignmentForDim;
  });
  
  return totalAlignment / dimensions.length;
}

/**
 * Find optimal team configurations from available members
 * Tests all possible combinations within size constraints
 * @param {Array} availableMembers - Pool of members to choose from
 * @param {Number} minSize - Minimum team size
 * @param {Number} maxSize - Maximum team size
 * @returns {Array} Top 5 configurations sorted by chemistry score
 */
function findOptimalTeam(availableMembers, minSize = 3, maxSize = 5) {
  const allConfigurations = [];
  
  // Test all team sizes within range
  for (let size = minSize; size <= Math.min(maxSize, availableMembers.length); size++) {
    const combinations = getCombinations(availableMembers, size);
    
    combinations.forEach(combo => {
      const chemistry = calculateTeamChemistry(combo);
      allConfigurations.push({
        members: combo,
        chemistry: chemistry
      });
    });
  }
  
  // Sort by chemistry score descending
  allConfigurations.sort((a, b) => b.chemistry - a.chemistry);
  
  // Return top 5 configurations
  return allConfigurations.slice(0, 5);
}

/**
 * Generate all combinations of array elements of specific size
 * @param {Array} arr - Source array
 * @param {Number} size - Combination size
 * @returns {Array} Array of all combinations
 */
function getCombinations(arr, size) {
  if (size > arr.length) return [];
  if (size === 1) return arr.map(item => [item]);
  
  const combinations = [];
  
  for (let i = 0; i <= arr.length - size; i++) {
    const first = arr[i];
    const rest = arr.slice(i + 1);
    const subCombos = getCombinations(rest, size - 1);
    
    subCombos.forEach(combo => {
      combinations.push([first, ...combo]);
    });
  }
  
  return combinations;
}

// ========================================
// LEGACY CHEMISTRY ALGORITHM (Keep for compatibility)
// ========================================

/**
 * Calculate team chemistry score using Mental Synchrony algorithm
 * Base formula: 70 + (bonuses) = max 95
 */
function calculateChemistryScore(coreTeam = [], extendedTeam = [], bench = []) {
  let score = 70; // Base score
  
  // Core team bonus (3-5 members optimal)
  const coreSize = coreTeam.length;
  if (coreSize >= 3 && coreSize <= 5) {
    score += 15;
  } else if (coreSize > 0) {
    score += Math.min(10, coreSize * 2);
  }
  
  // Extended team bonus (2-4 members optimal)
  const extendedSize = extendedTeam.length;
  if (extendedSize >= 2 && extendedSize <= 4) {
    score += 10;
  } else if (extendedSize > 0) {
    score += Math.min(7, extendedSize * 2);
  }
  
  // Bench diversity bonus
  if (bench.length >= 2) {
    score += 5;
  }
  
  // Cap at 95
  return Math.min(95, score);
}

/**
 * Get chemistry factors based on score
 */
function getChemistryFactors(score) {
  const factors = [];
  
  if (score >= 85) {
    factors.push({ text: 'High Trust Environment', icon: '✓' });
    factors.push({ text: 'Balanced Role Distribution', icon: '✓' });
    factors.push({ text: 'Aligned Goals', icon: '✓' });
    factors.push({ text: 'Strong Communication', icon: '✓' });
  } else if (score >= 75) {
    factors.push({ text: 'Good Team Balance', icon: '✓' });
    factors.push({ text: 'Clear Roles', icon: '✓' });
    factors.push({ text: 'Developing Trust', icon: '◐' });
  } else {
    factors.push({ text: 'Team Size Adjustment Needed', icon: '!' });
    factors.push({ text: 'Role Clarity Required', icon: '!' });
  }
  
  return factors;
}

/**
 * Calculate conflict risk score (inverse of chemistry)
 */
function calculateConflictRisk(member1, member2) {
  // Base risk
  let risk = 30;
  
  // Random variation for demo (in real app, based on survey data)
  risk += Math.floor(Math.random() * 40);
  
  return Math.min(100, risk);
}

/**
 * Get conflict factors breakdown
 */
function getConflictFactors(riskScore) {
  return [
    { name: 'Communication Gaps', value: Math.min(100, riskScore + 5), color: '#ef4444' },
    { name: 'Role Ambiguity', value: Math.max(0, riskScore - 10), color: '#f59e0b' },
    { name: 'Workload Balance', value: Math.min(100, riskScore + 10), color: '#f59e0b' },
    { name: 'Decision-Making Style', value: riskScore, color: '#3b82f6' }
  ];
}

/**
 * Generate intervention recommendations
 */
function getInterventions(riskScore) {
  const interventions = [
    'Schedule weekly 1:1 check-ins to improve communication alignment',
    'Clarify role boundaries and decision-making authority',
    'Implement structured feedback mechanisms (e.g., weekly retros)',
    'Consider workload rebalancing or resource reallocation'
  ];
  
  if (riskScore > 70) {
    interventions.push('Engage external mediator for facilitated conflict resolution');
    interventions.push('Review team structure and consider temporary separation');
  }
  
  return interventions;
}

// ========================================
// TEAM MANAGEMENT
// ========================================

/**
 * Create a new team
 */
function createTeam(name, purpose, members) {
  const team = {
    id: `team-${Date.now()}`,
    name: name,
    purpose: purpose,
    members: members,
    chemistryScore: calculateChemistryScore(members, [], []),
    status: 'pending',
    createdAt: new Date().toISOString(),
    quizProgress: members.map(() => false)
  };
  
  AppState.teams.push(team);
  return team;
}

/**
 * Update team chemistry based on drag-and-drop
 */
function updateTeamChemistry(coreTeam, extendedTeam, bench) {
  const score = calculateChemistryScore(coreTeam, extendedTeam, bench);
  const factors = getChemistryFactors(score);
  
  return { score, factors };
}

// ========================================
// DRAG AND DROP HANDLERS
// ========================================

let draggedElement = null;
let draggedMemberData = null;

/**
 * Initialize drag and drop for optimization module
 */
function initializeDragAndDrop() {
  const draggables = document.querySelectorAll('.draggable-member');
  const dropZones = document.querySelectorAll('.drop-zone');
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
  });
  
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
    zone.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragStart(e) {
  draggedElement = e.target;
  draggedMemberData = JSON.parse(e.target.dataset.member);
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  const targetZone = e.currentTarget;
  const targetZoneId = targetZone.id;
  
  if (draggedElement && draggedMemberData) {
    // Move the element
    const memberCard = draggedElement;
    targetZone.querySelector('.members-grid').appendChild(memberCard);
    
    // Recalculate chemistry
    recalculateChemistry();
  }
}

function recalculateChemistry() {
  const coreMembers = Array.from(document.querySelectorAll('#core-team .draggable-member'))
    .map(el => JSON.parse(el.dataset.member));
  const extendedMembers = Array.from(document.querySelectorAll('#extended-team .draggable-member'))
    .map(el => JSON.parse(el.dataset.member));
  const benchMembers = Array.from(document.querySelectorAll('#bench .draggable-member'))
    .map(el => JSON.parse(el.dataset.member));
  
  const { score, factors } = updateTeamChemistry(coreMembers, extendedMembers, benchMembers);
  
  // Update UI
  updateChemistryDisplay(score, factors);
}

function updateChemistryDisplay(score, factors) {
  const scoreElement = document.getElementById('chemistry-score');
  const factorsContainer = document.getElementById('chemistry-factors');
  
  if (scoreElement) {
    scoreElement.textContent = `${score}%`;
    scoreElement.className = 'score ' + getScoreClass(score);
  }
  
  if (factorsContainer) {
    factorsContainer.innerHTML = factors.map(factor => `
      <div class="factor-tag">
        <span class="factor-icon">${factor.icon}</span>
        <span class="factor-text">${factor.text}</span>
      </div>
    `).join('');
  }
}

function getScoreClass(score) {
  if (score >= 85) return 'excellent';
  if (score >= 75) return 'good';
  return 'needs-improvement';
}

// ========================================
// SLACK SIMULATION
// ========================================

const SLACK_MESSAGES = [
  { delay: 500, text: "🤖 Deploying TeamSync Chemistry Assessment..." },
  { delay: 1500, text: "📋 Survey sent to 5 team members" },
  { delay: 2500, text: "✓ Alex Chen completed (1/5)" },
  { delay: 3500, text: "✓ Jordan Martinez completed (2/5)" },
  { delay: 4500, text: "✓ Sam Kim completed (3/5)" },
  { delay: 5500, text: "🎉 All responses collected! Calculating chemistry..." }
];

function startSlackSimulation() {
  const widget = document.getElementById('slack-widget');
  const messagesContainer = document.getElementById('slack-messages');
  
  if (!widget || !messagesContainer) return;
  
  widget.classList.remove('hidden');
  messagesContainer.innerHTML = '';
  
  SLACK_MESSAGES.forEach((msg, index) => {
    setTimeout(() => {
      const messageEl = document.createElement('div');
      messageEl.className = 'slack-message';
      messageEl.textContent = msg.text;
      messageEl.style.animation = 'slideInMessage 0.3s ease-out';
      messagesContainer.appendChild(messageEl);
      
      // Update progress dots
      updateQuizProgress(index);
      
      // Hide widget after last message
      if (index === SLACK_MESSAGES.length - 1) {
        setTimeout(() => {
          widget.classList.add('hidden');
          completeTeamCreation();
        }, 2000);
      }
    }, msg.delay);
  });
}

function updateQuizProgress(completedCount) {
  const dots = document.querySelectorAll('.progress-dot');
  dots.forEach((dot, index) => {
    if (index <= completedCount) {
      dot.classList.add('completed');
    }
  });
}

function completeTeamCreation() {
  // Mark team as completed
  if (AppState.teams.length > 0) {
    const lastTeam = AppState.teams[AppState.teams.length - 1];
    lastTeam.status = 'completed';
    lastTeam.quizProgress = lastTeam.members.map(() => true);
  }
  
  // Transition to optimize page
  setTimeout(() => {
    showPage('optimize');
  }, 500);
}

// ========================================
// DEMO MODE
// ========================================

function toggleDemoMode() {
  AppState.demoMode = !AppState.demoMode;
  
  const button = document.querySelector('.populate-btn');
  const badge = document.querySelector('.value-badge');
  const welcomeMsg = document.querySelector('.welcome-message');
  
  if (AppState.demoMode) {
    // Activate demo mode
    button.classList.add('active');
    button.innerHTML = '<span class="demo-indicator">DEMO</span> Populated';
    
    // Animate badge counts
    animateBadgeCounts();
    
    // Update welcome message
    if (welcomeMsg) {
      welcomeMsg.textContent = 'Demo mode active - Explore features with sample data';
    }
    
    // Populate sample data
    populateSampleData();
    
  } else {
    // Deactivate demo mode
    button.classList.remove('active');
    button.textContent = 'Populate';
    
    // Reset badge counts
    resetBadgeCounts();
    
    // Reset welcome message
    if (welcomeMsg) {
      welcomeMsg.textContent = 'Select a module to get started';
    }
    
    // Clear sample data
    clearSampleData();
  }
  
  // Persist state
  localStorage.setItem('teamsync-demo-mode', AppState.demoMode);
}

function animateBadgeCounts() {
  const badges = [
    { selector: '[data-module="build"] .module-badge', target: 8 },
    { selector: '[data-module="optimize"] .module-badge', target: 3 },
    { selector: '[data-module="supervisor"] .module-badge', target: 4 },
    { selector: '[data-module="conflict"] .module-badge', target: 2 }
  ];
  
  badges.forEach(badge => {
    const element = document.querySelector(badge.selector);
    if (element) {
      animateCount(element, 0, badge.target, 1000);
    }
  });
}

function animateCount(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

function resetBadgeCounts() {
  document.querySelectorAll('.module-badge').forEach(badge => {
    badge.textContent = '0';
  });
}

function populateSampleData() {
  // Create sample teams
  const sampleTeam = createTeam(
    'Project Phoenix',
    'Q4 Product Launch Initiative',
    MEMBER_POOLS.engineering.slice(0, 5)
  );
  sampleTeam.status = 'completed';
  sampleTeam.chemistryScore = 89;
}

function clearSampleData() {
  AppState.teams = [];
  AppState.selectedMembers = [];
}

// ========================================
// THEME MANAGEMENT
// ========================================

function toggleTheme() {
  AppState.currentTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
  document.body.className = AppState.currentTheme + '-theme';
  
  // Update icon
  const icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = AppState.currentTheme === 'dark' ? '☀️' : '🌙';
  }
  
  // Persist preference
  localStorage.setItem('teamsync-theme', AppState.currentTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('teamsync-theme');
  if (savedTheme) {
    AppState.currentTheme = savedTheme;
    document.body.className = savedTheme + '-theme';
  }
}

// ========================================
// MEMBER SELECTION (Build Team Module)
// ========================================

function toggleMemberSelection(member) {
  const index = AppState.selectedMembers.findIndex(m => m.id === member.id);
  
  if (index > -1) {
    // Remove member
    AppState.selectedMembers.splice(index, 1);
  } else {
    // Add member
    AppState.selectedMembers.push(member);
  }
  
  updateSelectedMembersDisplay();
}

function updateSelectedMembersDisplay() {
  const container = document.getElementById('selected-members-preview');
  if (!container) return;
  
  if (AppState.selectedMembers.length === 0) {
    container.innerHTML = '<p class="empty-state">No members selected</p>';
    return;
  }
  
  container.innerHTML = AppState.selectedMembers.map(member => `
    <div class="selected-member-tag">
      <div class="member-avatar-sm" style="background: ${member.avatarColor}">
        ${member.initials}
      </div>
      <span class="member-name">${member.name}</span>
      <button class="remove-member-btn" onclick="toggleMemberSelection(${JSON.stringify(member).replace(/"/g, '&quot;')})">
        ×
      </button>
    </div>
  `).join('');
}

// ========================================
// SLACK PROMPT GENERATOR
// ========================================

function generateSlackPrompt() {
  const teamName = document.getElementById('team-name')?.value || 'New Team';
  const memberNames = AppState.selectedMembers.map(m => m.name).join(', ');
  
  const prompt = `Hey team! 👋

We're forming "${teamName}" and I'd love to understand how we can work together most effectively.

Please take 5 minutes to complete this quick chemistry assessment:
[Survey Link]

Team members: ${memberNames}

Your responses will help us:
✓ Optimize team collaboration
✓ Identify potential friction points early
✓ Build stronger working relationships

Thanks! 🙏`;

  return prompt;
}

function copySlackPrompt() {
  const prompt = generateSlackPrompt();
  navigator.clipboard.writeText(prompt).then(() => {
    // Show success feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('success');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('success');
    }, 2000);
  });
}

// ========================================
// PHASE 2B - BUILD TEAM MODULE FUNCTIONS
// ========================================

/**
 * Initialize both member pools on Build Team view load
 */
function populateBothPools() {
  populatePool('team', 'teamMemberSelection');
  populatePool('dyad', 'dyadMemberSelection');
}

/**
 * Calculate quiz freshness class based on date
 * @param {string} dateStr - Quiz date in YYYY-MM-DD format
 * @returns {string} CSS class name (fresh/recent/stale/old/none)
 */
function formatQuizDate(dateStr) {
  if (!dateStr) return 'none';
  
  const quizDate = new Date(dateStr);
  const today = new Date();
  const daysDiff = Math.floor((today - quizDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff <= 7) return 'fresh';
  if (daysDiff <= 30) return 'recent';
  if (daysDiff <= 90) return 'stale';
  return 'old';
}

/**
 * Populate a member pool with member cards
 * @param {string} poolType - 'team' or 'dyad'
 * @param {string} containerId - DOM element ID to populate
 */
function populatePool(poolType, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const pool = memberPools[poolType];
  if (!pool) return;
  
  container.innerHTML = pool.map(member => {
    const freshnessClass = formatQuizDate(member.quizDate);
    const isSelected = AppState.selectedMemberIds.includes(member.id);
    
    let badgeText = '';
    let badgeClass = 'member-badge ';
    
    if (freshnessClass === 'none') {
      badgeText = 'No Quiz';
      badgeClass += 'badge-none';
    } else {
      const quizDate = new Date(member.quizDate);
      const today = new Date();
      const daysDiff = Math.floor((today - quizDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) badgeText = 'Today';
      else if (daysDiff === 1) badgeText = '1 day ago';
      else if (daysDiff <= 30) badgeText = `${daysDiff} days ago`;
      else if (daysDiff <= 60) badgeText = '1 month ago';
      else if (daysDiff <= 90) badgeText = `${Math.floor(daysDiff / 30)} months ago`;
      else badgeText = '3+ months ago';
      
      badgeClass += `badge-${freshnessClass}`;
    }
    
    return `
      <div class="member-card ${isSelected ? 'selected' : ''}" 
           data-member-id="${member.id}" 
           data-pool="${poolType}"
           onclick="toggleMember('${poolType}', '${member.id}')">
        <div class="member-avatar">${member.initials}</div>
        <div class="member-info">
          <div class="member-name">${member.name}</div>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        <div class="member-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Toggle between Team and Dyad quiz types
 * @param {string} type - 'team' or 'dyad'
 */
function selectQuizType(type) {
  AppState.currentQuizType = type;
  
  // Update button states
  const teamBtn = document.getElementById('teamQuizBtn');
  const dyadBtn = document.getElementById('dyadQuizBtn');
  
  if (type === 'team') {
    teamBtn?.classList.add('active');
    dyadBtn?.classList.remove('active');
  } else {
    teamBtn?.classList.remove('active');
    dyadBtn?.classList.add('active');
  }
  
  // Toggle pool visibility
  const teamPool = document.getElementById('teamPoolSection');
  const dyadPool = document.getElementById('dyadPoolSection');
  
  if (type === 'team') {
    teamPool?.classList.add('active');
    dyadPool?.classList.remove('active');
  } else {
    teamPool?.classList.remove('active');
    dyadPool?.classList.add('active');
  }
  
  // Update selection hint
  const selectionHint = document.getElementById('selectionHint');
  if (selectionHint) {
    selectionHint.textContent = type === 'team' 
      ? '(Select 3-8 members for Team assessment)'
      : '(Select exactly 2 members for Dyad assessment)';
  }
  
  // Clear selections when switching types
  AppState.selectedMemberIds = [];
  
  // Refresh both pools to clear selection states
  populateBothPools();
  updateSelectionCounter();
  validateForm();
}

/**
 * Toggle member selection
 * @param {string} poolType - 'team' or 'dyad'
 * @param {string} memberId - Member ID to toggle
 */
function toggleMember(poolType, memberId) {
  const index = AppState.selectedMemberIds.indexOf(memberId);
  
  if (index > -1) {
    // Remove member
    AppState.selectedMemberIds.splice(index, 1);
  } else {
    // Add member
    AppState.selectedMemberIds.push(memberId);
  }
  
  // Update the visual state of the clicked card
  const card = document.querySelector(`[data-member-id="${memberId}"]`);
  if (card) {
    card.classList.toggle('selected');
  }
  
  updateSelectionCounter();
  validateForm();
}

/**
 * Filter members by search query
 * @param {string} poolType - 'team' or 'dyad'
 */
function filterMembers(poolType) {
  const searchId = poolType === 'team' ? 'teamMemberSearch' : 'dyadMemberSearch';
  const searchInput = document.getElementById(searchId);
  const query = searchInput?.value.toLowerCase() || '';
  
  const containerId = poolType === 'team' ? 'teamMemberSelection' : 'dyadMemberSelection';
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const memberCards = container.querySelectorAll('.member-card');
  
  memberCards.forEach(card => {
    const memberName = card.querySelector('.member-name')?.textContent.toLowerCase() || '';
    if (memberName.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Update selection counter display
 */
function updateSelectionCounter() {
  const counter = document.getElementById('selectedCount');
  if (counter) {
    counter.textContent = AppState.selectedMemberIds.length;
  }
}

/**
 * Validate form and enable/disable Analyze button
 */
function validateForm() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const teamNameInput = document.getElementById('teamNameInput');
  
  if (!analyzeBtn || !teamNameInput) return;
  
  const hasName = teamNameInput.value.trim().length > 0;
  const memberCount = AppState.selectedMemberIds.length;
  
  let isValid = false;
  
  if (AppState.currentQuizType === 'team') {
    // Team needs 3-8 members + name
    isValid = hasName && memberCount >= 3 && memberCount <= 8;
  } else {
    // Dyad needs exactly 2 members + name
    isValid = hasName && memberCount === 2;
  }
  
  analyzeBtn.disabled = !isValid;
}

/**
 * Refresh team name suggestion
 */
function refreshTeamName() {
  AppState.currentNameIndex = (AppState.currentNameIndex + 1) % TEAM_NAMES.length;
  const suggestedName = document.getElementById('suggestedName');
  if (suggestedName) {
    suggestedName.textContent = TEAM_NAMES[AppState.currentNameIndex];
  }
}

/**
 * Use suggested team name (click handler)
 */
function useSuggestedName() {
  const teamNameInput = document.getElementById('teamNameInput');
  const suggestedName = document.getElementById('suggestedName');
  
  if (teamNameInput && suggestedName) {
    teamNameInput.value = suggestedName.textContent;
    validateForm();
  }
}

// ========================================
// INITIALIZATION
// ========================================

function initializeApp() {
  // Load saved theme
  loadTheme();
  
  // Load demo mode state
  const savedDemoMode = localStorage.getItem('teamsync-demo-mode');
  if (savedDemoMode === 'true') {
    AppState.demoMode = true;
    populateSampleData();
  }
  
  console.log('TeamSync AI initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// ========================================
// EXPORT FOR GLOBAL ACCESS
// ========================================

window.TeamSyncApp = {
  // State
  state: AppState,
  
  // V45 Functions - Mental Synchrony Algorithms
  calculateTeamChemistry,
  calculateSubscaleAlignment,
  findOptimalTeam,
  getCombinations,
  
  // Phase 2B - Build Team Functions
  populateBothPools,
  populatePool,
  formatQuizDate,
  selectQuizType,
  toggleMember,
  filterMembers,
  updateSelectionCounter,
  validateForm,
  refreshTeamName,
  useSuggestedName,
  
  // Legacy Functions
  calculateChemistryScore,
  calculateConflictRisk,
  getConflictFactors,
  getInterventions,
  createTeam,
  toggleMemberSelection,
  toggleDemoMode,
  toggleTheme,
  startSlackSimulation,
  copySlackPrompt,
  initializeDragAndDrop,
  
  // V45 Data
  memberPools: memberPools,
  teamNames: TEAM_NAMES,
  
  // Legacy Data
  memberPoolsLegacy: MEMBER_POOLS,
  supervisors: SUPERVISORS
};
