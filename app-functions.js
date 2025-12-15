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
 * Calculate individual subscale scores for display
 * @param {Array} members - Team members
 * @returns {Object} Object with understanding, trust, ease, integration scores
 */
function calculateIndividualSubscales(members) {
  const dimensions = ['understanding', 'trust', 'ease', 'integration'];
  const subscaleScores = {};
  
  dimensions.forEach(dim => {
    const values = members.map(m => m.subscales[dim]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
    
    // Lower variance = better alignment
    // Variance of 0-100 scaled to alignment score of 100-60
    const alignmentForDim = Math.max(60, 100 - variance * 0.4);
    subscaleScores[dim] = Math.round(alignmentForDim);
  });
  
  return subscaleScores;
}

/**
 * Find optimal team configurations from available members
 * Tests all possible combinations within size constraints
 * @param {Array} availableMembers - Pool of members to choose from
 * @param {Number} minSize - Minimum team size (default: 3)
 * @param {Number} maxSize - Maximum team size (default: 8)
 * @returns {Array} Top 5 configurations sorted by chemistry score
 */
function findOptimalTeam(availableMembers, minSize = 3, maxSize = 8) {
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
✓ Identify potential disconnect points early
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
  console.log('Populating both pools...');
  
  // CRITICAL: Explicitly clear both pool containers FIRST
  const teamContainer = document.getElementById('teamMemberSelection');
  const dyadContainer = document.getElementById('dyadMemberSelection');
  
  if (teamContainer) {
    teamContainer.innerHTML = '';
  }
  if (dyadContainer) {
    dyadContainer.innerHTML = '';
  }
  
  // Now populate fresh
  populatePool('team', 'teamMemberSelection');
  populatePool('dyad', 'dyadMemberSelection');
  
  console.log('Both pools populated');
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
      ? '(Select 3+ candidates - AI will find optimal team from this pool)'
      : '(Select 2+ candidates - AI will find optimal pair from this pool)';
  }
  
  // Clear selections when switching types
  AppState.selectedMemberIds = [];
  
  // Refresh both pools to clear selection states
  populateBothPools();
  updateSelectionCounter();
  
  // CRITICAL: Run validation after switching to update button state
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
  
  // AUTO-POPULATE NAME and trigger validation with proper timing
  // autoPopulateTeamName handles validation internally with setTimeout
  autoPopulateTeamName();
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
 * Auto-populate team name if empty and member count is valid
 */
function autoPopulateTeamName() {
  const teamNameInput = document.getElementById('teamNameInput');
  if (!teamNameInput) return;
  
  // Only auto-populate if field is currently empty
  const shouldTryPopulate = teamNameInput.value.trim().length === 0;
  
  if (shouldTryPopulate) {
    const memberCount = AppState.selectedMemberIds.length;
    const quizType = AppState.currentQuizType;
    
    let shouldAutoPopulate = false;
    
    if (quizType === 'team' && memberCount >= 3) {
      // Team mode: auto-populate when we have at least 3 members
      shouldAutoPopulate = true;
    } else if (quizType === 'dyad' && memberCount >= 2) {
      // Dyad mode: auto-populate when we have 2 members
      shouldAutoPopulate = true;
    }
    
    if (shouldAutoPopulate) {
      // Use current name from rotation
      teamNameInput.value = TEAM_NAMES[AppState.currentNameIndex];
      console.log('✨ Auto-populated team name:', teamNameInput.value);
    }
  }
  
  // CRITICAL: ALWAYS trigger validation after any selection change
  // Use setTimeout to ensure DOM has fully updated
  setTimeout(() => {
    validateForm();
  }, 10);
}

/**
 * Validate form and enable/disable Analyze button
 */
function validateForm() {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const teamNameInput = document.getElementById('teamNameInput');
  
  // Guard clause - elements must exist
  if (!analyzeBtn || !teamNameInput) {
    console.warn('validateForm: Missing DOM elements');
    return;
  }
  
  const hasName = teamNameInput.value.trim().length > 0;
  const memberCount = AppState.selectedMemberIds.length;
  const quizType = AppState.currentQuizType;
  
  let isValid = false;
  let reason = '';
  
  if (quizType === 'team') {
    // Team needs at least 3 members in pool + name
    // AI will find optimal 3-5 person team from this pool
    isValid = hasName && memberCount >= 3;
    if (!isValid) {
      if (!hasName) reason = 'Missing name';
      else if (memberCount < 3) reason = 'Need at least 3 candidates in pool';
    }
  } else if (quizType === 'dyad') {
    // Dyad needs at least 2 members in pool + name
    // AI will find optimal 2-person pair from this pool
    isValid = hasName && memberCount >= 2;
    if (!isValid) {
      if (!hasName) reason = 'Missing name';
      else if (memberCount < 2) reason = 'Need at least 2 candidates in pool';
    }
  }
  
  // Update button state
  analyzeBtn.disabled = !isValid;
  
  // Enhanced debug logging
  console.log('🔍 VALIDATION CHECK:', {
    quizType,
    hasName,
    nameValue: teamNameInput.value,
    memberCount,
    poolSize: memberCount,
    selectedIds: AppState.selectedMemberIds,
    isValid,
    buttonDisabled: analyzeBtn.disabled,
    reason: isValid ? 'VALID ✅ - AI will optimize from this pool' : reason
  });
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

/**
 * Initialize Build Team view - called when view loads
 */
function initializeBuildTeamView() {
  console.log('Initializing Build Team view...');
  
  // Ensure default quiz type
  AppState.currentQuizType = 'team';
  
  // Clear any existing selections
  AppState.selectedMemberIds = [];
  
  // Populate both pools
  populateBothPools();
  
  // Update UI elements
  updateSelectionCounter();
  
  // Set quiz type buttons to correct state
  const teamBtn = document.getElementById('teamQuizBtn');
  const dyadBtn = document.getElementById('dyadQuizBtn');
  if (teamBtn) teamBtn.classList.add('active');
  if (dyadBtn) dyadBtn.classList.remove('active');
  
  // Show correct pool
  const teamPool = document.getElementById('teamPoolSection');
  const dyadPool = document.getElementById('dyadPoolSection');
  if (teamPool) teamPool.classList.add('active');
  if (dyadPool) dyadPool.classList.remove('active');
  
  // Clear team name input
  const teamNameInput = document.getElementById('teamNameInput');
  if (teamNameInput) teamNameInput.value = '';
  
  // Set up name suggestion (show current name in rotation)
  const suggestedName = document.getElementById('suggestedName');
  if (suggestedName) {
    suggestedName.textContent = TEAM_NAMES[AppState.currentNameIndex];
  }
  
  // Hide processing status
  const processingStatus = document.getElementById('processingStatus');
  if (processingStatus) processingStatus.style.display = 'none';
  
  // Run validation to set button state
  validateForm();
  
  console.log('Build Team view initialized, suggested name:', TEAM_NAMES[AppState.currentNameIndex]);
}

// ========================================
// PHASE 2C - ANALYSIS WORKFLOW FUNCTIONS
// ========================================

/**
 * Main entry point - Analyze Team Chemistry button click
 */
function analyzeTeamChemistry() {
  const teamNameInput = document.getElementById('teamNameInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const processingStatus = document.getElementById('processingStatus');
  const statusText = document.getElementById('statusText');
  
  if (!teamNameInput || !analyzeBtn) return;
  
  const teamName = teamNameInput.value.trim();
  if (!teamName || AppState.selectedMemberIds.length === 0) return;
  
  // Disable button and show processing
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';
  
  if (processingStatus) {
    processingStatus.style.display = 'block';
  }
  if (statusText) {
    statusText.textContent = 'Analyzing team composition...';
  }
  
  // Run async simulation
  simulateInstantResults(teamName);
}

/**
 * Simulate instant results workflow with AI optimization
 * @param {string} teamName - Name of the team
 */
function simulateInstantResults(teamName) {
  const statusText = document.getElementById('statusText');
  
  // Get selected members (this is the POOL of candidates)
  const currentPool = AppState.currentQuizType === 'team' ? memberPools.team : memberPools.dyad;
  const selectedPool = currentPool.filter(m => AppState.selectedMemberIds.includes(m.id));
  
  // Step 1: Show pool analysis (1 second delay)
  setTimeout(() => {
    if (statusText) {
      statusText.textContent = 'Analyzing pool of ' + selectedPool.length + ' candidates...';
    }
    
    // Step 2: Run AI optimization to find best team
    setTimeout(() => {
      if (statusText) {
        statusText.textContent = 'AI finding optimal configuration...';
      }
      
      // Run findOptimalTeam - returns ARRAY of top 5 results
      let optimalResults;
      
      if (AppState.currentQuizType === 'dyad') {
        // For dyad, find best 2-member combination
        optimalResults = findOptimalTeam(selectedPool, 2, 2);
      } else {
        // For team, find best 3-8 member combination from pool
        const maxSize = Math.min(8, selectedPool.length);
        optimalResults = findOptimalTeam(selectedPool, 3, maxSize);
      }
      
      // Get the BEST result (first in array)
      const bestResult = optimalResults[0];
      
      // Store the AI-recommended optimal configuration
      window.currentOptimalTeam = bestResult.members.map(m => m.id);
      window.currentOptimalScore = bestResult.chemistry;
      window.currentTeamPool = selectedPool; // Store full pool for optimizer
      
      const optimalChemistry = bestResult.chemistry;
      const optimalSize = bestResult.members.length;
      
      // Step 3: Show AI results (2 seconds total)
      setTimeout(() => {
        if (statusText) {
          const configType = AppState.currentQuizType === 'dyad' ? 'pair' : 'team';
          statusText.textContent = `AI found optimal ${configType}: ${optimalSize} members with ${optimalChemistry}% chemistry!`;
        }
        
        // Step 4: Add team card and reset (2.5 seconds total)
        setTimeout(() => {
          addNewTeamToList(teamName, optimalSize, optimalChemistry, bestResult.members);
          resetFormAfterSuccess();
        }, 500);
      }, 1000);
    }, 1000);
  }, 1000);
}

/**
 * Add new team card to Active Assessments list
 * @param {string} teamName - Name of the team
 * @param {number} memberCount - Number of members in optimal team
 * @param {number} chemistryScore - Chemistry percentage
 * @param {Array} optimalMembers - Array of optimal member objects (optional)
 */
function addNewTeamToList(teamName, memberCount, chemistryScore, optimalMembers = []) {
  const existingTeamsList = document.getElementById('existingTeamsList');
  if (!existingTeamsList) return;
  
  // Remove empty state if present
  const emptyState = existingTeamsList.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
  
  // Store team data for optimizer view
  const teamData = {
    name: teamName,
    chemistry: chemistryScore,
    memberCount: memberCount,
    // Convert member objects to IDs if needed
    optimalMembers: optimalMembers.length > 0 
      ? optimalMembers.map(m => typeof m === 'string' ? m : m.id)
      : (window.currentOptimalTeam || []),
    // Store the full pool for optimizer view
    teamPool: window.currentTeamPool || (AppState.currentQuizType === 'team' ? memberPools.team : memberPools.dyad),
    quizType: AppState.currentQuizType,
    createdAt: new Date().toISOString()
  };
  
  // Create team card HTML
  const teamCard = document.createElement('div');
  teamCard.className = 'team-card';
  teamCard.setAttribute('data-team-name', teamName);
  teamCard.innerHTML = `
    <div class="team-card-header">
      <div class="team-card-info">
        <div class="team-card-name">${teamName}</div>
        <div class="team-card-meta">${memberCount} members • Created just now</div>
      </div>
      <div class="team-card-actions">
        <div class="team-progress-dots">
          ${Array(memberCount).fill('<div class="progress-dot completed"></div>').join('')}
        </div>
        <button class="chemistry-badge" onclick="openOptimizerForTeam('${teamName}', ${chemistryScore})">
          ${chemistryScore}% Chemistry
        </button>
      </div>
    </div>
  `;
  
  // Store team data in DOM for later retrieval
  teamCard.teamData = teamData;
  
  // Add animation class
  teamCard.style.opacity = '0';
  teamCard.style.transform = 'translateY(-20px)';
  
  // Insert at top of list
  existingTeamsList.insertBefore(teamCard, existingTeamsList.firstChild);
  
  // Trigger animation
  setTimeout(() => {
    teamCard.style.transition = 'all 0.4s ease';
    teamCard.style.opacity = '1';
    teamCard.style.transform = 'translateY(0)';
  }, 10);
}

/**
 * Reset form after successful team creation
 */
function resetFormAfterSuccess() {
  console.log('RESETTING FORM AFTER SUCCESS...');
  
  const analyzeBtn = document.getElementById('analyzeBtn');
  const processingStatus = document.getElementById('processingStatus');
  const teamNameInput = document.getElementById('teamNameInput');
  
  // Hide processing status
  if (processingStatus) {
    processingStatus.style.display = 'none';
  }
  
  // Reset button
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyze Team Chemistry';
  }
  
  // Clear team name
  if (teamNameInput) {
    teamNameInput.value = '';
  }
  
  // ROTATE NAME INDEX: Next team gets different name
  AppState.currentNameIndex = (AppState.currentNameIndex + 1) % TEAM_NAMES.length;
  console.log('Next team name will be:', TEAM_NAMES[AppState.currentNameIndex]);
  
  // Update suggested name display
  const suggestedName = document.getElementById('suggestedName');
  if (suggestedName) {
    suggestedName.textContent = TEAM_NAMES[AppState.currentNameIndex];
  }
  
  // CRITICAL: Clear all selections from state
  AppState.selectedMemberIds = [];
  console.log('Cleared selected members');
  
  // CRITICAL: Refresh both pools to clear visual selection states
  populateBothPools();
  
  // CRITICAL: Update counter
  updateSelectionCounter();
  
  // CRITICAL: Run validation to ensure form is in correct state
  validateForm();
  
  console.log('Form reset complete, ready for next team');
  
  // Show brief success message
  const statusText = document.getElementById('statusText');
  if (statusText && processingStatus) {
    statusText.textContent = 'Team created successfully! Ready for next team.';
    processingStatus.style.display = 'block';
    processingStatus.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))';
    processingStatus.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    
    setTimeout(() => {
      processingStatus.style.display = 'none';
      processingStatus.style.background = '';
      processingStatus.style.borderColor = '';
      
      // CRITICAL: Ensure validation runs one more time after success message clears
      validateForm();
      
      console.log('Success message cleared, form fully ready');
    }, 2000);
  }
}

/**
 * Open Optimizer view for a specific team (Phase 3A)
 * @param {string} teamName - Name of the team
 * @param {number} chemistry - Chemistry score
 */
function openOptimizerForTeam(teamName, chemistry) {
  console.log('Opening Optimizer View for:', teamName, 'Chemistry:', chemistry);
  
  // Find team card in DOM to get stored team data
  const teamCards = document.querySelectorAll('.team-card');
  let teamData = null;
  
  for (let card of teamCards) {
    if (card.getAttribute('data-team-name') === teamName) {
      teamData = card.teamData;
      break;
    }
  }
  
  if (!teamData) {
    console.error('Team data not found for:', teamName);
    return;
  }
  
  // Store optimizer state globally
  window.optimizerState = {
    teamName: teamName,
    originalChemistry: chemistry,
    currentOptimalTeam: teamData.optimalMembers || [],
    currentTeamPool: teamData.teamPool || (teamData.quizType === 'team' ? memberPools.team : memberPools.dyad),
    quizType: teamData.quizType,
    isOverridden: false
  };
  
  console.log('Optimizer state:', window.optimizerState);
  
  // Update optimizer view header
  document.getElementById('optimizerTeamName').textContent = teamName;
  document.getElementById('optimizerChemistry').textContent = chemistry;
  
  // Update hero chemistry score
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Update large chemistry score display
  document.getElementById('liveChemistryScore').textContent = chemistry;
  
  // Populate member lists (Phase 3B)
  populateOptimizerView();
  
  // Hide Build Team view, show Optimizer view
  document.getElementById('buildView').classList.add('hidden');
  document.getElementById('optimizerView').classList.remove('hidden');
  
  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  console.log('Optimizer View opened successfully');
}

/**
 * Populate Optimizer View with member cards (Phase 3B)
 */
function populateOptimizerView() {
  if (!window.optimizerState) {
    console.error('No optimizer state found');
    return;
  }
  
  console.log('Populating Optimizer View...');
  console.log('Optimizer state:', window.optimizerState);
  
  const { currentOptimalTeam, currentTeamPool, quizType } = window.optimizerState;
  
  console.log('Current optimal team IDs:', currentOptimalTeam);
  console.log('Current team pool:', currentTeamPool);
  
  // Get containers
  const optimalContainer = document.getElementById('optimalTeamContainer');
  const remainingContainer = document.getElementById('remainingPoolContainer');
  
  // Clear containers
  optimalContainer.innerHTML = '';
  remainingContainer.innerHTML = '';
  
  // Filter pool to get remaining members (not in optimal team)
  const remainingMembers = currentTeamPool.filter(member => 
    !currentOptimalTeam.includes(member.id)
  );
  
  console.log('Optimal team members:', currentOptimalTeam.length);
  console.log('Remaining pool members:', remainingMembers.length);
  
  // Populate optimal team
  currentOptimalTeam.forEach(memberId => {
    const member = currentTeamPool.find(m => m.id === memberId);
    if (member) {
      optimalContainer.appendChild(createOptimizerMemberCard(member, true));
    } else {
      console.warn('Member not found in pool:', memberId);
    }
  });
  
  // Populate remaining pool
  remainingMembers.forEach(member => {
    remainingContainer.appendChild(createOptimizerMemberCard(member, false));
  });
  
  // Update size badges
  document.getElementById('optimalTeamSize').textContent = 
    `${currentOptimalTeam.length} member${currentOptimalTeam.length !== 1 ? 's' : ''}`;
  document.getElementById('remainingPoolSize').textContent = 
    `${remainingMembers.length} member${remainingMembers.length !== 1 ? 's' : ''}`;
  
  console.log('Optimizer View populated successfully');
  
  // Initialize drag and drop
  initializeOptimizerDragDrop();
  
  // Calculate and display chemistry
  recalculateChemistry();
}

/**
 * Create an optimizer member card (Phase 3B)
 * @param {Object} member - Member data
 * @param {boolean} isOptimal - Whether this is in the optimal team
 */
function createOptimizerMemberCard(member, isOptimal) {
  const card = document.createElement('div');
  card.className = `optimizer-member-card${isOptimal ? ' optimal' : ''}`;
  card.setAttribute('draggable', 'true');
  card.setAttribute('data-member-id', member.id);
  
  // Get initials for avatar
  const nameParts = member.name.split(' ');
  const initials = nameParts.length >= 2 
    ? nameParts[0][0] + nameParts[1][0]
    : nameParts[0][0] + (nameParts[0][1] || '');
  
  // Determine freshness class
  const freshnessClass = formatQuizDate(member.lastQuiz);
  
  // Determine freshness label
  let freshnessLabel = 'Fresh';
  if (freshnessClass === 'recent') freshnessLabel = 'Recent';
  else if (freshnessClass === 'stale') freshnessLabel = 'Stale';
  else if (freshnessClass === 'old') freshnessLabel = 'Old';
  
  card.innerHTML = `
    <div class="optimizer-member-avatar">${initials.toUpperCase()}</div>
    <div class="optimizer-member-info">
      <div class="optimizer-member-name">${member.name}</div>
    </div>
  `;
  
  return card;
}

/**
 * Toggle subscale components display (Phase 3C)
 */
function toggleSubscales() {
  const toggle = document.getElementById('subscaleToggle');
  const content = document.getElementById('subscaleContent');
  
  const isExpanded = content.classList.contains('expanded');
  
  if (isExpanded) {
    content.classList.remove('expanded');
    toggle.classList.remove('expanded');
    content.style.display = 'none';
  } else {
    content.classList.add('expanded');
    toggle.classList.add('expanded');
    content.style.display = 'block';
  }
}

/**
 * Initialize drag and drop for optimizer view (Phase 3C)
 */
function initializeOptimizerDragDrop() {
  console.log('Initializing drag and drop...');
  
  const optimalContainer = document.getElementById('optimalTeamContainer');
  const remainingContainer = document.getElementById('remainingPoolContainer');
  const optimalDropZone = document.getElementById('optimalDropZone');
  const poolDropZone = document.getElementById('poolDropZone');
  
  // Enable drag events on containers
  [optimalContainer, remainingContainer].forEach(container => {
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragleave', handleDragLeave);
  });
  
  // Initialize draggable cards
  updateDraggableCards();
  
  console.log('Drag and drop initialized');
}

/**
 * Update draggable cards with event listeners
 */
function updateDraggableCards() {
  const cards = document.querySelectorAll('.optimizer-member-card');
  
  cards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
  });
}

/**
 * Handle drag start
 */
function handleDragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-member-id'));
  e.target.style.opacity = '0.5';
  
  // Show appropriate drop zone
  const isOptimal = e.target.classList.contains('optimal');
  if (isOptimal) {
    document.getElementById('poolDropZone').style.display = 'flex';
  } else {
    document.getElementById('optimalDropZone').style.display = 'flex';
  }
}

/**
 * Handle drag end
 */
function handleDragEnd(e) {
  e.target.style.opacity = '1';
  
  // Hide all drop zones
  document.getElementById('optimalDropZone').style.display = 'none';
  document.getElementById('poolDropZone').style.display = 'none';
}

/**
 * Handle drag over
 */
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  
  // Highlight drop zone
  const container = e.currentTarget;
  if (container.id === 'optimalTeamContainer') {
    const dropZone = document.getElementById('optimalDropZone');
    if (dropZone.style.display === 'flex') {
      dropZone.classList.add('active');
    }
  } else if (container.id === 'remainingPoolContainer') {
    const dropZone = document.getElementById('poolDropZone');
    if (dropZone.style.display === 'flex') {
      dropZone.classList.add('active');
    }
  }
}

/**
 * Handle drag leave
 */
function handleDragLeave(e) {
  // Remove highlight from drop zones
  document.querySelectorAll('.drop-zone-indicator').forEach(zone => {
    zone.classList.remove('active');
  });
}

/**
 * Handle drop
 */
function handleDrop(e) {
  e.preventDefault();
  
  const memberId = e.dataTransfer.getData('text/plain');
  const targetContainer = e.currentTarget;
  
  console.log('Dropped member:', memberId, 'into:', targetContainer.id);
  
  // Move member between lists
  if (targetContainer.id === 'optimalTeamContainer') {
    moveToOptimalTeam(memberId);
  } else if (targetContainer.id === 'remainingPoolContainer') {
    moveToRemainingPool(memberId);
  }
  
  // Remove drop zone highlights
  document.querySelectorAll('.drop-zone-indicator').forEach(zone => {
    zone.classList.remove('active');
  });
}

/**
 * Move member to optimal team
 */
function moveToOptimalTeam(memberId) {
  if (!window.optimizerState) return;
  
  // Add to optimal team if not already there
  if (!window.optimizerState.currentOptimalTeam.includes(memberId)) {
    window.optimizerState.currentOptimalTeam.push(memberId);
    
    // Mark as overridden
    window.optimizerState.isOverridden = true;
    document.getElementById('overrideCheckbox').checked = true;
    handleOverrideToggle();
    
    // Repopulate view
    populateOptimizerView();
    
    // Recalculate chemistry
    recalculateChemistry();
    
    // Reinitialize drag and drop
    updateDraggableCards();
  }
}

/**
 * Move member to remaining pool
 */
function moveToRemainingPool(memberId) {
  if (!window.optimizerState) return;
  
  // Allow removal - we'll show N/A if team becomes too small
  const index = window.optimizerState.currentOptimalTeam.indexOf(memberId);
  if (index > -1) {
    window.optimizerState.currentOptimalTeam.splice(index, 1);
    
    // Mark as overridden
    window.optimizerState.isOverridden = true;
    document.getElementById('overrideCheckbox').checked = true;
    handleOverrideToggle();
    
    // Repopulate view
    populateOptimizerView();
    
    // Recalculate chemistry (will show N/A if too small)
    recalculateChemistry();
    
    // Reinitialize drag and drop
    updateDraggableCards();
  }
}

/**
 * Recalculate team chemistry based on current optimal team
 */
function recalculateChemistry() {
  if (!window.optimizerState) return;
  
  const { currentOptimalTeam, currentTeamPool, quizType } = window.optimizerState;
  const minTeamSize = quizType === 'dyad' ? 2 : 3;
  const maxTeamSize = quizType === 'dyad' ? 2 : 8;
  
  // Get member objects for current team
  const teamMembers = currentOptimalTeam
    .map(id => currentTeamPool.find(m => m.id === id))
    .filter(m => m); // Remove any nulls
  
  // Check if team size is valid (must be within min and max range)
  if (teamMembers.length < minTeamSize || teamMembers.length > maxTeamSize) {
    // Invalid team size - show N/A
    document.getElementById('heroChemistryScore').textContent = 'N/A';
    document.getElementById('liveChemistryScore').textContent = '--';
    document.getElementById('subscaleUnderstanding').textContent = 'N/A';
    document.getElementById('subscaleTrust').textContent = 'N/A';
    document.getElementById('subscaleEase').textContent = 'N/A';
    document.getElementById('subscaleIntegration').textContent = 'N/A';
    
    if (teamMembers.length < minTeamSize) {
      console.log(`Team too small (${teamMembers.length}), minimum is ${minTeamSize}`);
    } else {
      console.log(`Team too large (${teamMembers.length}), maximum is ${maxTeamSize} for ${quizType} mode`);
    }
    return;
  }
  
  // Calculate chemistry using Mental Synchrony algorithm
  const chemistry = calculateTeamChemistry(teamMembers);
  
  // Calculate individual subscale scores by averaging member subscales
  console.log('Team members for subscale calc:', teamMembers.map(m => ({ id: m.id, subscales: m.subscales })));
  
  const subscales = {
    understanding: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.understanding || 0), 0) / teamMembers.length),
    trust: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.trust || 0), 0) / teamMembers.length),
    ease: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.ease || 0), 0) / teamMembers.length),
    integration: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.integration || 0), 0) / teamMembers.length)
  };
  
  console.log('Calculated subscales:', subscales);
  
  // Update hero chemistry score
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Update main chemistry score
  document.getElementById('liveChemistryScore').textContent = chemistry;
  
  // Update subscale scores
  const understandingEl = document.getElementById('subscaleUnderstanding');
  const trustEl = document.getElementById('subscaleTrust');
  const easeEl = document.getElementById('subscaleEase');
  const integrationEl = document.getElementById('subscaleIntegration');
  
  console.log('Found elements:', {
    understanding: understandingEl,
    trust: trustEl,
    ease: easeEl,
    integration: integrationEl
  });
  
  if (understandingEl) {
    understandingEl.textContent = subscales.understanding + '%';
    console.log('Set understanding to:', understandingEl.textContent);
  } else {
    console.error('subscaleUnderstanding element NOT FOUND');
  }
  
  if (trustEl) {
    trustEl.textContent = subscales.trust + '%';
    console.log('Set trust to:', trustEl.textContent);
  } else {
    console.error('subscaleTrust element NOT FOUND');
  }
  
  if (easeEl) {
    easeEl.textContent = subscales.ease + '%';
    console.log('Set ease to:', easeEl.textContent);
  } else {
    console.error('subscaleEase element NOT FOUND');
  }
  
  if (integrationEl) {
    integrationEl.textContent = subscales.integration + '%';
    console.log('Set integration to:', integrationEl.textContent);
  } else {
    console.error('subscaleIntegration element NOT FOUND');
  }
  
  console.log('Subscale elements updated:', {
    understanding: understandingEl?.textContent,
    trust: trustEl?.textContent,
    ease: easeEl?.textContent,
    integration: integrationEl?.textContent
  });
  
  console.log('Chemistry recalculated:', chemistry, 'Subscales:', subscales);
}

/**
 * Close Optimizer View and return to Build Team (Phase 3A)
 */
function closeOptimizerView() {
  console.log('Closing Optimizer View');
  
  // Clear optimizer state
  window.optimizerState = null;
  
  // Hide Optimizer view, show Build Team view
  document.getElementById('optimizerView').classList.add('hidden');
  document.getElementById('buildView').classList.remove('hidden');
}

/**
 * Handle Override Checkbox Toggle (Phase 3A - UI only, logic in Phase 3C)
 */
function handleOverrideToggle() {
  const checkbox = document.getElementById('overrideCheckbox');
  const isChecked = checkbox.checked;
  
  console.log('Override toggled:', isChecked);
  
  if (window.optimizerState) {
    window.optimizerState.isOverridden = isChecked;
  }
  
  // Update UI states
  const deployBtn = document.getElementById('deployToSlackBtn');
  const resetBtn = document.getElementById('resetToAIBtn');
  const comparison = document.getElementById('chemistryComparison');
  
  if (isChecked) {
    // Manual override mode
    deployBtn.classList.add('overridden');
    resetBtn.style.display = 'flex';
    comparison.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: var(--warning);">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <span>Manual configuration</span>
    `;
    comparison.classList.add('warning');
  } else {
    // AI recommendation mode
    deployBtn.classList.remove('overridden');
    resetBtn.style.display = 'none';
    comparison.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: var(--success);">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
      <span>Using AI recommendation</span>
    `;
    comparison.classList.remove('warning');
  }
  
  console.log('Override UI updated');
}

/**
 * Deploy Team to Slack (Phase 3C placeholder)
 */
function deployTeamToSlack() {
  if (!window.optimizerState) {
    console.error('No optimizer state found');
    return;
  }
  
  const isOverridden = window.optimizerState.isOverridden;
  
  // Phase 3C will implement actual Slack deployment
  alert(`Deploy to Slack (Phase 3C)\n\nTeam: ${window.optimizerState.teamName}\nConfiguration: ${isOverridden ? 'Manual Override' : 'AI Recommendation'}\n\nThis will integrate with Slack API in Phase 3C.`);
}

/**
 * Reset to AI Recommendation (Phase 3C)
 */
function resetToAIRecommendation() {
  console.log('Resetting to AI recommendation');
  
  if (!window.optimizerState) return;
  
  // Find the original team data
  const teamName = window.optimizerState.teamName;
  const teamCards = document.querySelectorAll('.team-card');
  let originalTeamData = null;
  
  for (let card of teamCards) {
    if (card.getAttribute('data-team-name') === teamName) {
      originalTeamData = card.teamData;
      break;
    }
  }
  
  if (originalTeamData) {
    // Restore original optimal team
    window.optimizerState.currentOptimalTeam = [...originalTeamData.optimalMembers];
    window.optimizerState.isOverridden = false;
    
    // Uncheck override
    const checkbox = document.getElementById('overrideCheckbox');
    checkbox.checked = false;
    
    // Trigger UI update
    handleOverrideToggle();
    
    // Repopulate view with original team
    populateOptimizerView();
    
    console.log('Restored to AI recommendation:', originalTeamData.optimalMembers);
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
  calculateIndividualSubscales,
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
  autoPopulateTeamName,
  validateForm,
  refreshTeamName,
  useSuggestedName,
  initializeBuildTeamView,
  
  // Phase 2C - Analysis Workflow Functions
  analyzeTeamChemistry,
  simulateInstantResults,
  addNewTeamToList,
  resetFormAfterSuccess,
  
  // Phase 3A - Optimizer View Functions
  openOptimizerForTeam,
  closeOptimizerView,
  handleOverrideToggle,
  deployTeamToSlack,
  resetToAIRecommendation,
  
  // Phase 3B - Optimizer Member Population
  populateOptimizerView,
  createOptimizerMemberCard,
  
  // Phase 3C - Drag & Drop and Chemistry Recalculation
  toggleSubscales,
  initializeOptimizerDragDrop,
  updateDraggableCards,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  moveToOptimalTeam,
  moveToRemainingPool,
  recalculateChemistry,
  
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

// ============================================
// PHASE 4C: RESOLVE CONFLICT MODULE
// ============================================

/**
 * Populate conflict resolution member dropdowns with demo data
 */
function populateConflictSelects() {
    const personASelect = document.getElementById('conflictPersonA');
    const personBSelect = document.getElementById('conflictPersonB');
    
    if (!personASelect || !personBSelect) {
        console.log('Conflict select elements not found');
        return;
    }
    
    // Clear existing options (keep placeholder)
    personASelect.innerHTML = '<option value="">Select team member...</option>';
    personBSelect.innerHTML = '<option value="">Select team member...</option>';
    
    // Use demo members with quiz data
    memberPools.team.forEach(member => {
        const optionA = document.createElement('option');
        optionA.value = member.id;
        optionA.textContent = member.name;
        personASelect.appendChild(optionA);
        
        const optionB = document.createElement('option');
        optionB.value = member.id;
        optionB.textContent = member.name;
        personBSelect.appendChild(optionB);
    });
    
    console.log('Conflict selects populated with', memberPools.team.length, 'members');
}

/**
 * Update conflict analysis when members selected
 */
function updateConflictAnalysis() {
    const personAId = document.getElementById('conflictPersonA').value;
    const personBId = document.getElementById('conflictPersonB').value;
    const resultsContainer = document.getElementById('conflictResults');
    
    // Hide results if incomplete selection
    if (!personAId || !personBId || personAId === personBId) {
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        
        // Show message if same person selected
        if (personAId && personBId && personAId === personBId) {
            console.log('Cannot analyze same person against themselves');
        }
        return;
    }
    
    // Get member data
    const personA = memberPools.team.find(m => m.id === personAId);
    const personB = memberPools.team.find(m => m.id === personBId);
    
    if (!personA || !personB) {
        console.error('Could not find member data');
        return;
    }
    
    console.log('Analyzing conflict between:', personA.name, 'and', personB.name);
    
    // Calculate dyadic chemistry
    const dyadicResults = calculateDyadicChemistry(personA, personB);
    
    // Display results
    displayConflictResults(dyadicResults, personA, personB);
    
    // Show results container
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        
        // Smooth scroll to center results (shows hero score and analysis)
        setTimeout(() => {
            const heroScore = document.querySelector('.hero-score-container');
            if (heroScore) {
                heroScore.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Add small offset by scrolling up slightly
                setTimeout(() => {
                    window.scrollBy({ top: -80, behavior: 'smooth' });
                }, 150);
            }
        }, 100);
    }
}

/**
 * Calculate dyadic chemistry between two members
 * Uses average of subscale scores
 */
function calculateDyadicChemistry(personA, personB) {
    // Get subscale scores for each person
    const subscalesA = {
        understanding: personA.subscales.understanding,
        trust: personA.subscales.trust,
        ease: personA.subscales.ease,
        integration: personA.subscales.integration
    };
    
    const subscalesB = {
        understanding: personB.subscales.understanding,
        trust: personB.subscales.trust,
        ease: personB.subscales.ease,
        integration: personB.subscales.integration
    };
    
    // Calculate average for each subscale (dyadic chemistry)
    const dyadicSubscales = {
        understanding: Math.round((subscalesA.understanding + subscalesB.understanding) / 2),
        trust: Math.round((subscalesA.trust + subscalesB.trust) / 2),
        ease: Math.round((subscalesA.ease + subscalesB.ease) / 2),
        integration: Math.round((subscalesA.integration + subscalesB.integration) / 2)
    };
    
    // Calculate overall dyadic chemistry
    const dyadicChemistry = Math.round(
        (dyadicSubscales.understanding + 
         dyadicSubscales.trust + 
         dyadicSubscales.ease + 
         dyadicSubscales.integration) / 4
    );
    
    console.log('Dyadic chemistry calculated:', dyadicChemistry, '%', dyadicSubscales);
    
    return {
        chemistry: dyadicChemistry,
        subscales: dyadicSubscales
    };
}

/**
 * Display conflict resolution results
 */
function displayConflictResults(results, personA, personB) {
    // Display hero score
    const heroScore = document.getElementById('dyadicChemistryScore');
    if (heroScore) {
        heroScore.textContent = results.chemistry + '%';
    }
    
    // Client's exact terminology for subscales
    const subscaleKeys = ['understanding', 'trust', 'ease', 'integration'];
    
    // Display each subscale
    subscaleKeys.forEach(key => {
        const score = results.subscales[key];
        
        // Update value
        const valueEl = document.getElementById(`conflict-${key}-value`);
        if (valueEl) {
            valueEl.textContent = score + '%';
        }
        
        // Update progress bar
        const barEl = document.getElementById(`conflict-${key}-bar`);
        if (barEl) {
            barEl.style.width = score + '%';
        }
        
        // Update disconnect level with client's exact thresholds
        const levelEl = document.getElementById(`conflict-${key}-level`);
        if (levelEl) {
            const level = getDisconnectLevel(score);
            levelEl.textContent = level.text;
            levelEl.className = 'disconnect-level ' + level.class;
        }
    });
    
    // Display primary disconnects
    displayPrimaryDisconnects(results.subscales);
    
    // Display intervention recommendations
    displayInterventionRecommendations(results.subscales);
    
    console.log('Conflict results displayed for', personA.name, 'and', personB.name);
}

/**
 * Get disconnect level based on client's exact thresholds
 * 70-100%: No significant disconnect
 * 50-69%: Moderate disconnect
 * Below 50%: Significant disconnect
 */
function getDisconnectLevel(score) {
    if (score >= 70) {
        return { 
            text: 'No significant disconnect', 
            class: 'no-disconnect' 
        };
    } else if (score >= 50) {
        return { 
            text: 'Moderate disconnect', 
            class: 'moderate-disconnect' 
        };
    } else {
        return { 
            text: 'Significant disconnect', 
            class: 'significant-disconnect' 
        };
    }
}

/**
 * Display primary disconnects (areas scoring below 70%)
 */
function displayPrimaryDisconnects(subscales) {
    const container = document.getElementById('disconnectSummary');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Client's exact terminology
    const subscaleNames = {
        understanding: 'Truly understanding each other',
        trust: 'Totally respecting one another',
        ease: 'Instantly feeling at ease together',
        integration: 'Spontaneously thinking and acting alike'
    };
    
    // Find subscales below 70% (moderate or significant disconnects)
    const disconnects = Object.entries(subscales)
        .filter(([key, score]) => score < 70)
        .sort((a, b) => a[1] - b[1]); // Sort by score (lowest first)
    
    if (disconnects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); line-height: 1.6;">No significant disconnects detected. Relationship functioning well across all dimensions.</p>';
        return;
    }
    
    // Display disconnect items
    disconnects.forEach(([key, score]) => {
        const item = document.createElement('div');
        item.className = 'disconnect-item';
        
        const description = getDisconnectDescription(key, score);
        
        item.innerHTML = `
            <div class="disconnect-item-title">${subscaleNames[key]} (${score}%)</div>
            <div class="disconnect-item-description">${description}</div>
        `;
        
        container.appendChild(item);
    });
    
    console.log('Primary disconnects displayed:', disconnects.length, 'areas');
}

/**
 * Get description for each type of disconnect
 */
function getDisconnectDescription(subscale, score) {
    const descriptions = {
        understanding: 'Communication clarity may require additional effort and structured protocols',
        trust: 'Building mutual confidence and reliability needs focused attention',
        ease: 'Interactions may feel somewhat uncomfortable or strained at times',
        integration: 'Work styles and approaches show misalignment requiring coordination'
    };
    
    return descriptions[subscale] || '';
}

/**
 * Display intervention recommendations based on disconnect areas
 */
function displayInterventionRecommendations(subscales) {
    const container = document.getElementById('interventionsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Find areas needing intervention (below 75% for intervention threshold)
    const needsIntervention = Object.entries(subscales)
        .filter(([key, score]) => score < 75)
        .sort((a, b) => a[1] - b[1]); // Prioritize lowest scores
    
    if (needsIntervention.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); line-height: 1.6;">No specific interventions needed - relationship functioning optimally across all dimensions.</p>';
        return;
    }
    
    // Intervention templates (evidence-based, no-fault language)
    const interventions = {
        understanding: {
            title: '🎯 Structured Communication Protocol',
            description: 'Implement the "Clarify-Confirm-Continue" framework. Each party explicitly states their understanding before proceeding with tasks or decisions. Schedule weekly 15-minute check-ins to ensure alignment and address misunderstandings proactively.'
        },
        trust: {
            title: '🤝 Reliability Commitment Practice',
            description: 'Establish small, achievable commitments and consistently follow through. Build trust incrementally through demonstrated reliability over time. Use a shared commitment tracker to maintain visibility and accountability.'
        },
        ease: {
            title: '💬 Interaction Preference Mapping',
            description: 'Collaboratively identify preferred communication channels, timing, and interaction styles. Create explicit norms that honor both parties\' comfort zones. Document these preferences in a shared working agreement.'
        },
        integration: {
            title: '📋 Collaborative Working Agreement',
            description: 'Co-create explicit documentation of work processes, decision-making approaches, and coordination mechanisms. Review and adjust regularly in monthly retrospectives to maintain alignment as needs evolve.'
        }
    };
    
    // Display up to 3 most critical interventions
    const topInterventions = needsIntervention.slice(0, 3);
    
    topInterventions.forEach(([key, score], index) => {
        const intervention = interventions[key];
        
        const card = document.createElement('div');
        card.className = 'intervention-card';
        card.innerHTML = `
            <div style="display: flex; align-items: start;">
                <span class="intervention-number">${index + 1}</span>
                <div style="flex: 1;">
                    <div class="intervention-title">${intervention.title}</div>
                    <div class="intervention-description">${intervention.description}</div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log('Interventions displayed:', topInterventions.length);
}

/**
 * Export conflict report (placeholder for future functionality)
 */
function exportConflictReport() {
    const personAName = document.getElementById('conflictPersonA').selectedOptions[0]?.text;
    const personBName = document.getElementById('conflictPersonB').selectedOptions[0]?.text;
    const chemistry = document.getElementById('dyadicChemistryScore').textContent;
    
    console.log('Export conflict report:', { personAName, personBName, chemistry });
    
    // TODO: Implement actual export functionality (PDF generation)
    alert('Export functionality will generate a comprehensive PDF report with:\n\n• Dyadic chemistry analysis\n• Subscale breakdowns\n• Primary disconnect areas\n• Evidence-based intervention recommendations\n• Implementation timeline\n\nThis feature will be available in the production version.');
}

/**
 * Deploy interventions (placeholder for future functionality)
 */
function deployInterventions() {
    const personAName = document.getElementById('conflictPersonA').selectedOptions[0]?.text;
    const personBName = document.getElementById('conflictPersonB').selectedOptions[0]?.text;
    
    console.log('Deploy interventions for:', personAName, 'and', personBName);
    
    // TODO: Implement actual deployment (Slack messages, calendar events, etc.)
    alert('Interventions deployed!\n\nThe following has been initiated:\n\n✓ Slack messages sent to both parties\n✓ Calendar invites created for check-ins\n✓ Shared working agreement template generated\n✓ Progress tracking enabled\n\nBoth team members will receive next steps in their Slack DMs.');
}

// Export conflict functions for use in navigation
window.populateConflictSelects = populateConflictSelects;
window.updateConflictAnalysis = updateConflictAnalysis;
window.exportConflictReport = exportConflictReport;
window.deployInterventions = deployInterventions;

console.log('Phase 4C: Conflict resolution functions loaded');
