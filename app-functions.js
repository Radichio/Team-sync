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
      msScore: 72, subscales: { understanding: 68, trust: 78, ease: 70, integration: 72 } },
    { id: 'T003', name: 'Emily Parker', initials: 'EP', quizDate: '2024-12-16',
      msScore: 78, subscales: { understanding: 76, trust: 82, ease: 80, integration: 74 } },
    { id: 'T004', name: 'David Wilson', initials: 'DW', quizDate: '2024-12-05',
      msScore: 70, subscales: { understanding: 66, trust: 74, ease: 68, integration: 72 } },
    { id: 'T005', name: 'Jessica Rodriguez', initials: 'JR', quizDate: '2024-11-20',
      msScore: 74, subscales: { understanding: 72, trust: 78, ease: 70, integration: 76 } },
    { id: 'T006', name: 'Robert Kim', initials: 'RK', quizDate: '2024-10-15',
      msScore: 68, subscales: { understanding: 64, trust: 72, ease: 66, integration: 68 } },
    { id: 'T007', name: 'Amanda Foster', initials: 'AF', quizDate: '2024-09-30',
      msScore: 73, subscales: { understanding: 70, trust: 76, ease: 70, integration: 74 } },
    { id: 'T008', name: 'Alex Thompson', initials: 'AT', quizDate: '2024-08-01', hasDual: true,
      msScore: 76, subscales: { understanding: 80, trust: 72, ease: 78, integration: 74 } },
    { id: 'T009', name: 'Sophie Lee', initials: 'SL', quizDate: '2024-06-15', hasDual: true,
      msScore: 58, subscales: { understanding: 54, trust: 66, ease: 56, integration: 58 } },
    { id: 'T010', name: 'Kevin Brown', initials: 'KB', quizDate: null,
      msScore: null, subscales: null },
    { id: 'T011', name: 'Marcus Rivera', initials: 'MR', quizDate: null,
      msScore: null, subscales: null }, // New candidate - no assessment yet
    { id: 'T012', name: 'James Norton', initials: 'JN', quizDate: '2024-05-10',
      msScore: 48, subscales: { understanding: 42, trust: 52, ease: 46, integration: 50 } }
  ],
  dyad: [
    { id: 'D001', name: 'Alex Thompson', initials: 'AT', quizDate: '2024-12-19', hasDual: true,
      msScore: 87, subscales: { understanding: 90, trust: 88, ease: 86, integration: 84 } },
    { id: 'D002', name: 'Rachel Smith', initials: 'RS', quizDate: '2024-12-17',
      msScore: 71, subscales: { understanding: 70, trust: 76, ease: 68, integration: 72 } },
    { id: 'D003', name: 'Daniel Martinez', initials: 'DM', quizDate: '2024-12-12',
      msScore: 66, subscales: { understanding: 62, trust: 70, ease: 68, integration: 64 } },
    { id: 'D004', name: 'Sophie Lee', initials: 'SL', quizDate: '2024-11-25', hasDual: true,
      msScore: 58, subscales: { understanding: 54, trust: 66, ease: 56, integration: 58 } },
    { id: 'D005', name: 'Marcus Johnson', initials: 'MJ', quizDate: '2024-11-01',
      msScore: 73, subscales: { understanding: 76, trust: 78, ease: 66, integration: 74 } },
    { id: 'D006', name: 'Nina Patel', initials: 'NP', quizDate: '2024-10-01',
      msScore: 89, subscales: { understanding: 92, trust: 90, ease: 86, integration: 88 } },
    { id: 'D007', name: 'Oliver Chen', initials: 'OC', quizDate: '2024-07-15',
      msScore: 60, subscales: { understanding: 58, trust: 64, ease: 62, integration: 56 } },
    { id: 'D008', name: 'Sarah Johnson', initials: 'SJ', quizDate: '2024-03-20', hasDual: true,
      msScore: 72, subscales: { understanding: 68, trust: 80, ease: 72, integration: 70 } },
    { id: 'D009', name: 'James Norton', initials: 'JN', quizDate: '2024-05-10',
      msScore: 48, subscales: { understanding: 42, trust: 52, ease: 46, integration: 50 } }
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
  
  // Add member-specific combination factor for more variance
  // Uses sum of member IDs to create deterministic but varied scores
  const memberIdSum = members.reduce((sum, m) => {
    const idNum = parseInt(m.id.replace(/\D/g, '')) || 0;
    return sum + idNum;
  }, 0);
  const combinationVariance = ((memberIdSum * 7) % 11) - 5; // Range: -5 to +5
  
  // Combine factors for final chemistry score
  const baseScore = (avgMS * 0.65 + alignmentScore * 0.35);
  const rawScore = baseScore * rangeFactor * trustFactor * sizeModifier + combinationVariance;
  
  // CLIENT SPECIFICATION: Max score is 88% (90-95% is "impossible")
  // Realistic range: 45-88%
  return Math.min(88, Math.max(45, Math.round(rawScore)));
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
  
  // Get top configurations but ensure unique descending scores
  const result = [];
  let lastScore = null;
  let scoreDecrement = 0;
  
  for (let i = 0; i < allConfigurations.length && result.length < 5; i++) {
    const config = allConfigurations[i];
    
    if (result.length === 0) {
      // First (optimal) team keeps its actual score
      result.push(config);
      lastScore = config.chemistry;
    } else {
      // Subsequent teams must have lower scores than previous
      // If score is same or higher, decrement it
      let adjustedScore = config.chemistry;
      
      if (adjustedScore >= lastScore) {
        // Ensure at least 1-3 points lower than previous
        scoreDecrement = Math.floor(Math.random() * 3) + 1; // 1-3 points
        adjustedScore = lastScore - scoreDecrement;
      }
      
      // Ensure we don't go below minimum
      adjustedScore = Math.max(45, adjustedScore);
      
      result.push({
        members: config.members,
        chemistry: adjustedScore
      });
      lastScore = adjustedScore;
    }
  }
  
  return result;
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
  
  if (score >= 76) {
    factors.push({ text: 'High Trust Environment', icon: '✓' });
    factors.push({ text: 'Balanced Role Distribution', icon: '✓' });
    factors.push({ text: 'Aligned Goals', icon: '✓' });
    factors.push({ text: 'Strong Communication', icon: '✓' });
  } else if (score >= 66) {
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
// UTILITY FUNCTIONS
// ========================================
// END OPTIMIZE EXISTING TEAM MODULE
// ========================================


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
    const isSelected = AppState.selectedMemberIds.includes(member.id);
    
    let badgeText = member.quizDate ? 'Quiz Done' : 'No Quiz';
    let badgeClass = member.quizDate ? 'member-badge badge-quiz-done' : 'member-badge badge-no-quiz';
    
    return `
      <div class="member-card ${isSelected ? 'selected' : ''}" 
           data-member-id="${member.id}" 
           data-pool="${poolType}"
           onclick="toggleMember('${poolType}', '${member.id}')">
        <div class="member-avatar">${member.initials}</div>
        <div class="member-info">
          <div class="member-name">${member.name} <span class="${badgeClass}">${badgeText}</span></div>
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
 * Validate form and enable/disable Assess button
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
 * Main entry point - Assess Team Chemistry button click
 */
function analyzeTeamChemistry() {
  const teamNameInput = document.getElementById('teamNameInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const processingStatus = document.getElementById('processingStatus');
  const statusText = document.getElementById('statusText');
  
  if (!teamNameInput || !analyzeBtn) return;
  
  const teamName = teamNameInput.value.trim();
  if (!teamName || AppState.selectedMemberIds.length === 0) return;
  
  // Check if any selected members need quiz deployment
  const currentPool = AppState.currentQuizType === 'team' ? memberPools.team : memberPools.dyad;
  const selectedMembers = currentPool.filter(m => AppState.selectedMemberIds.includes(m.id));
  const membersNeedingQuiz = selectedMembers.filter(m => !m.quizDate);
  
  // If members need quiz, show Slack deployment modal
  if (membersNeedingQuiz.length > 0) {
    showSlackDeployModal(teamName, membersNeedingQuiz, selectedMembers);
    return;
  }
  
  // All members have quiz data - proceed with normal analysis
  proceedWithTeamAnalysis(teamName);
}

/**
 * Proceed with team chemistry analysis (called after quiz deployment or when all have quizzes)
 */
function proceedWithTeamAnalysis(teamName) {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const processingStatus = document.getElementById('processingStatus');
  const statusText = document.getElementById('statusText');
  
  // Disable button and show processing
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Assessing...';
  }
  
  if (processingStatus) {
    processingStatus.style.display = 'block';
  }
  if (statusText) {
    statusText.textContent = 'Assessing team composition...';
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
  
  // OPTION A: Auto-generate subscales for members without quiz data (for demo continuity)
  selectedPool.forEach(member => {
    if (!member.subscales) {
      const baseScore = 60 + Math.floor(Math.random() * 20); // 60-79 range
      member.subscales = {
        understanding: baseScore + Math.floor(Math.random() * 10 - 5),
        trust: baseScore + Math.floor(Math.random() * 10 - 5),
        ease: baseScore + Math.floor(Math.random() * 10 - 5),
        integration: baseScore + Math.floor(Math.random() * 10 - 5)
      };
      member.msScore = Math.round((member.subscales.understanding + member.subscales.trust + 
                                    member.subscales.ease + member.subscales.integration) / 4);
      console.log(`[OPTION A] Generated subscales for ${member.name}:`, member.subscales);
    }
  });
  
  // Step 1: Show pool analysis (1 second delay)
  setTimeout(() => {
    if (statusText) {
      statusText.textContent = 'Assessing pool of ' + selectedPool.length + ' candidates...';
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
      
      // Store ALL top results for alternates (2nd, 3rd, 4th place)
      window.topAlternateConfigurations = optimalResults.slice(1, 4); // Get 2nd, 3rd, 4th place
      
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
        <button class="chemistry-badge" onclick="openTeamExplorerForTeam('${teamName}', ${chemistryScore})">
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
    analyzeBtn.textContent = 'Assess Team Chemistry';
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
function openTeamExplorerForTeam(teamName, chemistry) {
  console.log('Opening Team Explorer View for:', teamName, 'Chemistry:', chemistry);
  
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
  
  // Store explorer state globally
  window.explorerState = {
    teamName: teamName,
    originalChemistry: chemistry,
    originalOptimalTeam: teamData.optimalMembers || [], // Store original for reset
    currentOptimalTeam: teamData.optimalMembers || [],
    currentTeamPool: teamData.teamPool || (teamData.quizType === 'team' ? memberPools.team : memberPools.dyad),
    quizType: teamData.quizType,
    isOverridden: false,
    selectedRank: 1 // 1 = AI recommendation, 2/3/4 = alternates
  };
  
  console.log('Team Explorer state:', window.explorerState);
  
  // Update explorer view header (title is now static "Team Explorer")
  document.getElementById('explorerChemistry').textContent = chemistry;
  
  // Update hero chemistry score
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Update large chemistry score display
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Populate member lists (Phase 3B)
  populateTeamExplorerView();
  
  // Hide Build Team view, show Team Explorer view
  document.getElementById('buildView').classList.add('hidden');
  document.getElementById('teamExplorerView').classList.remove('hidden');
  
  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  console.log('Team Explorer View opened successfully');
}

/**
 * Populate Optimizer View with member cards (Phase 3B)
 */
function populateTeamExplorerView() {
  if (!window.explorerState) {
    console.error('No explorer state found');
    return;
  }
  
  console.log('Populating Team Explorer View...');
  console.log('Explorer state:', window.explorerState);
  
  const { currentOptimalTeam, currentTeamPool, quizType } = window.explorerState;
  
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
      optimalContainer.appendChild(createExplorerMemberCard(member, true));
    } else {
      console.warn('Member not found in pool:', memberId);
    }
  });
  
  // Populate remaining pool
  remainingMembers.forEach(member => {
    remainingContainer.appendChild(createExplorerMemberCard(member, false));
  });
  
  // Update size badges
  document.getElementById('optimalTeamSize').textContent = 
    `${currentOptimalTeam.length} member${currentOptimalTeam.length !== 1 ? 's' : ''}`;
  document.getElementById('remainingPoolSize').textContent = 
    `${remainingMembers.length} member${remainingMembers.length !== 1 ? 's' : ''}`;
  
  console.log('Team Explorer View populated successfully');
  
  // Initialize drag and drop
  initializeExplorerDragDrop();
  
  // Calculate and display chemistry
  recalculateExplorerChemistry();
  
  // Populate alternate configurations (2nd, 3rd, 4th place)
  populateAlternateConfigurations();
}

/**
 * Create an optimizer member card (Phase 3B)
 * @param {Object} member - Member data
 * @param {boolean} isOptimal - Whether this is in the optimal team
 */
function createExplorerMemberCard(member, isOptimal) {
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
 * Toggle alternate configurations display
 */
function toggleAlternates() {
  const toggle = document.getElementById('alternateToggle');
  const content = document.getElementById('alternateConfigsContent');
  
  const isExpanded = content.style.display === 'block';
  
  if (isExpanded) {
    toggle.classList.remove('expanded');
    content.style.display = 'none';
  } else {
    toggle.classList.add('expanded');
    content.style.display = 'block';
  }
}

// ========================================
// TEAM EXPLORER MODULE - DRAG & DROP SYSTEM
// ========================================
// Purpose: Handle member dragging in Team Explorer view (AI Team ↔ Remaining Pool)
// Triggered By: Build Team → "Assess Chemistry" button
// Elements: .optimizer-member-card, #optimalTeamContainer, #remainingPoolContainer
// Status: Isolated with Explorer prefix to prevent function collision
// ========================================

/**
 * Initialize drag and drop for Team Explorer view
 * Sets up event listeners for dragging members between AI Team and Remaining Pool
 */
function initializeExplorerDragDrop() {
  console.log('[Team Explorer] Initializing drag and drop...');
  
  const optimalContainer = document.getElementById('optimalTeamContainer');
  const remainingContainer = document.getElementById('remainingPoolContainer');
  const optimalDropZone = document.getElementById('optimalDropZone');
  const poolDropZone = document.getElementById('poolDropZone');
  
  // Enable drag events on containers
  [optimalContainer, remainingContainer].forEach(container => {
    container.addEventListener('dragover', handleExplorerDragOver);
    container.addEventListener('drop', handleExplorerDrop);
    container.addEventListener('dragleave', handleExplorerDragLeave);
  });
  
  // Initialize draggable cards
  updateExplorerDraggableCards();
  
  console.log('[Team Explorer] Drag and drop initialized');
}

/**
 * Update draggable cards with event listeners (Team Explorer)
 */
function updateExplorerDraggableCards() {
  const cards = document.querySelectorAll('.optimizer-member-card');
  
  cards.forEach(card => {
    card.addEventListener('dragstart', handleExplorerDragStart);
    card.addEventListener('dragend', handleExplorerDragEnd);
  });
}

/**
 * Handle drag start (Team Explorer)
 */
function handleExplorerDragStart(e) {
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
 * Handle drag end (Team Explorer)
 */
function handleExplorerDragEnd(e) {
  e.target.style.opacity = '1';
  
  // Hide all drop zones
  document.getElementById('optimalDropZone').style.display = 'none';
  document.getElementById('poolDropZone').style.display = 'none';
}

/**
 * Handle drag over (Team Explorer)
 */
function handleExplorerDragOver(e) {
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
 * Handle drag leave (Team Explorer)
 */
function handleExplorerDragLeave(e) {
  // Remove highlight from drop zones
  document.querySelectorAll('.drop-zone-indicator').forEach(zone => {
    zone.classList.remove('active');
  });
}

/**
 * Handle drop (Team Explorer)
 */
function handleExplorerDrop(e) {
  e.preventDefault();
  
  const memberId = e.dataTransfer.getData('text/plain');
  const targetContainer = e.currentTarget;
  
  console.log('[Team Explorer] Dropped member:', memberId, 'into:', targetContainer.id);
  
  // Move member between lists
  if (targetContainer.id === 'optimalTeamContainer') {
    moveToExplorerOptimalTeam(memberId);
  } else if (targetContainer.id === 'remainingPoolContainer') {
    moveToExplorerRemainingPool(memberId);
  }
  
  // Remove drop zone highlights
  document.querySelectorAll('.drop-zone-indicator').forEach(zone => {
    zone.classList.remove('active');
  });
}

/**
 * Move member to optimal team (Team Explorer)
 */
function moveToExplorerOptimalTeam(memberId) {
  if (!window.explorerState) return;
  
  // Add to optimal team if not already there
  if (!window.explorerState.currentOptimalTeam.includes(memberId)) {
    window.explorerState.currentOptimalTeam.push(memberId);
    
    // Mark as overridden
    window.explorerState.isOverridden = true;
    
    // Repopulate view
    populateTeamExplorerView();
    
    // Recalculate chemistry
    recalculateExplorerChemistry();
    
    // Reinitialize drag and drop
    updateExplorerDraggableCards();
    
    console.log('[Team Explorer] Member added to optimal team:', memberId);
  }
}

/**
 * Move member to remaining pool (Team Explorer)
 */
function moveToExplorerRemainingPool(memberId) {
  if (!window.explorerState) return;
  
  // Allow removal - we'll show N/A if team becomes too small
  const index = window.explorerState.currentOptimalTeam.indexOf(memberId);
  if (index > -1) {
    window.explorerState.currentOptimalTeam.splice(index, 1);
    
    // Mark as overridden
    window.explorerState.isOverridden = true;
    
    // Repopulate view
    populateTeamExplorerView();
    
    // Recalculate chemistry (will show N/A if too small)
    recalculateExplorerChemistry();
    
    // Reinitialize drag and drop
    updateExplorerDraggableCards();
    
    console.log('[Team Explorer] Member removed from optimal team:', memberId);
  }
}

/**
 * Recalculate team chemistry based on current optimal team (Team Explorer)
 */
function recalculateExplorerChemistry() {
  if (!window.explorerState) return;
  
  const { currentOptimalTeam, currentTeamPool, quizType } = window.explorerState;
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
    document.getElementById('heroChemistryScore').textContent = '--';
    document.getElementById('subscaleUnderstanding').textContent = 'N/A';
    document.getElementById('subscaleTrust').textContent = 'N/A';
    document.getElementById('subscaleEase').textContent = 'N/A';
    document.getElementById('subscaleIntegration').textContent = 'N/A';
    
    if (teamMembers.length < minTeamSize) {
      console.log(`[Team Explorer] Team too small (${teamMembers.length}), minimum is ${minTeamSize}`);
    } else {
      console.log(`[Team Explorer] Team too large (${teamMembers.length}), maximum is ${maxTeamSize} for ${quizType} mode`);
    }
    return;
  }
  
  // Calculate chemistry using Mental Synchrony algorithm
  const chemistry = calculateTeamChemistry(teamMembers);
  
  // Calculate individual subscale scores by averaging member subscales
  console.log('[Team Explorer] Team members for subscale calc:', teamMembers.map(m => ({ id: m.id, subscales: m.subscales })));
  
  const subscales = {
    understanding: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.understanding || 0), 0) / teamMembers.length),
    trust: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.trust || 0), 0) / teamMembers.length),
    ease: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.ease || 0), 0) / teamMembers.length),
    integration: Math.round(teamMembers.reduce((sum, m) => sum + (m.subscales?.integration || 0), 0) / teamMembers.length)
  };
  
  console.log('[Team Explorer] Calculated subscales:', subscales);
  
  // Update hero chemistry score
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Update main chemistry score
  document.getElementById('heroChemistryScore').textContent = chemistry;
  
  // Update subscale scores
  const understandingEl = document.getElementById('subscaleUnderstanding');
  const trustEl = document.getElementById('subscaleTrust');
  const easeEl = document.getElementById('subscaleEase');
  const integrationEl = document.getElementById('subscaleIntegration');
  
  console.log('[Team Explorer] Found elements:', {
    understanding: understandingEl,
    trust: trustEl,
    ease: easeEl,
    integration: integrationEl
  });
  
  if (understandingEl) {
    understandingEl.textContent = subscales.understanding + '%';
    console.log('[Team Explorer] Set understanding to:', understandingEl.textContent);
  } else {
    console.error('[Team Explorer] subscaleUnderstanding element NOT FOUND');
  }
  
  if (trustEl) {
    trustEl.textContent = subscales.trust + '%';
    console.log('[Team Explorer] Set trust to:', trustEl.textContent);
  } else {
    console.error('[Team Explorer] subscaleTrust element NOT FOUND');
  }
  
  if (easeEl) {
    easeEl.textContent = subscales.ease + '%';
    console.log('[Team Explorer] Set ease to:', easeEl.textContent);
  } else {
    console.error('[Team Explorer] subscaleEase element NOT FOUND');
  }
  
  if (integrationEl) {
    integrationEl.textContent = subscales.integration + '%';
    console.log('[Team Explorer] Set integration to:', integrationEl.textContent);
  } else {
    console.error('[Team Explorer] subscaleIntegration element NOT FOUND');
  }
  
  console.log('[Team Explorer] Subscale elements updated:', {
    understanding: understandingEl?.textContent,
    trust: trustEl?.textContent,
    ease: easeEl?.textContent,
    integration: integrationEl?.textContent
  });
  
  console.log('[Team Explorer] Chemistry recalculated:', chemistry, 'Subscales:', subscales);
}

// ========================================
// END TEAM EXPLORER MODULE
// ========================================


/**
 * Close Optimizer View and return to Build Team (Phase 3A)
 */
function closeTeamExplorerView() {
  console.log('Closing Team Explorer View');
  
  // Clear explorer state
  window.explorerState = null;
  
  // Hide Team Explorer view, show Build Team view
  document.getElementById('teamExplorerView').classList.add('hidden');
  document.getElementById('buildView').classList.remove('hidden');
}

/**
 * Deploy team configuration to Slack
 * Sends team composition and chemistry analysis to Slack workspace
 */
function deployTeamToSlack() {
  if (!window.explorerState) {
    console.error('No team state available for deployment');
    return;
  }
  
  const teamName = window.explorerState.teamName || 'Unnamed Team';
  const chemistry = window.explorerState.currentChemistry || window.explorerState.originalChemistry;
  const teamMembers = window.explorerState.currentOptimalTeam || window.explorerState.originalOptimalTeam;
  
  console.log('Deploying team to Slack:', {
    name: teamName,
    chemistry: chemistry + '%',
    members: teamMembers.length,
    memberIds: teamMembers
  });
  
  // TODO: Implement actual Slack API integration
  // This will send team details to Slack channel/DM
  
  // Show success notification
  showToast('✅ Team deployed to Slack! Team members will receive notifications with chemistry insights.', 'success');
  
  // Optional: Could close explorer and return to dashboard after deployment
  // setTimeout(() => closeTeamExplorerView(), 2000);
}

/**
 * Handle Override Checkbox Toggle (Phase 3A - UI only, logic in Phase 3C)
 */
function handleOverrideToggle() {
  const checkbox = document.getElementById('overrideCheckbox');
  const isChecked = checkbox.checked;
  
  console.log('Override toggled:', isChecked);
  
  if (window.explorerState) {
    window.explorerState.isOverridden = isChecked;
  }
  
  // Update UI states (check if elements exist first)
  const deployBtn = document.getElementById('deployToSlackBtn');
  const resetBtn = document.getElementById('resetToAIBtn');
  const comparison = document.getElementById('chemistryComparison');
  
  if (isChecked) {
    // Manual override mode
    if (deployBtn) deployBtn.classList.add('overridden');
    if (resetBtn) resetBtn.style.display = 'flex';
    if (comparison) {
      comparison.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: var(--warning);">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Manual configuration</span>
      `;
      comparison.classList.add('warning');
    }
  } else {
    // AI recommendation mode
    if (deployBtn) deployBtn.classList.remove('overridden');
    if (resetBtn) resetBtn.style.display = 'none';
    if (comparison) {
      comparison.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: var(--success);">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
        <span>Using AI recommendation</span>
      `;
      comparison.classList.remove('warning');
    }
  }
  
  console.log('Override UI updated');
}

/**
 * Deploy Team to Slack (Phase 3C placeholder)
 */
function deployTeamToSlack() {
  if (!window.explorerState) {
    console.error('No optimizer state found');
    return;
  }
  
  const isOverridden = window.explorerState.isOverridden;
  const memberCount = window.explorerState.currentOptimalTeam ? window.explorerState.currentOptimalTeam.length : 0;
  
  // Demo deployment preview
  alert(`DEMO: Team Deployment Preview\n\nTeam: ${window.explorerState.teamName}\nConfiguration: ${isOverridden ? 'Manual Override' : 'AI Recommendation'}\nMembers: ${memberCount}\n\nIn production, this would:\n• Create a dedicated Slack channel\n• Add all ${memberCount} team members automatically\n• Post chemistry insights to the channel\n• Enable real-time collaboration`);
}

/**
 * Reset to AI Recommendation (Phase 3C)
 */
// ========================================
// INITIALIZATION
// ========================================

function initializeApp() {
  // Load saved theme
  loadTheme();
  
  // Demo is always populated - no toggle needed
  console.log('TeamSync AI initialized');
}

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info) - optional
 */
function showToast(message, type = 'success') {
  // Remove any existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Export functions to global scope
window.showToast = showToast;
window.initializeBuildTeamView = initializeBuildTeamView;
window.populateBothPools = populateBothPools;
window.populatePool = populatePool;
window.initializeOptimizeDragDrop = initializeOptimizeDragDrop;
window.loadTeamConfig = loadTeamConfig;
window.calculateAllTeamScores = calculateAllTeamScores;
window.resetSupervisorView = resetSupervisorView;
window.populateConflictGrid = populateConflictGrid;

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
  
  // Phase 3A - Team Explorer View Functions
  openTeamExplorerForTeam,
  closeTeamExplorerView,
  handleOverrideToggle,
  deployTeamToSlack,
  resetToAIRecommendation,
  
  // Phase 3B - Team Explorer Member Population
  populateTeamExplorerView,
  createExplorerMemberCard,
  
  // Phase 3C - Team Explorer Drag & Drop System
  toggleSubscales,
  initializeExplorerDragDrop,
  updateExplorerDraggableCards,
  handleExplorerDragStart,
  handleExplorerDragEnd,
  handleExplorerDragOver,
  handleExplorerDragLeave,
  handleExplorerDrop,
  moveToExplorerOptimalTeam,
  moveToExplorerRemainingPool,
  recalculateExplorerChemistry,
  
  // Legacy Functions
  calculateChemistryScore,
  calculateConflictRisk,
  getConflictFactors,
  getInterventions,
  createTeam,
  toggleMemberSelection,
  toggleTheme,
  startSlackSimulation,
  copySlackPrompt,
  
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

// State for conflict member selection (NEW GRID SYSTEM)
const conflictState = {
    personA: null,
    personB: null,
    surveySentAt: null
};

/**
 * Initialize conflict member grids on page load
 */
function initializeConflictGrids() {
    populateConflictGrid('conflictPersonAGrid', 'A');
    populateConflictGrid('conflictPersonBGrid', 'B');
    console.log('Conflict member grids populated');
}

/**
 * Populate a conflict member grid
 */
function populateConflictGrid(gridId, person) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = memberPools.dyad.map(member => {
        const isSelected = (person === 'A' && conflictState.personA === member.id) || 
                          (person === 'B' && conflictState.personB === member.id);
        
        let badgeText = member.quizDate ? 'Quiz Done' : 'No Quiz';
        let badgeClass = member.quizDate ? 'member-badge badge-quiz-done' : 'member-badge badge-no-quiz';
        
        return `
            <div class="member-card ${isSelected ? 'selected' : ''}" 
                 data-member-id="${member.id}"
                 onclick="selectConflictMember('${person}', '${member.id}')">
                <div class="member-avatar">${member.initials}</div>
                <div class="member-info">
                    <div class="member-name">${member.name} <span class="${badgeClass}">${badgeText}</span></div>
                </div>
                <div class="member-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Select a member for Person A or Person B
 */
function selectConflictMember(person, memberId) {
    // Update state
    if (person === 'A') {
        conflictState.personA = memberId;
    } else {
        conflictState.personB = memberId;
    }
    
    // Re-render both grids
    populateConflictGrid('conflictPersonAGrid', 'A');
    populateConflictGrid('conflictPersonBGrid', 'B');
    
    // Check survey status
    checkSurveyStatus();
    
    // Update analysis if both selected
    updateConflictAnalysisFromGrid();
}

/**
 * Check survey status and show alert if needed
 */
function checkSurveyStatus() {
    const alertDiv = document.getElementById('surveyDeploymentAlert');
    if (!alertDiv) return;
    
    if (!conflictState.personA || !conflictState.personB) {
        alertDiv.style.display = 'none';
        return;
    }
    
    const personA = memberPools.dyad.find(m => m.id === conflictState.personA);
    const personB = memberPools.dyad.find(m => m.id === conflictState.personB);
    
    if (!personA || !personB) return;
    
    const aMissing = !personA.quizDate;
    const bMissing = !personB.quizDate;
    
    if (aMissing || bMissing) {
        const messageEl = document.getElementById('surveyAlertMessage');
        const commandEl = document.getElementById('surveyAlertCommand');
        
        let message = '';
        if (aMissing && bMissing) {
            message = `${personA.name} and ${personB.name} need to complete 2-minute dyad quizzes about working with each other.`;
        } else if (aMissing) {
            message = `${personA.name} needs to complete a 2-minute dyad quiz about working with ${personB.name}.`;
        } else {
            message = `${personB.name} needs to complete a 2-minute dyad quiz about working with ${personA.name}.`;
        }
        
        if (messageEl) messageEl.textContent = message;
        if (commandEl) commandEl.textContent = `/teamsync dyad @${personA.name.toLowerCase().replace(' ', '.')} @${personB.name.toLowerCase().replace(' ', '.')}`;
        
        alertDiv.style.display = 'flex';
    } else {
        // Both complete - show results!
        alertDiv.style.display = 'none';
        updateConflictAnalysisFromGrid();
    }
}

/**
 * Send dyad survey (demo function)
 */
function sendDyadSurvey() {
    const personA = memberPools.dyad.find(m => m.id === conflictState.personA);
    const personB = memberPools.dyad.find(m => m.id === conflictState.personB);
    
    if (!personA || !personB) return;
    
    // Show toast notification (using working inline style method)
    const toast = document.createElement('div');
    toast.className = 'status-toast';
    toast.textContent = `✓ Quiz invitations sent to ${personA.name} and ${personB.name}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #14b8a6;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    // Track survey sent time
    if (!conflictState.surveySentAt) {
        conflictState.surveySentAt = new Date();
    }
    
    // Switch alert to monitoring mode
    showSurveyMonitoring();
    
    console.log('Dyad survey sent');
}

/**
 * Show survey monitoring status
 */
function showSurveyMonitoring() {
    const alertDiv = document.getElementById('surveyDeploymentAlert');
    if (!alertDiv) return;
    
    const personA = memberPools.dyad.find(m => m.id === conflictState.personA);
    const personB = memberPools.dyad.find(m => m.id === conflictState.personB);
    
    if (!personA || !personB) return;
    
    const aMissing = !personA.quizDate;
    const bMissing = !personB.quizDate;
    
    // Calculate time since sent
    const sentAt = conflictState.surveySentAt || new Date();
    const now = new Date();
    const minutesAgo = Math.floor((now - sentAt) / 60000);
    const timeText = minutesAgo === 0 ? 'just now' : minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
    
    let statusHTML = '<div class="survey-status-list">';
    
    if (aMissing) {
        statusHTML += `
            <div class="survey-status-item pending">
                <span class="status-dot pending"></span>
                <span class="status-name">${personA.name}</span>
                <span class="status-label">Pending (Sent ${timeText})</span>
                <button class="remind-btn" onclick="remindSurvey('${personA.id}', '${personA.name}')">Remind</button>
            </div>
        `;
    } else {
        statusHTML += `
            <div class="survey-status-item completed">
                <span class="status-dot completed"></span>
                <span class="status-name">${personA.name}</span>
                <span class="status-label">Completed ✓</span>
            </div>
        `;
    }
    
    if (bMissing) {
        statusHTML += `
            <div class="survey-status-item pending">
                <span class="status-dot pending"></span>
                <span class="status-name">${personB.name}</span>
                <span class="status-label">Pending (Sent ${timeText})</span>
                <button class="remind-btn" onclick="remindSurvey('${personB.id}', '${personB.name}')">Remind</button>
            </div>
        `;
    } else {
        statusHTML += `
            <div class="survey-status-item completed">
                <span class="status-dot completed"></span>
                <span class="status-name">${personB.name}</span>
                <span class="status-label">Completed ✓</span>
            </div>
        `;
    }
    
    statusHTML += '</div>';
    
    // Add demo button for EACH pending survey
    statusHTML += '<div class="demo-actions">';
    if (aMissing) {
        statusHTML += `
            <button class="demo-complete-btn" onclick="markSurveyComplete('${personA.id}', '${personA.name}')">
                For Demo: Mark ${personA.name}'s Quiz Complete
            </button>
        `;
    }
    if (bMissing) {
        statusHTML += `
            <button class="demo-complete-btn" onclick="markSurveyComplete('${personB.id}', '${personB.name}')">
                For Demo: Mark ${personB.name}'s Quiz Complete
            </button>
        `;
    }
    statusHTML += '</div>';
    
    alertDiv.innerHTML = `
        <div class="alert-icon">⏳</div>
        <div class="alert-content">
            <h4 class="alert-title">Quiz Deployment Status</h4>
            <p class="alert-message">Quiz invitations sent. Waiting for completion...</p>
            <div class="survey-status-section">
                <h5 class="status-section-title">Quiz Status:</h5>
                ${statusHTML}
            </div>
        </div>
    `;
    
    alertDiv.style.display = 'flex';
}

/**
 * Remind a member to complete survey
 */
function remindSurvey(memberId, memberName) {
    const toast = document.createElement('div');
    toast.className = 'status-toast';
    toast.textContent = `🔔 Reminder sent to ${memberName}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #14b8a6;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    console.log('Reminder sent to:', memberName);
}

/**
 * Mark survey as complete (demo function)
 */
function markSurveyComplete(memberId, memberName) {
    // Find the member and update their quizDate
    const member = memberPools.dyad.find(m => m.id === memberId);
    if (!member) return;
    
    // Set quiz date to today
    const today = new Date();
    member.quizDate = today.toISOString().split('T')[0];
    
    // Generate subscales if missing (for new members without assessment data)
    if (!member.subscales) {
        const baseScore = 60 + Math.floor(Math.random() * 20); // 60-79 range
        member.subscales = {
            understanding: baseScore + Math.floor(Math.random() * 10 - 5),
            trust: baseScore + Math.floor(Math.random() * 10 - 5),
            ease: baseScore + Math.floor(Math.random() * 10 - 5),
            integration: baseScore + Math.floor(Math.random() * 10 - 5)
        };
        member.msScore = Math.round((member.subscales.understanding + member.subscales.trust + 
                                      member.subscales.ease + member.subscales.integration) / 4);
    }
    
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'status-toast';
    toast.textContent = `✓ ${memberName}'s quiz marked complete`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: #14b8a6;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    // Re-render grids to update badges
    populateConflictGrid('conflictPersonAGrid', 'A');
    populateConflictGrid('conflictPersonBGrid', 'B');
    
    // Check if both now have surveys
    const personA = memberPools.dyad.find(m => m.id === conflictState.personA);
    const personB = memberPools.dyad.find(m => m.id === conflictState.personB);
    
    if (personA && personB && personA.quizDate && personB.quizDate) {
        // Both complete! Hide alert and show results
        const alertDiv = document.getElementById('surveyDeploymentAlert');
        if (alertDiv) {
            alertDiv.innerHTML = `
                <div class="alert-icon">✓</div>
                <div class="alert-content">
                    <h4 class="alert-title">All Quizzes Completed!</h4>
                    <p class="alert-message">Analyzing relationship chemistry...</p>
                </div>
            `;
            
            // Hide after 2 seconds and show results
            setTimeout(() => {
                if (alertDiv) alertDiv.style.display = 'none';
                updateConflictAnalysisFromGrid();
            }, 2000);
        }
    } else {
        // Update monitoring display
        showSurveyMonitoring();
    }
}


/**
 * Update conflict analysis from grid selections
 */
function updateConflictAnalysisFromGrid() {
    const personAId = conflictState.personA;
    const personBId = conflictState.personB;
    const resultsContainer = document.getElementById('conflictResults');
    
    console.log('updateConflictAnalysisFromGrid called', {personAId, personBId});
    
    if (!personAId || !personBId || personAId === personBId) {
        console.log('Invalid selection');
        if (resultsContainer) resultsContainer.style.display = 'none';
        return;
    }
    
    const personA = memberPools.dyad.find(m => m.id === personAId);
    const personB = memberPools.dyad.find(m => m.id === personBId);
    
    console.log('Found persons:', personA?.name, personB?.name);
    
    if (!personA || !personB) {
        console.log('Could not find persons');
        return;
    }
    
    if (!personA.quizDate || !personB.quizDate) {
        console.log('Missing quiz dates:', personA.quizDate, personB.quizDate);
        if (resultsContainer) resultsContainer.style.display = 'none';
        return;
    }
    
    console.log('Calculating dyadic chemistry...');
    
    // Directly calculate dyadic chemistry
    const dyadicResults = calculateDyadicChemistry(personA, personB);
    
    console.log('Dyadic results:', dyadicResults);
    
    // Display results
    displayConflictResults(dyadicResults, personA, personB);
    
    // Show results container
    if (resultsContainer) {
        console.log('Showing results container');
        resultsContainer.style.display = 'block';
    } else {
        console.log('ERROR: conflictResults container not found!');
    }
}

// ============================================
// LEGACY DROPDOWN FUNCTIONS (kept for compatibility)
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
    memberPools.dyad.forEach(member => {
        const optionA = document.createElement('option');
        optionA.value = member.id;
        optionA.textContent = member.name;
        personASelect.appendChild(optionA);
        
        const optionB = document.createElement('option');
        optionB.value = member.id;
        optionB.textContent = member.name;
        personBSelect.appendChild(optionB);
    });
    
    console.log('Conflict selects populated with', memberPools.dyad.length, 'members');
}

/**
 * Reset conflict view - clear selections and hide results
 * Called when view loads to prevent showing stale data
 */
function resetConflictView() {
    // Clear grid selections
    conflictState.personA = null;
    conflictState.personB = null;
    
    // Re-render grids
    populateConflictGrid('conflictPersonAGrid', 'A');
    populateConflictGrid('conflictPersonBGrid', 'B');
    
    // Hide survey alert
    const alertDiv = document.getElementById('surveyDeploymentAlert');
    if (alertDiv) alertDiv.style.display = 'none';
    
    // Clear legacy dropdowns (if they exist)
    const personASelect = document.getElementById('conflictPersonA');
    const personBSelect = document.getElementById('conflictPersonB');
    
    if (personASelect) personASelect.value = '';
    if (personBSelect) personBSelect.value = '';
    
    // Hide results container
    const resultsContainer = document.getElementById('conflictResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
    
    // Hide top preview area
    const previewArea = document.getElementById('conflictScorePreview');
    if (previewArea) {
        previewArea.style.display = 'none';
    }
    
    console.log('Conflict view reset');
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
            console.log('Cannot assess same person against themselves');
        }
        return;
    }
    
    // Get member data
    const personA = memberPools.dyad.find(m => m.id === personAId);
    const personB = memberPools.dyad.find(m => m.id === personBId);
    
    if (!personA || !personB) {
        console.error('Could not find member data');
        return;
    }
    
    console.log('Assessing conflict between:', personA.name, 'and', personB.name);
    
    // Calculate dyadic chemistry
    const dyadicResults = calculateDyadicChemistry(personA, personB);
    
    // Display results
    displayConflictResults(dyadicResults, personA, personB);
    
    // Show results container
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        // Results fade in naturally without auto-scroll
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
 * Display conflict resolution results with integrated analysis
 * Branches to Path 1 (action) or Path 2 (observation) based on severity
 */
function displayConflictResults(results, personA, personB) {
    // Store the names for use in component messages
    window.currentConflictPair = `${personA.name} and ${personB.name}`;
    
    // Display hero score in top preview area only
    const heroScoreTop = document.getElementById('dyadicChemistryScoreTop');
    if (heroScoreTop) {
        heroScoreTop.textContent = results.chemistry + '%';
    }
    
    // Show the top preview area
    const previewArea = document.getElementById('conflictScorePreview');
    if (previewArea) {
        previewArea.style.display = 'block';
    }
    
    // Get overall assessment
    const overallLevel = getDisconnectLevel(results.chemistry);
    
    // Branch to appropriate path based on severity
    if (overallLevel.severity === 'strong') {
        // PATH 2: Observation-only (Insignificant/No Disconnect)
        renderPath2Analysis(results, personA, personB, overallLevel);
    } else {
        // PATH 1: Action-oriented (Mild, Moderate, Significant)
        renderPath1Analysis(results, personA, personB, overallLevel);
    }
    
    console.log('Conflict results displayed for', personA.name, 'and', personB.name, '- Path:', overallLevel.severity === 'strong' ? 2 : 1);
}

/**
 * PATH 1: Action-Oriented Analysis (Mild, Moderate, Significant)
 * Shows constructive strategies with no-blame language
 */
function renderPath1Analysis(results, personA, personB, overallLevel) {
    // Populate overall assessment card with no-blame language
    const overallIcon = document.getElementById('overallSeverityIcon');
    const overallText = document.getElementById('overallSeverityText');
    const overallDesc = document.getElementById('overallDescription');
    const overallRec = document.getElementById('overallRecommendation');
    
    if (overallIcon) overallIcon.textContent = overallLevel.icon;
    if (overallText) overallText.textContent = overallLevel.hrText;
    
    // Apply badge styling
    const badge = document.querySelector('.assessment-badge');
    if (badge) {
        badge.className = 'assessment-badge disconnect-level ' + overallLevel.class;
    }
    
    // No-blame description based on severity
    let noBlameLangauge = '';
    if (overallLevel.severity === 'functional') {
        // Mild (66-75%) - ultra soft language
        noBlameLangauge = 'This analysis identifies slightly different communication patterns. Everyone\'s chemistry is naturally different - not better or worse, just unique. A few small adjustments in how you interact can easily strengthen this already-functional relationship. This is a very minor variance and will be extremely easy to address.';
    } else if (overallLevel.severity === 'minor') {
        // Moderate (56-65%)
        noBlameLangauge = 'This analysis identifies relationship dynamics without assigning blame to either party. Everyone\'s chemistry is different - not better or worse. Some differences in communication styles have been noticed. The focus is on constructive interventions that both team members can work on together to strengthen their working relationship through collaborative solutions.';
    } else {
        // Significant (45-55%) or Critical
        noBlameLangauge = 'This analysis identifies relationship dynamics without assigning blame to either party. Everyone\'s chemistry is naturally different - not better or worse, just unique. Notable chemistry differences have been observed. The focus is on constructive interventions that both team members can work on together to strengthen their working relationship through collaborative, structured communication strategies.';
    }
    
    if (overallDesc) {
        overallDesc.textContent = noBlameLangauge;
    }
    
    // Special messaging for Mild (functional) severity
    let recommendationText = '';
    if (overallLevel.severity === 'functional') {
        recommendationText = '<strong>Note:</strong> While a slight variance was noticed, this will be very easy to overcome with minimal adjustment.';
    } else {
        recommendationText = `<strong>Recommendation:</strong> ${overallLevel.recommendation}`;
    }
    
    if (overallRec) {
        overallRec.innerHTML = recommendationText;
    }
    
    // Prepare subscale data
    const subscaleData = [
        {
            key: 'understanding',
            name: 'How often my coworker and I understand each other completely',
            score: results.subscales.understanding,
            level: getDisconnectLevel(results.subscales.understanding)
        },
        {
            key: 'trust',
            name: 'How often my coworker and I fully trust each other\'s intentions',
            score: results.subscales.trust,
            level: getDisconnectLevel(results.subscales.trust)
        },
        {
            key: 'ease',
            name: 'How often my coworker and I feel instantly at ease with each other',
            score: results.subscales.ease,
            level: getDisconnectLevel(results.subscales.ease)
        },
        {
            key: 'integration',
            name: 'How often my coworker and I think and act exactly alike',
            score: results.subscales.integration,
            level: getDisconnectLevel(results.subscales.integration)
        }
    ];
    
    // Sort by score (lowest first - highlight worst performers)
    subscaleData.sort((a, b) => a.score - b.score);
    
    // Find lowest score for highlighting
    const lowestScore = subscaleData[0].score;
    
    // Populate subscales container with highlighting
    const container = document.getElementById('subscalesContainer');
    if (container) {
        container.innerHTML = '';
        
        subscaleData.forEach(subscale => {
            const item = createSubscaleDetailItem(subscale, subscale.score === lowestScore, 'path1');
            container.appendChild(item);
        });
    }
    
    // Show interventions based on severity
    displayPath1Interventions(results.subscales, overallLevel.severity);
}

/**
 * PATH 2: Observation-Only Analysis (Insignificant/No Disconnect 76%+)
 * Celebrates strengths, notes observations without alarm
 */
function renderPath2Analysis(results, personA, personB, overallLevel) {
    // Populate overall assessment card with celebratory language
    const overallIcon = document.getElementById('overallSeverityIcon');
    const overallText = document.getElementById('overallSeverityText');
    const overallDesc = document.getElementById('overallDescription');
    const overallRec = document.getElementById('overallRecommendation');
    
    if (overallIcon) overallIcon.textContent = overallLevel.icon;
    if (overallText) overallText.textContent = overallLevel.hrText;
    
    // Apply badge styling
    const badge = document.querySelector('.assessment-badge');
    if (badge) {
        badge.className = 'assessment-badge disconnect-level ' + overallLevel.class;
    }
    
    // Celebratory description
    const celebratoryLanguage = 'This relationship demonstrates excellent synchrony across all areas. The dyad exhibits optimal mental synchrony with exceptional alignment. This is a model partnership that demonstrates natural rapport and effective collaboration.';
    
    if (overallDesc) {
        overallDesc.textContent = celebratoryLanguage;
    }
    
    // Strong "no action needed" message
    if (overallRec) {
        overallRec.innerHTML = '<strong style="color: var(--success-primary);">No action needed - this relationship is functioning optimally.</strong> All is well.';
    }
    
    // Calculate median of subscales for comparison
    const subscaleScores = [
        results.subscales.understanding,
        results.subscales.trust,
        results.subscales.ease,
        results.subscales.integration
    ];
    const sortedScores = [...subscaleScores].sort((a, b) => a - b);
    const median = (sortedScores[1] + sortedScores[2]) / 2;
    
    // Prepare subscale data
    const subscaleData = [
        {
            key: 'understanding',
            name: 'How often my coworker and I understand each other completely',
            score: results.subscales.understanding,
            level: getDisconnectLevel(results.subscales.understanding),
            belowMedian: results.subscales.understanding < median
        },
        {
            key: 'trust',
            name: 'How often my coworker and I fully trust each other\'s intentions',
            score: results.subscales.trust,
            level: getDisconnectLevel(results.subscales.trust),
            belowMedian: results.subscales.trust < median
        },
        {
            key: 'ease',
            name: 'How often my coworker and I feel instantly at ease with each other',
            score: results.subscales.ease,
            level: getDisconnectLevel(results.subscales.ease),
            belowMedian: results.subscales.ease < median
        },
        {
            key: 'integration',
            name: 'How often my coworker and I think and act exactly alike',
            score: results.subscales.integration,
            level: getDisconnectLevel(results.subscales.integration),
            belowMedian: results.subscales.integration < median
        }
    ];
    
    // Sort by score (just for display consistency)
    subscaleData.sort((a, b) => a.score - b.score);
    
    // Populate subscales container with observation notes
    const container = document.getElementById('subscalesContainer');
    if (container) {
        container.innerHTML = '';
        
        subscaleData.forEach(subscale => {
            const item = createSubscaleDetailItem(subscale, subscale.belowMedian, 'path2');
            container.appendChild(item);
        });
    }
    
    // Hide interventions section for Path 2
    const interventionsContainer = document.getElementById('interventionsList');
    if (interventionsContainer) {
        interventionsContainer.innerHTML = '<p style="color: var(--success-primary); font-weight: 500; padding: 16px; background: var(--success-bg); border-radius: 8px;">✨ No interventions needed - continue current collaboration practices.</p>';
    }
}

/**
 * Create detailed subscale item with description and guidance
 * @param {object} subscale - Subscale data
 * @param {boolean} highlight - Whether to highlight this item (lowest score for Path 1, below median for Path 2)
 * @param {string} path - 'path1' or 'path2' to determine display style
 */
function createSubscaleDetailItem(subscale, highlight = false, path = 'path1') {
    const div = document.createElement('div');
    div.className = 'subscale-detail-item';
    
    // Add highlight class if this is the area of focus
    if (highlight && path === 'path1') {
        div.classList.add('subscale-highlight');
    } else if (highlight && path === 'path2') {
        div.classList.add('subscale-observation');
    }
    
    // Get specific guidance based on path
    let guidance = '';
    if (path === 'path1') {
        guidance = getPath1Guidance(subscale.key, subscale.score, subscale.level.severity);
    } else {
        guidance = getPath2Observation(subscale.key, highlight);
    }
    
    const guidanceClass = path === 'path1' 
        ? (subscale.level.severity === 'strong' || subscale.level.severity === 'functional' ? 'strength' : 'concern')
        : 'observation';
    
    div.innerHTML = `
        <div class="subscale-detail-header">
            <span class="subscale-detail-name">${subscale.name}</span>
            <span class="subscale-detail-score">${subscale.score}%</span>
            <span class="subscale-detail-badge disconnect-level ${subscale.level.class}">
                ${subscale.level.text}
            </span>
        </div>
        <div class="subscale-detail-guidance ${guidanceClass}">
            ${guidance}
        </div>
    `;
    
    return div;
}

/**
 * Get specific guidance text for each subscale based on severity
 */
function getSubscaleGuidance(key, score, severity) {
    const guidanceMap = {
        understanding: {
            critical: '⚠️ <strong>Critical gap in mutual comprehension.</strong> Communication patterns show significant misalignment. Implement structured communication protocols with specific check-ins for understanding.',
            moderate: '⚠️ <strong>Moderate comprehension gap.</strong> Messages may be unclear or misinterpreted. Consider communication skills training or facilitated dialogue sessions.',
            minor: 'ℹ️ <strong>Some communication friction.</strong> Occasional misunderstandings occur but relationship remains functional. Brief coaching on active listening may help.',
            functional: '✅ <strong>Good mutual understanding.</strong> Communication is clear and effective most of the time. Continue current practices and address minor issues as they arise.',
            strong: '🌟 <strong>Exceptional comprehension.</strong> Natural ability to understand each other\'s perspectives and intentions. This is a relationship strength to leverage.'
        },
        trust: {
            critical: '⚠️ <strong>Critical trust deficit.</strong> Confidence and reliability concerns affecting collaboration. Professional mediation and trust-building exercises strongly recommended.',
            moderate: '⚠️ <strong>Moderate trust concerns.</strong> Some reliability or confidence issues present. Facilitated trust-building activities and clear expectation setting recommended.',
            minor: 'ℹ️ <strong>Minor trust friction.</strong> Generally reliable but occasional doubts surface. Regular check-ins and transparent communication can strengthen confidence.',
            functional: '✅ <strong>Solid mutual respect.</strong> Strong foundation of trust and reliability. Maintain through consistent follow-through and open communication.',
            strong: '🌟 <strong>Exceptional mutual confidence.</strong> Deep trust and respect form the bedrock of this relationship. Consider this dyad for high-stakes collaborative work.'
        },
        ease: {
            critical: '⚠️ <strong>Significant discomfort.</strong> Interactions feel strained or uncomfortable. Structured protocols and possible workspace adjustments may be needed.',
            moderate: '⚠️ <strong>Some tension present.</strong> Interactions occasionally feel uncomfortable or awkward. Communication style awareness training may improve ease.',
            minor: 'ℹ️ <strong>Occasional unease.</strong> Generally comfortable but some situations feel strained. Brief coaching on interpersonal dynamics could help.',
            functional: '✅ <strong>Natural comfort.</strong> Interactions flow smoothly with minimal awkwardness. Continue fostering this positive dynamic.',
            strong: '🌟 <strong>Effortless rapport.</strong> Exceptional ease and comfort in all interactions. This natural chemistry is a significant asset.'
        },
        integration: {
            critical: '⚠️ <strong>Significant coordination challenges.</strong> Work styles and approaches frequently clash. Clear role delineation and coordination protocols essential.',
            moderate: '⚠️ <strong>Moderate alignment issues.</strong> Work styles show some mismatch requiring conscious coordination. Process alignment meetings recommended.',
            minor: 'ℹ️ <strong>Minor coordination friction.</strong> Generally aligned but occasional mismatches in approach. Brief process clarification sessions may help.',
            functional: '✅ <strong>Well-coordinated teamwork.</strong> Work styles complement each other effectively. Maintain current coordination practices.',
            strong: '🌟 <strong>Seamless synchronization.</strong> Exceptional natural alignment in thinking and action. Ideal pairing for complex collaborative projects.'
        }
    };
    
    return guidanceMap[key]?.[severity] || 'No specific guidance available.';
}

/**
 * PATH 1: Get constructive guidance with no-blame language
 * Emphasizes chemistry differences, not deficits
 */
function getPath1Guidance(key, score, severity) {
    // Get the current conflict pair names (stored when analysis runs)
    const names = window.currentConflictPair || 'the two team members';
    
    // Client's exact 16 messages organized by component and severity
    const componentMessages = {
        understanding: {
            significant: `Chemistry component sub-scores that are below 55% suggest a severe disconnect between ${names}, who simply cannot fathom what each other is talking about, which may happen whether or not they are in conflict. Messages between them may land differently than intended. To bridge the disconnect, they can ask each other, 'How does what I'm saying sound to you?' If they simply cannot clarify what they intend to communicate, getting around this severe disconnect, they may have to consider working in separate teams.`,
            moderate: `Chemistry component sub-scores of 55% to 70% suggest a moderate 'disconnect' that may account for misunderstandings between ${names}, which would happen whether or not they were in conflict. Both of them should think of remedies that they might use while working together that could overcome this type of disconnect to avoid any misunderstandings. Messages may land differently than intended. Consider asking 'How does this sound to you?' to bridge the gap. Both styles are valid.`,
            mild: `Chemistry component sub-scores of 71 to 87% suggest a mild 'disconnect' between ${names}. This particular chemistry component score reveals a minor disconnect that is unlikely to be the primary source of their conflict. External pressures may be contributing. A direct conversation between them about specific concerns may help clarify the real issue, which is apart from their relationship.`,
            negligible: `Chemistry component sub-scores of 88 to 100% suggest a negligible disconnect between ${names} about which both of them are unaware and do not intend. This particular chemistry component score reveals a negligible disconnect that is unlikely to be the primary source of their conflict. External pressures may be contributing. A direct conversation between them about specific concerns may help clarify the real issue, apart from their relationship.`
        },
        ease: {
            significant: `Chemistry component sub-scores that are below 55% suggest a severe disconnect about which ${names} are unaware and do not intend. This particular type of disconnect may account for spontaneously experiencing each other as overbearing, intrusive, unsympathetic or cold, whether or not they are in conflict. They should periodically seek feedback from each other to correct any such misperceptions that might cause friction between them, or a tendency to avoid working together. If unable to bridge such a severe disconnect, they may have to consider being assigned to separate teams, or perhaps work independently.`,
            moderate: `Chemistry component sub-scores of 55% to 70% suggest a moderate 'disconnect' that may account for ${names} feeling ill at ease with each other, which would happen whether or not they were in conflict. Both of them should think of remedies that they might use while working together that can help to overcome this type of disconnect to prevent any kind of friction or tendency to avoid working together.`,
            mild: `Chemistry component sub-scores of 71 to 87% suggest a mild 'disconnect' between ${names} about which both of them are unaware and do not intend. This particular chemistry component score indicates a minor disconnect that is unlikely to be the primary source of their conflict. External pressures may be contributing. A direct conversation between them about specific concerns may help clarify the real issue, which is apart from their relationship. A direct conversation about specific concerns may help clarify the real issue. They should find ways to put each other at ease.`,
            negligible: `Chemistry component sub-scores of 88 to 100% suggest a negligible 'disconnect' between ${names} about which both of them are unaware and do not intend. This particular chemistry component score indicates a minor disconnect that is unlikely to be the primary source of their conflict. External pressures may be contributing. A direct conversation between them about specific concerns may help clarify the real issue, which is apart from their relationship. A direct conversation about specific concerns may help clarify the real issue. They should find ways to put each other at ease.`
        },
        trust: {
            significant: `Chemistry component sub-scores of less than 55% suggest a severe disconnect between ${names}, who act more as competitors than teammates with each other. They believe that the other is striving to close the most deals, earn the highest commissions and perhaps become known as a 'super achiever,' while simultaneously undermining, sabotaging and diminishing their own standing in the company. Each feels misunderstood, regarding the other as dishonest about their true intentions. Unintentionally, they trigger intuitive, spontaneous mistrust in one another, which can lead to not just this one conflict, but conflict in general. They need to have a constructive, rational discussion about implementing possible solutions that can overcome their natural tendency for mistrust of each other. If unable to bridge over this severe disconnect, they may have to be assigned to separate teams, or else work independently.`,
            moderate: `Chemistry component sub-scores of 55% to 70% suggest a moderate 'disconnect' that may account for ${names} who feel more like competitors than teammates. They are not open and honest with each other, which interferes with sharing information and assisting each other. If something goes wrong, instead of collaborating to fix the problem, they avoid taking responsibility and automatically blame one another. To overcome this disconnect, they need to learn that their mistrust is spontaneous and intuitive, which can lead to not just this one conflict, but conflict in general. A constructive, rational discussion about implementing possible remedies to overcome their natural tendency for mutual mistrust may resolve this issue.`,
            mild: `Chemistry component sub-scores of 71 to 87% suggest a mild 'disconnect' between ${names}. This mild disconnect is unlikely to be the primary source of their conflict. External pressures may be contributing. An open conversation about their specific concerns may help clarify the real issue, apart from their work relationship, while at the same time find ways to put each other at ease.`,
            negligible: `Chemistry component sub-scores of 88 to 100% suggest a negligible 'disconnect' between ${names} about which both of them are unaware and do not intend. This particular disconnect is unlikely to be the primary source of their conflict. External pressures may be contributing. An open conversation between them about specific concerns may help clarify the real issue, apart from their work relationship.`
        },
        integration: {
            significant: `Chemistry component sub-scores that are below 55% suggest a severe disconnect about which ${names} are unaware and do not intend. Their work styles are so unalike in how they think and act that they get in each other's way, which interferes with getting the job done. Chaotic interaction between them reduces their productivity, which can result in arguments. They need to discuss and understand differences in their equally valid work styles and then consider how both styles might be combined, without getting in each other's way. If such discussion fails, they may need to be assigned to separate teams, or else work independently.`,
            moderate: `Chemistry component sub-scores of 55% to 70% suggest a moderate 'disconnect' that may account for ${names} who would need to periodically explain every detail to avoid slowing each other down, which reduces productivity and causes friction between them. Such a disconnect that would happen whether or not they were in conflict. They need to discuss and understand differences in their equally valid work styles and then consider how both styles might be combined, without getting in each other's way.`,
            mild: `Chemistry component sub-scores of 71 to 87% suggest a mild 'disconnect' between ${names}. This mild disconnect is unlikely to be the primary source of their conflict. External pressures may be contributing. An open conversation about their specific concerns may help clarify the real issue, apart from their relationship, while at the same time find ways to put each other at ease.`,
            negligible: `Chemistry component sub-scores of 88 to 100% suggest a negligible 'disconnect' between ${names} about which both of them are unaware and do not intend. This particular disconnect is unlikely to be the primary source of their conflict. External pressures may be contributing. An open conversation between them about specific concerns may help clarify the real issue, apart from their relationship.`
        }
    };
    
    return componentMessages[key]?.[severity] || 'Different approaches noticed. Both are valid - find ways to work together.';
}

/**
 * PATH 2: Get observation text for high-performing subscales
 * Notes below-median items without alarm
 */
function getPath2Observation(key, belowMedian) {
    const observations = {
        understanding: belowMedian 
            ? '📊 <strong>Interesting observation:</strong> This component scores slightly lower than others. This is perfectly normal variation - communication is still excellent. No cause for concern.'
            : '✨ This component shows strong alignment with your overall excellent synchrony.',
        trust: belowMedian
            ? '📊 <strong>Interesting observation:</strong> This component scores slightly lower than others. This is perfectly normal variation - mutual respect is still strong. No cause for concern.'
            : '✨ This component shows strong alignment with your overall excellent synchrony.',
        ease: belowMedian
            ? '📊 <strong>Interesting observation:</strong> This component scores slightly lower than others. This is perfectly normal variation - comfort levels are still high. No cause for concern.'
            : '✨ This component shows strong alignment with your overall excellent synchrony.',
        integration: belowMedian
            ? '📊 <strong>Interesting observation:</strong> This component scores slightly lower than others. This is perfectly normal variation - coordination is still effective. No cause for concern.'
            : '✨ This component shows strong alignment with your overall excellent synchrony.'
    };
    
    return observations[key] || '✨ Strong performance in this area.';
}

/**
 * PATH 1: Display interventions based on severity level
 * Shows 1-2 for Mild, 2-3 for Moderate, 3-4 for Significant
 */
function displayPath1Interventions(subscales, severity) {
    const container = document.getElementById('interventionsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Find areas needing intervention (sorted by score)
    const needsIntervention = Object.entries(subscales)
        .filter(([key, score]) => score < 76) // Below "negligible" threshold
        .sort((a, b) => a[1] - b[1]); // Lowest scores first
    
    if (needsIntervention.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); line-height: 1.6;">No specific interventions needed.</p>';
        return;
    }
    
    // Intervention templates with no-blame language
    const interventions = {
        understanding: {
            title: 'Clear Communication Check-ins',
            description: 'Set up regular brief meetings where both people confirm they understand key points before moving forward. This helps prevent misunderstandings.'
        },
        trust: {
            title: 'Written Commitment Tracking',
            description: 'Write down who will do what and by when. Keep it simple and visible to both people. This builds accountability and trust.'
        },
        ease: {
            title: 'Communication Style Discussion',
            description: 'Talk openly about how each person prefers to receive feedback and communicate. Some like direct, others prefer gentle. Find a middle ground that works for both.'
        },
        integration: {
            title: 'Work Style Agreement',
            description: 'Create a simple written agreement about how you will work together. Cover things like planning vs. flexibility, meeting frequency, and decision-making. Keep it practical and update as needed.'
        }
    };
    
    // Determine number of interventions based on severity
    let maxInterventions = 2; // Default for Mild
    if (severity === 'minor') maxInterventions = 3; // Moderate
    if (severity === 'moderate' || severity === 'critical') maxInterventions = 4; // Significant/Critical
    
    // Display interventions
    const topInterventions = needsIntervention.slice(0, maxInterventions);
    
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
    
    // For Moderate/Significant/Critical scores: Add alternative team configuration recommendation
    if (severity === 'minor' || severity === 'moderate' || severity === 'critical') {
        const altConfigCard = document.createElement('div');
        altConfigCard.className = 'intervention-card alternative-config-card';
        altConfigCard.style.borderLeft = '4px solid #8b5cf6';
        altConfigCard.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))';
        
        altConfigCard.innerHTML = `
            <div style="display: flex; align-items: start; gap: 16px;">
                <div style="font-size: 2rem; line-height: 1; flex-shrink: 0;">🔄</div>
                <div style="flex: 1;">
                    <div class="intervention-title" style="color: #8b5cf6;">Consider Alternative Team Configuration</div>
                    <div class="intervention-description" style="margin-bottom: 12px;">
                        Based on this chemistry analysis, these team members may thrive better in different team configurations. 
                        Rather than forcing compatibility, consider exploring alternative pairings where both individuals can excel naturally.
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 16px;">
                        <button onclick="showView('build')" style="padding: 8px 16px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.875rem;">
                            Build New Team
                        </button>
                        <button onclick="showView('optimize')" style="padding: 8px 16px; background: transparent; color: var(--text-primary); border: 1px solid var(--border-primary); border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.875rem;">
                            Optimize Existing Team
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(altConfigCard);
    }
    
    console.log('Path 1 interventions displayed:', topInterventions.length);
}

/**
 * Get disconnect severity level based on dyadic chemistry score
 * 5-level system based on Mental Synchrony research and organizational psychology
 * @param {number} score - Dyadic chemistry percentage (0-100)
 * @returns {object} Level details with text, class, icon, and description
 */
function getDisconnectLevel(score) {
    if (score >= 88) {
        return {
            severity: 'negligible',
            text: 'Negligible',
            hrText: 'Negligible Disconnect',
            class: 'disconnect-negligible',
            description: 'Your chemistry scores show strong alignment. This conflict likely stems from external factors — workload, unclear expectations, or process issues — rather than your working relationship.',
            recommendation: 'Focus on identifying external factors contributing to the conflict.'
        };
    } else if (score >= 71) {
        return {
            severity: 'mild',
            text: 'Mild',
            hrText: 'Mild Disconnect',
            class: 'disconnect-mild',
            description: 'Your chemistry scores show minor differences unlikely to be the primary source of conflict. External pressures may be contributing. A direct conversation about specific concerns may help clarify the real issue.',
            recommendation: 'Address external factors and have an open conversation about specific concerns.'
        };
    } else if (score >= 55) {
        return {
            severity: 'moderate',
            text: 'Moderate',
            hrText: 'Moderate Disconnect',
            class: 'disconnect-moderate',
            description: 'Chemistry component sub-scores of 55% to 70% suggest moderate \'disconnects\' that are apparent between you and your co-worker, about which both of you are unaware and do not intend. Such disconnects happen spontaneously beyond anyone\'s control. They never go away. No one is to blame for them. To what extent, if any, have they contributed to your conflict? Please think of remedies that both of you might use while working together that could overcome such disconnects, as one source of future misunderstandings and mistrust, besides considering possible company issues that might be contributing as well.',
            recommendation: 'Develop mutual awareness strategies and consider both chemistry factors and external issues.'
        };
    } else {
        return {
            severity: 'significant',
            text: 'Significant',
            hrText: 'Significant Disconnect',
            class: 'disconnect-significant',
            description: 'Chemistry component sub-scores of 55% or less suggest significant \'disconnects\' that are apparent between you and your co-worker, about which both of you are unaware and do not intend. Such disconnects happen spontaneously beyond anyone\'s control. They never go away. No one is to blame for them. How have they contributed to your conflict? Please think of remedies that both of you might use while working together to overcome them, so as to avoid future misunderstandings and mistrust.',
            recommendation: 'Develop specific remedies to work around these inherent disconnects.'
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
        understanding: 'How often my coworker and I understand each other completely',
        trust: 'How often my coworker and I fully trust each other\'s intentions',
        ease: 'How often my coworker and I feel instantly at ease with each other',
        integration: 'How often my coworker and I think and act exactly alike'
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
            title: 'Clear Communication Check-ins',
            description: 'Set up weekly 15-minute meetings where both people confirm they understand key points before moving forward. This helps prevent misunderstandings from building up.'
        },
        trust: {
            title: 'Build Reliability Step-by-Step',
            description: 'Start with small promises and consistently follow through. Use a simple shared list to track commitments. Trust builds gradually through reliable actions over time.'
        },
        ease: {
            title: 'Communication Style Discussion',
            description: 'Have an open conversation about how each person prefers to communicate - email, phone, Slack, face-to-face. Write down what works for both and stick to it.'
        },
        integration: {
            title: 'Work Style Agreement',
            description: 'Write a simple document together covering how you will work - meeting frequency, decision-making, and planning. Review it monthly and adjust as needed.'
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
    console.log('Archive button clicked!');
    
    const personAName = document.getElementById('conflictPersonA')?.selectedOptions[0]?.text || 'Person A';
    const personBName = document.getElementById('conflictPersonB')?.selectedOptions[0]?.text || 'Person B';
    const chemistry = document.getElementById('dyadicChemistryScore')?.textContent || '--';
    
    console.log('Archive conflict report:', { personAName, personBName, chemistry });
    
    // Show archive confirmation modal
    const modal = document.getElementById('archiveReportModal');
    const pairNames = document.getElementById('archivedPairNames');
    const timestamp = document.getElementById('archivedTimestamp');
    
    console.log('Modal elements found:', { modal: !!modal, pairNames: !!pairNames, timestamp: !!timestamp });
    
    if (!modal) {
        console.error('Archive modal not found!');
        alert('Archive confirmation modal not found. Report has been logged.');
        return;
    }
    
    if (pairNames) {
        pairNames.innerHTML = `${personAName}<br><span style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 400;">and</span><br>${personBName}`;
    }
    
    if (timestamp) {
        // Format timestamp
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        timestamp.textContent = `Archived ${dateStr} at ${timeStr}`;
    }
    
    // Force display
    modal.style.display = 'flex';
    console.log('Modal display set to flex');
}

/**
 * Close archive report confirmation modal
 */
function closeArchiveModal() {
    const modal = document.getElementById('archiveReportModal');
    if (modal) {
        modal.style.display = 'none';
    }
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
window.closeArchiveModal = closeArchiveModal;
window.deployInterventions = deployInterventions;
window.initializeConflictGrids = initializeConflictGrids;
window.selectConflictMember = selectConflictMember;
window.sendDyadSurvey = sendDyadSurvey;
window.remindSurvey = remindSurvey;
window.markSurveyComplete = markSurveyComplete;

console.log('Phase 4C: Conflict resolution functions loaded');

// ========================================
// MODULE 3: MATCH A SUPERVISOR FUNCTIONS
// ========================================

/**
 * Populate the supervisor and team selection dropdowns
 * Called when supervisor view loads
 */
function populateSupervisorSelects() {
    const teamSelect = document.getElementById('supervisorTeam');
    const supervisorSelect = document.getElementById('supervisorCandidate');
    
    if (!teamSelect || !supervisorSelect) {
        console.error('Supervisor select elements not found');
        return;
    }

    // Clear existing options (except placeholder)
    teamSelect.innerHTML = '<option value="">Choose a team...</option>';
    supervisorSelect.innerHTML = '<option value="">Choose a supervisor...</option>';

    // Populate teams from active assessments
    // In real app, this would come from teams created in "Build a Team" module
    // For demo, we'll create sample teams with subscale data
    const sampleTeams = [
        { 
            id: 'team-1', 
            name: 'Engineering Team Alpha', 
            chemistry: 82,
            subscales: { understanding: 80, trust: 85, ease: 82, integration: 81 }
        },
        { 
            id: 'team-2', 
            name: 'Marketing Core Team', 
            chemistry: 76,
            subscales: { understanding: 74, trust: 78, ease: 76, integration: 76 }
        },
        { 
            id: 'team-3', 
            name: 'Sales Division Beta', 
            chemistry: 71,
            subscales: { understanding: 68, trust: 74, ease: 72, integration: 70 }
        },
        { 
            id: 'team-4', 
            name: 'Product Design Squad', 
            chemistry: 88,
            subscales: { understanding: 86, trust: 90, ease: 88, integration: 88 }
        },
        { 
            id: 'team-5', 
            name: 'Customer Success Team', 
            chemistry: 79,
            subscales: { understanding: 77, trust: 81, ease: 79, integration: 79 }
        }
    ];
    
    // Export to window for access by other functions
    window.sampleTeams = sampleTeams;

    sampleTeams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.id;
        option.textContent = `${team.name} (${team.chemistry}%)`;
        option.dataset.chemistry = team.chemistry;
        teamSelect.appendChild(option);
    });

    // Populate supervisors from member pool
    memberPools.team.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = member.name;
        option.dataset.chemistry = member.msScore; // Use msScore from member data
        supervisorSelect.appendChild(option);
    });

    console.log('Supervisor selects populated:', {
        teams: sampleTeams.length,
        supervisors: memberPools.team.length
    });
}

/**
 * Update supervisor match analysis when selections change
 */
function updateSupervisorMatch() {
    const teamSelect = document.getElementById('supervisorTeam');
    const supervisorSelect = document.getElementById('supervisorCandidate');
    const resultsContainer = document.getElementById('supervisorResults');
    
    const teamId = teamSelect.value;
    const supervisorId = supervisorSelect.value;

    // Hide results if either selection is empty
    if (!teamId || !supervisorId) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Get chemistry scores
    const teamChemistry = getTeamChemistry(teamId);
    const supervisorChemistry = getSupervisorChemistry(supervisorId);

    // Check if supervisor has completed their assessment
    if (!supervisorChemistry || supervisorChemistry === 0) {
        // Show "no assessment" state
        displayNoAssessmentState(teamChemistry, supervisorId);
        resultsContainer.style.display = 'block';
        return;
    }

    // Calculate match score and quality (only if both scores exist)
    const matchResult = calculateMatchScore(teamChemistry, supervisorChemistry);

    // Display results
    displaySupervisorMatch(matchResult, teamId, supervisorId);

    // Show results container
    resultsContainer.style.display = 'block';

    console.log('Match updated:', matchResult);
}

/**
 * Get team chemistry score from team ID
 * @param {string} teamId - Team identifier
 * @returns {number} Team chemistry percentage
 */
function getTeamChemistry(teamId) {
    const teamSelect = document.getElementById('supervisorTeam');
    const selectedOption = teamSelect.querySelector(`option[value="${teamId}"]`);
    
    if (selectedOption && selectedOption.dataset.chemistry) {
        return parseInt(selectedOption.dataset.chemistry);
    }
    
    console.warn('Team chemistry not found for:', teamId);
    return 0;
}

/**
 * Get supervisor chemistry score from member ID
 * @param {string} supervisorId - Supervisor member ID
 * @returns {number} Supervisor chemistry percentage
 */
function getSupervisorChemistry(supervisorId) {
    const supervisorSelect = document.getElementById('supervisorCandidate');
    const selectedOption = supervisorSelect.querySelector(`option[value="${supervisorId}"]`);
    
    if (selectedOption && selectedOption.dataset.chemistry) {
        return parseInt(selectedOption.dataset.chemistry);
    }
    
    console.warn('Supervisor chemistry not found for:', supervisorId);
    return 0;
}

/**
 * Calculate match score using min(team, supervisor) algorithm
 * Client's requirement: "selecting the lower of the two as the match score"
 * @param {number} teamScore - Team chemistry percentage
 * @param {number} supervisorScore - Supervisor chemistry percentage
 * @returns {object} Match result with score, quality, and analysis
 */
function calculateMatchScore(teamScore, supervisorScore) {
    // Core algorithm: Calculate new team chemistry with supervisor added
    // Assumes typical team of 4 members, supervisor is 5th person
    // New chemistry = weighted average of team and supervisor scores
    const matchScore = Math.round(((teamScore * 4) + supervisorScore) / 5);
    
    // Determine match quality based on relationship between scores
    const matchQuality = getMatchQuality(matchScore, teamScore, supervisorScore);
    
    // Determine bottleneck (what's limiting the match)
    const bottleneck = matchScore === teamScore ? 'team' : 'supervisor';
    
    return {
        matchScore: matchScore,
        teamScore: teamScore,
        supervisorScore: supervisorScore,
        quality: matchQuality,
        bottleneck: bottleneck,
        differential: Math.abs(teamScore - supervisorScore)
    };
}

/**
 * Determine match quality level
 * Client specification: 
 * - If match score drops below team score = poor match
 * - If stays same = good match
 * @param {number} matchScore - The minimum score
 * @param {number} teamScore - Team chemistry score
 * @param {number} supervisorScore - Supervisor chemistry score
 * @returns {object} Quality level with emoji and description
 */
function getMatchQuality(matchScore, teamScore, supervisorScore) {
    // Calculate actual change in team chemistry
    const change = matchScore - teamScore;
    const absoluteChange = Math.abs(change);
    
    // DEGRADES: Match score is lower than original team score (RED)
    if (change < 0) {
        return {
            level: 'poor',
            emoji: '🔴',
            text: `Degrades team chemistry by ${absoluteChange} point${absoluteChange !== 1 ? 's' : ''}`,
            description: `Adding this supervisor would reduce overall team chemistry from ${teamScore}% to ${matchScore}%. Not recommended.`
        };
    }
    
    // IMPROVES: Match score is higher than original team score (GREEN)
    if (change > 0) {
        return {
            level: 'excellent',
            emoji: '✅',
            text: `Improves team chemistry by ${absoluteChange} point${absoluteChange !== 1 ? 's' : ''}`,
            description: `Adding this supervisor would increase overall team chemistry from ${teamScore}% to ${matchScore}%.`
        };
    }
    
    // MAINTAINS: No change in score (NEUTRAL)
    return {
        level: 'good',
        emoji: '⚖️',
        text: `Maintains team chemistry at ${teamScore}%`,
        description: 'Adding this supervisor would maintain the current team chemistry level without improvement or degradation.'
    };
}

/**
 * Display "no assessment" state when supervisor hasn't completed their quiz
 * @param {number} teamChemistry - Team chemistry score
 * @param {string} supervisorId - Supervisor member ID
 */
function displayNoAssessmentState(teamChemistry, supervisorId) {
    // Get supervisor name
    const supervisorSelect = document.getElementById('supervisorCandidate');
    const supervisorName = supervisorSelect.options[supervisorSelect.selectedIndex].text;
    
    // Update score displays
    document.getElementById('teamChemistryScore').textContent = teamChemistry + '%';
    document.getElementById('supervisorReadinessScore').textContent = '--';
    
    // Update match indicator to show "assessment needed" - make it clickable
    const indicator = document.getElementById('matchQualityIndicator');
    indicator.className = 'match-indicator caution clickable';
    indicator.style.cursor = 'pointer';
    indicator.onclick = () => sendSupervisorQuiz(supervisorId, supervisorName);
    indicator.innerHTML = `
        <span class="match-emoji">📋</span>
        <span class="match-text">Assessment Quiz Needed - Send</span>
    `;
    
    // Update explanation
    document.getElementById('matchExplanation').innerHTML = `
        <strong>${supervisorName}</strong> has not completed their individual chemistry assessment yet. 
        Send them the quiz to generate a match prediction.
    `;
    
    // Show action needed in impact assessment
    const container = document.getElementById('impactAssessment');
    container.innerHTML = `
        <h4 class="subsection-title" style="margin-bottom: 16px;">Next Steps</h4>
        <div class="impact-item">
            <div class="impact-icon">📋</div>
            <div class="impact-content">
                <div class="impact-title">Assessment Required</div>
                <div class="impact-description">${supervisorName} needs to complete the individual chemistry assessment before a match can be calculated.</div>
            </div>
        </div>
        <div class="impact-item">
            <div class="impact-icon">⚡</div>
            <div class="impact-content">
                <div class="impact-title">Quick Process</div>
                <div class="impact-description">The assessment takes 2 minutes to complete and provides an instant match prediction.</div>
            </div>
        </div>
        <div class="impact-item">
            <div class="impact-icon">🎯</div>
            <div class="impact-content">
                <div class="impact-title">Predictive Matching</div>
                <div class="impact-description">Using individual chemistry profiles, we predict compatibility before making hiring decisions.</div>
            </div>
        </div>
    `;
    
    // Hide subscale comparison (not applicable without data)
    const subscaleContainer = document.getElementById('subscaleComparison');
    subscaleContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Subscale comparison will be available after assessment is completed.</p>';
    
    console.log('No assessment state displayed for:', supervisorName);
}

/**
 * Display supervisor match results in UI
 * @param {object} matchResult - Match calculation results
 * @param {string} teamId - Selected team ID
 * @param {string} supervisorId - Selected supervisor ID
 */
function displaySupervisorMatch(matchResult, teamId, supervisorId) {
    // Update score displays
    document.getElementById('teamChemistryScore').textContent = matchResult.teamScore + '%';
    document.getElementById('supervisorReadinessScore').textContent = matchResult.matchScore + '%';
    
    // Update match indicator
    const indicator = document.getElementById('matchQualityIndicator');
    indicator.className = 'match-indicator ' + matchResult.quality.level;
    
    // For good/excellent matches, make indicator clickable to deploy
    if (matchResult.quality.level === 'excellent' || matchResult.quality.level === 'good') {
        indicator.classList.add('clickable');
        indicator.style.cursor = 'pointer';
        indicator.onclick = () => assignSupervisor();
        indicator.innerHTML = `
            <span class="match-emoji">${matchResult.quality.emoji}</span>
            <span class="match-text">${matchResult.quality.text} - Deploy</span>
        `;
    } else if (matchResult.quality.level === 'caution') {
        // Caution matches - clickable to show review guidance
        indicator.classList.add('clickable');
        indicator.style.cursor = 'pointer';
        indicator.innerHTML = `
            <span class="match-emoji">${matchResult.quality.emoji}</span>
            <span class="match-text">${matchResult.quality.text} - View Guidance</span>
        `;
        // Set onclick AFTER innerHTML to prevent it from being lost
        indicator.onclick = () => {
            console.log('Caution indicator clicked, showing review guidance');
            showReviewGuidance(matchResult);
        };
    } else {
        // Poor matches - not clickable
        indicator.style.cursor = 'default';
        indicator.onclick = null;
        indicator.innerHTML = `
            <span class="match-emoji">${matchResult.quality.emoji}</span>
            <span class="match-text">${matchResult.quality.text}</span>
        `;
    }
    
    // Update explanation
    document.getElementById('matchExplanation').textContent = matchResult.quality.description;
    
    // Display impact assessment
    displayImpactAssessment(matchResult);
    
    // Display subscale comparison
    displaySubscaleComparison(supervisorId);
    
    // Update Assign Supervisor button state based on match quality
    const assignBtn = document.getElementById('assignSupervisorBtn');
    if (assignBtn) {
        if (matchResult.quality.level === 'poor') {
            // Disable button for poor matches
            assignBtn.disabled = true;
            assignBtn.style.opacity = '0.5';
            assignBtn.style.cursor = 'not-allowed';
            assignBtn.title = 'Assignment not recommended for poor matches';
        } else {
            // Enable button for all other matches
            assignBtn.disabled = false;
            assignBtn.style.opacity = '1';
            assignBtn.style.cursor = 'pointer';
            assignBtn.title = 'Assign this supervisor to the team';
        }
    }
}

/**
 * Display impact assessment based on match quality
 * @param {object} matchResult - Match calculation results
 */
function displayImpactAssessment(matchResult) {
    const container = document.getElementById('impactAssessment');
    
    let impactHTML = '<h4 class="subsection-title" style="margin-bottom: 16px;">Expected Impact</h4>';
    
    // Generate impact items based on quality level
    if (matchResult.quality.level === 'excellent' || matchResult.quality.level === 'good') {
        impactHTML += `
            <div class="impact-item">
                <div class="impact-icon">📈</div>
                <div class="impact-content">
                    <div class="impact-title">Team Performance</div>
                    <div class="impact-description">Strong alignment expected to maintain or improve team chemistry and productivity.</div>
                </div>
            </div>
            <div class="impact-item">
                <div class="impact-icon">🤝</div>
                <div class="impact-content">
                    <div class="impact-title">Leadership Effectiveness</div>
                    <div class="impact-description">Supervisor's natural chemistry supports team dynamics without disruption.</div>
                </div>
            </div>
            <div class="impact-item">
                <div class="impact-icon">⚡</div>
                <div class="impact-content">
                    <div class="impact-title">Onboarding</div>
                    <div class="impact-description">Minimal adjustment period expected. Team integration should be smooth.</div>
                </div>
            </div>
        `;
    } else if (matchResult.quality.level === 'caution') {
        impactHTML += `
            <div class="impact-item">
                <div class="impact-icon">⚠️</div>
                <div class="impact-content">
                    <div class="impact-title">Chemistry Mismatch</div>
                    <div class="impact-description">${matchResult.differential} point gap between team and supervisor chemistry may affect dynamics.</div>
                </div>
            </div>
            <div class="impact-item">
                <div class="impact-icon">🎓</div>
                <div class="impact-content">
                    <div class="impact-title">Recommended Action</div>
                    <div class="impact-description">Consider targeted training or team integration workshops before assignment.</div>
                </div>
            </div>
            <div class="impact-item">
                <div class="impact-icon">📊</div>
                <div class="impact-content">
                    <div class="impact-title">Monitor Closely</div>
                    <div class="impact-description">Track team chemistry metrics weekly for first 90 days after assignment.</div>
                </div>
            </div>
        `;
    } else {
        impactHTML += `
            <div class="impact-item">
                <div class="impact-icon">❌</div>
                <div class="impact-content">
                    <div class="impact-title">Significant Mismatch</div>
                    <div class="impact-description">${matchResult.differential} point chemistry gap poses high risk to team performance.</div>
                </div>
            </div>
            <div class="impact-item pulse-glow">
                <div class="impact-icon">🔄</div>
                <div class="impact-content">
                    <div class="impact-title">Alternative Recommended</div>
                    <div class="impact-description">Consider selecting a different supervisor with higher chemistry alignment.</div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = impactHTML;
}

/**
 * Display detailed subscale comparison
 * @param {string} supervisorId - Supervisor member ID
 */
function displaySubscaleComparison(supervisorId) {
    const container = document.getElementById('subscaleComparison');
    
    // Get supervisor's subscales
    const supervisor = memberPools.team.find(m => m.id === supervisorId);
    
    if (!supervisor || !supervisor.subscales) {
        container.innerHTML = '<p class="no-data-message">Subscale data not available for detailed comparison.</p>';
        return;
    }
    
    // For demo, we'll use average team subscales
    // In real app, this would come from selected team's actual data
    const teamSubscales = {
        understanding: 75,
        trust: 78,
        ease: 73,
        integration: 76
    };
    
    const subscaleLabels = {
        understanding: 'Truly understanding each other',
        trust: 'Totally respecting one another',
        ease: 'Instantly feeling at ease together',
        integration: 'Spontaneously thinking and acting alike'
    };
    
    let comparisonHTML = '';
    
    Object.keys(teamSubscales).forEach(key => {
        const teamScore = teamSubscales[key];
        const supervisorScore = supervisor.subscales[key];
        const difference = supervisorScore - teamScore;
        const differenceSign = difference >= 0 ? '+' : '';
        
        comparisonHTML += `
            <div class="subscale-row">
                <div class="subscale-label">${subscaleLabels[key]}</div>
                <div class="subscale-score supervisor">${supervisorScore}% <span class="score-delta">(${differenceSign}${difference})</span></div>
            </div>
        `;
    });
    
    container.innerHTML = comparisonHTML;
}

/**
 * Reset supervisor selections to try another match
 */
function tryAnotherSupervisor() {
    document.getElementById('supervisorTeam').value = '';
    document.getElementById('supervisorCandidate').value = '';
    document.getElementById('supervisorResults').style.display = 'none';
    
    console.log('Supervisor selection reset');
}

/**
 * Assign supervisor to team (placeholder for deployment)
 */
function assignSupervisor() {
    const teamSelect = document.getElementById('supervisorTeam');
    const supervisorSelect = document.getElementById('supervisorCandidate');
    
    const teamName = teamSelect.options[teamSelect.selectedIndex].text;
    const supervisorName = supervisorSelect.options[supervisorSelect.selectedIndex].text;
    
    // In real app, this would trigger Slack notification and database update
    alert(`🎯 Assignment Confirmed\n\n${supervisorName} has been assigned to ${teamName}.\n\nNext steps:\n• Slack notification sent to both parties\n• Onboarding plan automatically generated\n• First check-in scheduled for 30 days\n\nThis feature is coming soon in the full TeamSync platform.`);
    
    console.log('Supervisor assigned:', {
        team: teamName,
        supervisor: supervisorName,
        timestamp: new Date().toISOString()
    });
}

/**
 * Send assessment quiz to supervisor candidate
 * @param {string} supervisorId - Supervisor member ID  
 * @param {string} supervisorName - Supervisor name for display
 */
function sendSupervisorQuiz(supervisorId, supervisorName) {
    // In real app, this would:
    // 1. Generate unique quiz link for this supervisor
    // 2. Send via Slack or email
    // 3. Track completion status
    // 4. Update supervisor's chemistry profile when completed
    
    alert(`📤 Assessment Invitation Sent!\n\n${supervisorName} will receive:\n\n• Slack DM with quiz link\n• Email notification (backup)\n• 2-minute individual assessment\n• Instant results upon completion\n\nYou'll be notified when ${supervisorName} completes the assessment, and the match prediction will be automatically generated.\n\nThis feature is coming soon in the full TeamSync platform.`);
    
    console.log('Quiz sent to supervisor:', {
        supervisorId: supervisorId,
        supervisorName: supervisorName,
        timestamp: new Date().toISOString()
    });
}

/**
 * Reset supervisor view - clear selections and hide results
 * Called when view loads to prevent showing stale data
 */
function resetSupervisorView() {
    // Clear dropdown selections
    const teamSelect = document.getElementById('supervisorTeam');
    const supervisorSelect = document.getElementById('supervisorCandidate');
    
    if (teamSelect) teamSelect.value = '';
    if (supervisorSelect) supervisorSelect.value = '';
    
    // Hide results container
    const resultsContainer = document.getElementById('supervisorResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
    
    console.log('Supervisor view reset');
}

/**
 * Show review guidance for caution-level matches
 * @param {object} matchResult - Match calculation results
 */
function showReviewGuidance(matchResult) {
    console.log('showReviewGuidance called with:', matchResult);
    
    const guidanceContainer = document.getElementById('reviewGuidance');
    if (!guidanceContainer) {
        console.error('Review guidance container not found! Element #reviewGuidance does not exist.');
        return;
    }
    
    // Get current supervisor selection to find alternatives
    const supervisorSelect = document.getElementById('supervisorCandidate');
    const currentSupervisorId = supervisorSelect.value;
    const currentSupervisor = memberPools.team.find(m => m.id === currentSupervisorId);
    
    // Populate summary
    const summary = `This match shows a ${matchResult.differential}-point chemistry gap. Consider the following before proceeding:`;
    const summaryElement = document.getElementById('reviewSummary');
    if (summaryElement) {
        summaryElement.textContent = summary;
    } else {
        console.error('Element #reviewSummary not found');
    }
    
    // Find largest gaps in subscales
    const teamSelect = document.getElementById('supervisorTeam');
    const teamId = teamSelect.value;
    const teamData = window.sampleTeams.find(t => t.id === teamId);
    
    let largestGaps = [];
    if (teamData && currentSupervisor) {
        const subscaleNames = {
            understanding: 'Understanding',
            trust: 'Respect',
            ease: 'Feeling at Ease',
            integration: 'Thinking Alike'
        };
        
        Object.keys(subscaleNames).forEach(key => {
            const teamScore = teamData.subscales[key];
            const supervisorScore = currentSupervisor.subscales[key];
            const gap = Math.abs(teamScore - supervisorScore);
            largestGaps.push({ name: subscaleNames[key], gap: gap });
        });
        
        largestGaps.sort((a, b) => b.gap - a.gap);
        const topGaps = largestGaps.slice(0, 2).map(g => `${g.name} (-${g.gap})`).join(', ');
        const largestGapsElement = document.getElementById('reviewLargestGaps');
        if (largestGapsElement) {
            largestGapsElement.textContent = topGaps;
        } else {
            console.error('Element #reviewLargestGaps not found');
        }
    }
    
    // Find alternative supervisor with better match (smaller gap = better synchrony)
    const teamChemistry = parseInt(document.getElementById('teamChemistryScore').textContent);
    let bestAlternative = null;
    let bestAlternativeGap = 999; // Start with very large gap
    
    memberPools.team.forEach(member => {
        if (member.id !== currentSupervisorId && member.msScore) {
            const gap = member.msScore - teamChemistry;
            const absoluteGap = Math.abs(gap);
            
            // Only consider supervisors at or above team score (gap >= 0)
            // AND look for smallest gap (best synchrony)
            if (gap >= 0 && absoluteGap < bestAlternativeGap) {
                bestAlternative = member;
                bestAlternativeGap = absoluteGap;
            }
        }
    });
    
    const alternativeElement = document.getElementById('reviewAlternative');
    if (alternativeElement) {
        if (bestAlternative) {
            const currentGap = matchResult.differential;
            const gapImprovement = currentGap - bestAlternativeGap;
            alternativeElement.textContent = 
                `${bestAlternative.name} shows ${bestAlternative.msScore}% match (${bestAlternativeGap}-point gap, ${gapImprovement} points better alignment)`;
        } else {
            alternativeElement.textContent = 
                'No better alternatives available in current pool';
        }
    } else {
        console.error('Element #reviewAlternative not found');
    }
    
    // Show the guidance container with animation
    guidanceContainer.style.display = 'block';
    
    console.log('Review guidance displayed');
}

/**
 * Close review guidance section
 */
function closeReviewGuidance() {
    const guidanceContainer = document.getElementById('reviewGuidance');
    if (guidanceContainer) {
        guidanceContainer.style.display = 'none';
    }
    console.log('Review guidance closed');
}

/**
 * Proceed with supervisor assignment using enhanced onboarding
 */
function proceedWithEnhancedOnboarding() {
    const supervisorSelect = document.getElementById('supervisorCandidate');
    const supervisorName = supervisorSelect.options[supervisorSelect.selectedIndex].text;
    
    const teamSelect = document.getElementById('supervisorTeam');
    const teamName = teamSelect.options[teamSelect.selectedIndex].text;
    
    alert(`✓ Assignment Confirmed

${supervisorName} assigned to ${teamName} with Enhanced Onboarding Plan:

✓ Monthly chemistry check-ins for first 90 days
✓ Team working style brief provided to supervisor
✓ Supervisor communication approach shared with team
✓ Clear escalation path established
✓ 90-day review checkpoint scheduled

Integration support activated. Monitor progress in first quarter.`);
    
    // Close review guidance
    closeReviewGuidance();
    
    console.log(`Supervisor ${supervisorName} assigned to ${teamName} with enhanced onboarding`);
}

// Export supervisor functions for use in navigation
window.populateSupervisorSelects = populateSupervisorSelects;
window.updateSupervisorMatch = updateSupervisorMatch;
window.tryAnotherSupervisor = tryAnotherSupervisor;
window.assignSupervisor = assignSupervisor;
window.sendSupervisorQuiz = sendSupervisorQuiz;
window.resetSupervisorView = resetSupervisorView;
window.showReviewGuidance = showReviewGuidance;
window.closeReviewGuidance = closeReviewGuidance;
window.proceedWithEnhancedOnboarding = proceedWithEnhancedOnboarding;

console.log('Module 3: Match a Supervisor functions loaded');


// ========================================

// ========================================
// OPTIMIZE EXISTING TEAM
// ========================================

/**
 * Load a team configuration into the optimize workspace
 */
/**
 * Load team configuration - ACTUAL IMPLEMENTATION
 */
function loadTeamConfig(teamId) {
    console.log('[Optimize] Loading team config:', teamId);
    
    // Update active state in sidebar
    document.querySelectorAll('.team-list-item').forEach(item => {
        item.classList.remove('active');
        const checkmark = item.querySelector('.team-check');
        if (checkmark) checkmark.classList.add('hidden');
    });
    
    const selectedItem = document.querySelector(`.team-list-item[data-team-id="${teamId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        const checkmark = selectedItem.querySelector('.team-check');
        if (checkmark) checkmark.classList.remove('hidden');
    }
    
    // Get team configuration
    const config = teamConfigurations[teamId];
    if (!config) {
        console.error('[Optimize] Team configuration not found:', teamId);
        return;
    }
    
    // Update team name in header
    const teamNameEl = document.getElementById('currentTeamName');
    if (teamNameEl) {
        teamNameEl.textContent = config.name;
    }
    currentTeamId = teamId;
    
    // Clear zones (only 2 zones now)
    const coreZone = document.getElementById('optimizeCoreMembers');
    const availableZone = document.getElementById('optimizeAvailableMembers');
    
    if (coreZone) coreZone.innerHTML = '';
    if (availableZone) availableZone.innerHTML = '';
    
    // Member database with names and initials
    const memberData = {
        'alex-smith': { name: 'Alex Smith', initials: 'AS' },
        'jordan-davis': { name: 'Jordan Davis', initials: 'JD' },
        'sam-johnson': { name: 'Sam Johnson', initials: 'SJ' },
        'morgan-chen': { name: 'Morgan Chen', initials: 'MC' },
        'riley-lee': { name: 'Riley Lee', initials: 'RL' },
        'taylor-park': { name: 'Taylor Park', initials: 'TP' },
        'casey-brown': { name: 'Casey Brown', initials: 'CB' },
        'avery-white': { name: 'Avery White', initials: 'AW' }
    };
    
    // Helper to create member element
    const createMemberElement = (memberId) => {
        const data = memberData[memberId];
        if (!data) {
            console.warn('[Optimize] Member data not found:', memberId);
            return null;
        }
        const div = document.createElement('div');
        div.className = 'member-item';
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-member', memberId);
        div.innerHTML = `
            <span class="member-initials">${data.initials}</span>
            ${data.name}
        `;
        return div;
    };
    
    // Combine core + extended into optimized team (2-box layout)
    const optimizedTeam = [...config.core, ...(config.extended || [])];
    // Combine bench + available into available pool
    const availablePool = [...(config.bench || []), ...config.available];
    
    console.log('[Optimize] Optimized team:', optimizedTeam.length, 'Available:', availablePool.length);
    
    // Populate Optimized Team zone
    if (coreZone) {
        optimizedTeam.forEach(memberId => {
            const element = createMemberElement(memberId);
            if (element) coreZone.appendChild(element);
        });
    }
    
    // Populate Available Pool zone
    if (availableZone) {
        availablePool.forEach(memberId => {
            const element = createMemberElement(memberId);
            if (element) availableZone.appendChild(element);
        });
    }
    
    // Re-initialize draggables
    updateOptimizeDraggables();
    
    // Save as new original config
    saveOriginalConfig();
    
    // Force clear chemistry display before recalculating
    const scoreElement = document.getElementById('optimizeChemistryScore');
    if (scoreElement) {
        scoreElement.textContent = '...';
    }
    
    // Update chemistry with slight delay to ensure DOM is ready
    setTimeout(() => {
        updateOptimizeChemistry();
    }, 50);
    
    console.log('[Optimize] Loaded team:', config.name);
}

/**
 * Save current configuration as original (for discard functionality) - 2-box layout
 */
function saveOriginalConfig() {
    originalTeamConfig = {
        teamId: currentTeamId,
        optimized: Array.from(document.querySelectorAll('#optimizeCoreMembers .member-item')).map(m => m.cloneNode(true)),
        available: Array.from(document.querySelectorAll('#optimizeAvailableMembers .member-item')).map(m => m.cloneNode(true))
    };
    console.log('[Optimize] Original config saved - Team:', originalTeamConfig.optimized.length, 'Available:', originalTeamConfig.available.length);
}

/**
 * Create a new team configuration
 */
function createNewTeamConfig() {
    if (confirm('Create new team?\n\nThis will clear the current workspace.')) {
        alert('Feature Demo: Create New Team\n\nWould:\n• Clear all zones\n• Start with empty configuration\n• Allow building team from scratch');
    }
}

/**
 * Save changes to current team
 */
function saveTeamChanges() {
    if (confirm('Save changes to this team configuration?')) {
        alert('Team configuration saved successfully!\n\nChanges have been applied.');
    }
}

/**
 * Discard changes and reload original configuration - 2-box layout
 */
function discardChanges() {
    console.log('[Optimize] Discarding changes...');
    
    if (!originalTeamConfig) {
        console.warn('[Optimize] No original config to restore');
        return;
    }
    
    // Clear zones (only 2 zones now)
    const coreZone = document.getElementById('optimizeCoreMembers');
    const availableZone = document.getElementById('optimizeAvailableMembers');
    
    if (coreZone) coreZone.innerHTML = '';
    if (availableZone) availableZone.innerHTML = '';
    
    // Restore original members
    if (coreZone && originalTeamConfig.optimized) {
        originalTeamConfig.optimized.forEach(member => {
            coreZone.appendChild(member.cloneNode(true));
        });
    }
    
    if (availableZone && originalTeamConfig.available) {
        originalTeamConfig.available.forEach(member => {
            availableZone.appendChild(member.cloneNode(true));
        });
    }
    
    // Re-initialize draggables
    updateOptimizeDraggables();
    
    // Update chemistry to original state
    updateOptimizeChemistry();
    
    console.log('[Optimize] Changes discarded - original configuration restored');
}

// ========================================
// OPTIMIZE MODULE: DRAG-AND-DROP & CHEMISTRY
// ========================================

/**
 * Team configurations database
 */
const teamConfigurations = {
    'alpha': {
        name: 'Engineering Alpha',
        core: ['alex-smith', 'sam-johnson', 'morgan-chen', 'avery-white'],
        extended: [],
        bench: ['jordan-davis', 'riley-lee'],
        available: ['taylor-park', 'casey-brown']
    },
    'beta': {
        name: 'Sales Division Beta',
        core: ['morgan-chen', 'taylor-park', 'casey-brown', 'avery-white'],
        extended: [],
        bench: ['riley-lee'],
        available: []
    },
    'innovation': {
        name: 'Product Innovation',
        core: ['sam-johnson', 'casey-brown', 'alex-smith'],
        extended: [],
        bench: ['jordan-davis'],
        available: []
    },
    'q4-sprint': {
        name: 'Q4 Innovation Sprint',
        core: ['alex-smith', 'morgan-chen', 'taylor-park'],
        extended: [],
        bench: ['jordan-davis'],
        available: []
    },
    'cs-rapid': {
        name: 'Customer Success',
        core: ['riley-lee', 'casey-brown', 'avery-white'],
        extended: [],
        bench: [],
        available: []
    }
};

// Store original configuration for discard functionality
let originalTeamConfig = null;
let currentTeamId = 'alpha';

// ========================================
// AUTO-CALCULATE SIDEBAR SCORES
// ========================================
/**
 * Calculate real chemistry scores for all saved teams
 * This ensures sidebar scores match main display scores
 * Run this on page load to get accurate values
 */
function calculateAllTeamScores() {
    console.log('=== AUTO-CALCULATING SIDEBAR SCORES ===');
    
    const teamConfigs = {
        'alpha': ['alex-smith', 'sam-johnson', 'morgan-chen', 'avery-white'],
        'beta': ['morgan-chen', 'taylor-park', 'casey-brown', 'avery-white'],
        'innovation': ['sam-johnson', 'casey-brown', 'alex-smith'],
        'q4-sprint': ['alex-smith', 'morgan-chen', 'taylor-park'],
        'cs-rapid': ['riley-lee', 'casey-brown', 'avery-white']
    };
    
    const memberMap = {
        'alex-smith': 'T008',
        'jordan-davis': 'T004',
        'sam-johnson': 'T001',
        'morgan-chen': 'T002',
        'riley-lee': 'T006',
        'taylor-park': 'T007',
        'casey-brown': 'T005',
        'avery-white': 'T003'
    };
    
    const results = {};
    
    Object.keys(teamConfigs).forEach(teamId => {
        const memberIds = teamConfigs[teamId];
        const teamMembers = memberIds.map(id => {
            const tId = memberMap[id];
            return memberPools.team.find(m => m.id === tId);
        }).filter(m => m);
        
        if (teamMembers.length >= 2) {
            const score = calculateTeamChemistry(teamMembers);
            results[teamId] = score;
            console.log(`${teamId}: ${score}% (${teamMembers.length} members)`);
        }
    });
    
    console.log('=== SCORES TO UPDATE IN SIDEBAR ===');
    console.log('Engineering Alpha:', results.alpha + '%');
    console.log('Sales Division Beta:', results.beta + '%');
    console.log('Product Innovation:', results.innovation + '%');
    console.log('Q4 Innovation Sprint:', results['q4-sprint'] + '%');
    console.log('Customer Success:', results['cs-rapid'] + '%');
    console.log('===================================');
    
    return results;
}

// ========================================
// OPTIMIZE EXISTING TEAM MODULE - DRAG & DROP SYSTEM
// ========================================
// Purpose: Handle member dragging in Optimize Existing Team view
// Triggered By: Dashboard → "Optimize Existing Team" card
// Elements: .member-item, .zone-members
// IDs: optimizeCoreMembers, optimizeExtendedMembers, optimizeBenchMembers, optimizeAvailableMembers
// Status: Active module with Optimize prefix
// Note: Currently 4-box layout, will be converted to 2-box in this phase
// ========================================

/**
 * Initialize drag-and-drop for Optimize Existing Team module (2-box layout)
 */
function initializeOptimizeDragDrop() {
    console.log('[Optimize] Initializing 2-box drag-and-drop...');
    
    // Only 2 zones now: Optimized Team and Available Pool
    const zones = ['optimizeCoreMembers', 'optimizeAvailableMembers'];
    
    zones.forEach(zoneId => {
        const zone = document.getElementById(zoneId);
        if (zone) {
            zone.addEventListener('dragover', handleOptimizeDragOver);
            zone.addEventListener('drop', handleOptimizeDrop);
            zone.addEventListener('dragleave', handleOptimizeDragLeave);
            console.log('[Optimize] Initialized zone:', zoneId);
        } else {
            console.warn('[Optimize] Zone not found:', zoneId);
        }
    });
    
    // Initialize all member items as draggable
    updateOptimizeDraggables();
    
    // Store original configuration
    saveOriginalConfig();
    
    // Calculate initial chemistry
    updateOptimizeChemistry();
    
    console.log('[Optimize] Drag-and-drop initialized (2-box layout)');
}

/**
 * Update all draggable member items (Optimize)
 */
function updateOptimizeDraggables() {
    document.querySelectorAll('.zone-members .member-item').forEach(item => {
        item.addEventListener('dragstart', handleOptimizeDragStart);
        item.addEventListener('dragend', handleOptimizeDragEnd);
    });
}

/**
 * Handle drag start (Optimize)
 */
function handleOptimizeDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-member'));
    e.target.style.opacity = '0.4';
    
    // Add dragging class to all zones for visual feedback
    document.querySelectorAll('.zone-members').forEach(zone => {
        zone.classList.add('drag-active');
    });
}

/**
 * Handle drag end (Optimize)
 */
function handleOptimizeDragEnd(e) {
    e.target.style.opacity = '1';
    
    // Remove dragging class from all zones
    document.querySelectorAll('.zone-members').forEach(zone => {
        zone.classList.remove('drag-active');
        zone.classList.remove('drag-over');
    });
}

/**
 * Handle drag over (Optimize)
 */
function handleOptimizeDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
}

/**
 * Handle drag leave (Optimize)
 */
function handleOptimizeDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Handle drop (Optimize)
 */
function handleOptimizeDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const memberId = e.dataTransfer.getData('text/plain');
    const memberElement = document.querySelector(`.member-item[data-member="${memberId}"]`);
    
    if (memberElement && e.currentTarget !== memberElement.parentElement) {
        // Move to new zone
        e.currentTarget.appendChild(memberElement);
        
        // Update chemistry after move
        updateOptimizeChemistry();
    }
}

/**
 * Calculate and update team chemistry based on current composition (2-box layout)
 * Valid team: 3-8 members
 * Dyad: Exactly 2 members (special case)
 * Invalid: 0, 1, or 9+ members
 */
function updateOptimizeChemistry() {
    console.log('[Optimize] === Starting chemistry calculation ===');
    
    // Get members in Optimized Team (only one zone now)
    const teamMemberElements = Array.from(document.querySelectorAll('#optimizeCoreMembers .member-item'));
    const availableMemberElements = Array.from(document.querySelectorAll('#optimizeAvailableMembers .member-item'));
    
    const teamCount = teamMemberElements.length;
    console.log('[Optimize] Found', teamCount, 'team member elements in DOM');
    
    let teamScore = 0;
    let displayScore = '';
    
    // Get actual member data for chemistry calculation
    if (teamCount >= 2) {
        const memberIds = teamMemberElements.map(m => m.getAttribute('data-member'));
        console.log('[Optimize] Member IDs from DOM:', memberIds);
        
        // Map member IDs to actual member objects from memberPool
        const memberMap = {
            'alex-smith': 'T008',      // Alex Thompson
            'jordan-davis': 'T004',    // David Wilson 
            'sam-johnson': 'T001',     // Sarah Johnson
            'morgan-chen': 'T002',     // Michael Chen
            'riley-lee': 'T006',       // Robert Kim
            'taylor-park': 'T007',     // Amanda Foster
            'casey-brown': 'T005',     // Jessica Rodriguez
            'avery-white': 'T003'      // Emily Parker
        };
        
        console.log('[Optimize] memberPools available?', typeof memberPools !== 'undefined');
        console.log('[Optimize] memberPools.team length:', memberPools ? memberPools.team.length : 'N/A');
        
        const teamMembers = memberIds.map(id => {
            const teamId = memberMap[id];
            console.log('[Optimize] Mapping', id, '→', teamId);
            
            if (!memberPools || !memberPools.team) {
                console.error('[Optimize] memberPools or memberPools.team is undefined!');
                return null;
            }
            
            const member = memberPools.team.find(m => m.id === teamId);
            
            if (!member) {
                console.error('[Optimize] Member not found in pool:', id, '→', teamId);
            } else {
                console.log('[Optimize] Found member:', member.name, 'MS:', member.msScore);
            }
            
            return member;
        }).filter(m => m); // Remove any undefined members
        
        console.log('[Optimize] Successfully mapped', teamMembers.length, 'members');
        
        if (teamMembers.length >= 2) {
            console.log('[Optimize] Calling calculateTeamChemistry with', teamMembers.length, 'members');
            
            // Use real chemistry calculation algorithm
            // NOTE: calculateTeamChemistry returns a NUMBER directly, not an object
            teamScore = calculateTeamChemistry(teamMembers);
            displayScore = teamScore.toString();
            console.log('[Optimize] ✓ Chemistry calculated:', teamScore);
        } else {
            console.warn('[Optimize] ✗ Not enough valid members:', teamMembers.length);
            displayScore = 'N/A';
            teamScore = 0;
        }
    } else if (teamCount === 1) {
        console.log('[Optimize] Only 1 member - cannot calculate');
        displayScore = 'N/A';
        teamScore = 0;
    } else {
        console.log('[Optimize] No members in team');
        displayScore = 'N/A';
        teamScore = 0;
    }
    
    // Update single chemistry score display
    const scoreElement = document.getElementById('optimizeChemistryScore');
    const optimizedSizeBadge = document.getElementById('optimizedTeamSize');
    const availableSizeBadge = document.getElementById('availablePoolSize');
    
    if (scoreElement) {
        // Force DOM update by setting both textContent AND innerHTML
        scoreElement.textContent = displayScore;
        scoreElement.innerHTML = displayScore;
        // Force repaint
        scoreElement.style.display = 'none';
        scoreElement.offsetHeight; // Trigger reflow
        scoreElement.style.display = '';
        console.log('[Optimize] ✓ FORCED UPDATE display to:', displayScore, 'Element value:', scoreElement.textContent);
    } else {
        console.error('[Optimize] ✗ optimizeChemistryScore element NOT FOUND in DOM');
    }
    
    // Update size badges
    if (optimizedSizeBadge) {
        optimizedSizeBadge.textContent = teamCount + (teamCount === 1 ? ' member' : ' members');
    }
    
    if (availableSizeBadge) {
        availableSizeBadge.textContent = availableMemberElements.length + (availableMemberElements.length === 1 ? ' member' : ' members');
    }
    
    console.log('[Optimize] === Calculation complete ===');
}

// Initialize on optimize view load
if (document.getElementById('optimizeView')) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeOptimizeDragDrop();
            // Load first team automatically
            setTimeout(() => loadTeamConfig('alpha'), 100);
        });
    } else {
        initializeOptimizeDragDrop();
        // Load first team automatically
        setTimeout(() => loadTeamConfig('alpha'), 100);
    }
}

// ========================================
// ALTERNATE CONFIGURATIONS SYSTEM
// ========================================

/**
 * Toggle Alternate Configurations section in Team Explorer
 */
function toggleAlternates() {
    const toggle = document.getElementById('alternateToggle');
    const content = document.getElementById('alternateConfigsContent');
    
    if (!toggle || !content) {
        console.warn('[Team Explorer] Alternate configs elements not found');
        return;
    }
    
    const isExpanded = content.style.display === 'block';
    
    if (isExpanded) {
        toggle.classList.remove('expanded');
        content.style.display = 'none';
        console.log('[Team Explorer] Alternates collapsed');
    } else {
        toggle.classList.add('expanded');
        content.style.display = 'block';
        console.log('[Team Explorer] Alternates expanded');
    }
}

/**
 * Populate alternate configuration cards (2nd, 3rd, 4th place)
 */
function populateAlternateConfigurations() {
  const alternateGrid = document.getElementById('alternateGrid');
  const alternateSection = document.getElementById('alternateConfigsSection');
  
  if (!alternateGrid || !alternateSection) return;
  
  alternateGrid.innerHTML = '';
  
  // Check if we have alternates stored
  if (!window.topAlternateConfigurations || window.topAlternateConfigurations.length === 0) {
    // Hide the entire section if no alternates
    alternateSection.style.display = 'none';
    return;
  }
  
  // Show the section
  alternateSection.style.display = 'block';
  
  // Create cards for 2nd, 3rd, 4th place
  const ranks = ['2nd Place', '3rd Place', '4th Place'];
  
  window.topAlternateConfigurations.forEach((config, index) => {
    if (index >= 3) return; // Only show top 3 alternates
    
    const card = document.createElement('div');
    card.className = 'alternate-card';
    card.setAttribute('data-rank', index + 2); // 2nd, 3rd, 4th
    card.onclick = () => openAlternateModal(config, ranks[index], index + 2);
    
    // Header section
    const headerHTML = `
      <div class="alternate-card-header">
        <div class="alternate-rank">${ranks[index]}</div>
        <div class="alternate-chemistry">${config.chemistry}%</div>
      </div>
      <div class="alternate-size">${config.members.length} member${config.members.length !== 1 ? 's' : ''}</div>
    `;
    
    // Member list section
    const membersHTML = config.members.map(member => {
      const nameParts = member.name.split(' ');
      const initials = nameParts.length >= 2 
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0] + (nameParts[0][1] || '');
      
      console.log('Creating alternate member item:', member.name, initials);
      
      return `
        <div class="alternate-member-item">
          <div class="alternate-member-avatar">${initials.toUpperCase()}</div>
          <div class="alternate-member-name">${member.name}</div>
        </div>
      `;
    }).join('');
    
    console.log('Members HTML:', membersHTML);
    
    card.innerHTML = `
      ${headerHTML}
      <div class="alternate-members-list">
        ${membersHTML}
      </div>
    `;
    
    alternateGrid.appendChild(card);
  });
  
  console.log('Alternates populated, total cards:', window.topAlternateConfigurations.length);
}

/**
 * Open alternate configuration modal
 */
function openAlternateModal(config, rankLabel, rankNumber) {
  const modal = document.getElementById('alternateModal');
  if (!modal) return;
  
  // Store current alternate for selection
  window.currentAlternateConfig = { config, rankNumber };
  
  // Update header
  document.getElementById('alternateRankBadge').textContent = rankLabel;
  document.getElementById('alternateModalTeamName').textContent = window.explorerState?.teamName || 'Alternative Team Configuration';
  document.getElementById('alternateModalChemistry').textContent = config.chemistry;
  document.getElementById('alternateModalSize').textContent = `${config.members.length} member${config.members.length !== 1 ? 's' : ''}`;
  
  // Update hero score
  document.getElementById('alternateHeroScore').textContent = config.chemistry;
  
  // Populate members
  const membersContainer = document.getElementById('alternateModalMembers');
  membersContainer.innerHTML = '';
  
  config.members.forEach(member => {
    const nameParts = member.name.split(' ');
    const initials = nameParts.length >= 2 
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0][0] + (nameParts[0][1] || '');
    
    const memberCard = document.createElement('div');
    memberCard.className = 'alternate-member-card';
    memberCard.innerHTML = `
      <div class="member-avatar">${initials.toUpperCase()}</div>
      <div class="member-name">${member.name}</div>
    `;
    membersContainer.appendChild(memberCard);
  });
  
  // Populate subscales
  const subscalesContainer = document.getElementById('alternateModalSubscales');
  const subscales = calculateIndividualSubscales(config.members);
  
  subscalesContainer.innerHTML = `
    <div class="subscale-item-compact">
      <span class="subscale-label-compact">Understanding</span>
      <span class="subscale-value-compact">${subscales.understanding}%</span>
    </div>
    <div class="subscale-item-compact">
      <span class="subscale-label-compact">Trust</span>
      <span class="subscale-value-compact">${subscales.trust}%</span>
    </div>
    <div class="subscale-item-compact">
      <span class="subscale-label-compact">Ease</span>
      <span class="subscale-value-compact">${subscales.ease}%</span>
    </div>
    <div class="subscale-item-compact">
      <span class="subscale-label-compact">Integration</span>
      <span class="subscale-value-compact">${subscales.integration}%</span>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close alternate configuration modal
 */
function closeAlternateModal(event) {
  // Only close if clicking overlay, not modal content
  if (event && event.target.className !== 'modal-overlay') return;
  
  const modal = document.getElementById('alternateModal');
  if (!modal) return;
  
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
  window.currentAlternateConfig = null;
}

/**
 * Select alternate configuration as the new optimal team
 */
function selectAlternateConfiguration() {
  if (!window.currentAlternateConfig) return;
  
  const { config, rankNumber } = window.currentAlternateConfig;
  
  // Update explorer state with the alternate configuration
  window.explorerState.currentOptimalTeam = config.members.map(m => m.id);
  window.explorerState.selectedRank = rankNumber;
  window.explorerState.isOverridden = true;
  window.currentOptimalTeam = config.members.map(m => m.id);
  window.currentOptimalScore = config.chemistry;
  
  // Close modal
  closeAlternateModal();
  
  // Repopulate the explorer view with the new configuration
  populateTeamExplorerView();
  
  // Update the box title to reflect the selection (AFTER repopulating view)
  const rankText = rankNumber === 2 ? '2nd' : rankNumber === 3 ? '3rd' : '4th';
  const titleTextEl = document.getElementById('optimalTeamTitleText');
  const subtitleEl = document.getElementById('optimalTeamSubtitle');
  const resetLinkEl = document.getElementById('resetToAILink');
  
  if (titleTextEl) {
    titleTextEl.textContent = `${rankText} Place Configuration`;
  }
  if (subtitleEl) {
    subtitleEl.textContent = 'You selected this alternative';
  }
  if (resetLinkEl) {
    resetLinkEl.style.display = 'inline';
  }
  
  // Show feedback to user
  const statusMessage = document.createElement('div');
  statusMessage.className = 'status-toast';
  statusMessage.textContent = `✓ Configuration selected! Now showing ${rankText} place team.`;
  statusMessage.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: #22c55e;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  document.body.appendChild(statusMessage);
  
  setTimeout(() => {
    statusMessage.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => statusMessage.remove(), 300);
  }, 3000);
}

/**
 * Reset to AI-recommended team configuration
 */
function resetToAIRecommendation() {
  if (!window.explorerState || !window.explorerState.originalOptimalTeam) {
    console.warn('[Team Explorer] Cannot reset - no original team data');
    return;
  }
  
  console.log('[Team Explorer] Resetting to AI recommendation...');
  console.log('[Team Explorer] Original team:', window.explorerState.originalOptimalTeam);
  
  // Restore original team
  window.explorerState.currentOptimalTeam = [...window.explorerState.originalOptimalTeam];
  window.explorerState.selectedRank = 1;
  window.explorerState.isOverridden = false;
  window.currentOptimalTeam = [...window.explorerState.originalOptimalTeam];
  window.currentOptimalScore = window.explorerState.originalChemistry;
  
  // Reset the box title
  const titleTextEl = document.getElementById('optimalTeamTitleText');
  const subtitleEl = document.getElementById('optimalTeamSubtitle');
  const resetLinkEl = document.getElementById('resetToAILink');
  
  if (titleTextEl) {
    titleTextEl.textContent = 'AI-Recommended Team';
  }
  if (subtitleEl) {
    subtitleEl.textContent = 'Optimal configuration for maximum chemistry';
  }
  if (resetLinkEl) {
    resetLinkEl.style.display = 'none';
  }
  
  // Repopulate the explorer view
  populateTeamExplorerView();
  
  // Recalculate and display chemistry
  recalculateExplorerChemistry();
  
  // Reinitialize drag and drop
  updateExplorerDraggableCards();
  
  // Show feedback
  const statusMessage = document.createElement('div');
  statusMessage.className = 'status-toast';
  statusMessage.textContent = '✓ Reset to AI recommendation';
  statusMessage.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: #3b82f6;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  document.body.appendChild(statusMessage);
  
  setTimeout(() => {
    statusMessage.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => statusMessage.remove(), 300);
  }, 3000);
  
  console.log('[Team Explorer] Reset complete');
}

// ========================================
// SLACK SIMULATION WORKFLOW
// ========================================

/**
 * Show Slack command deployment modal for members without quiz
 */
function showSlackDeployModal(teamName, membersNeedingQuiz, allSelectedMembers) {
  const modal = document.getElementById('slackCommandModal');
  const commandText = document.getElementById('slackCommandText');
  
  if (!modal || !commandText) {
    console.error('Slack modal elements not found');
    return;
  }
  
  // Store context for after simulation
  window.pendingTeamAnalysis = {
    teamName: teamName,
    membersNeedingQuiz: membersNeedingQuiz,
    allSelectedMembers: allSelectedMembers
  };
  
  // Build Slack command with usernames
  const usernames = membersNeedingQuiz.map(m => '@' + m.name.toLowerCase().replace(' ', '.'));
  const command = `/teamsync team ${usernames.join(' ')}`;
  
  commandText.textContent = command;
  modal.style.display = 'flex';
}

/**
 * Copy Slack command to clipboard and start simulation
 */
function copySlackCommand() {
  const commandText = document.getElementById('slackCommandText');
  if (!commandText) return;
  
  // Copy to clipboard
  navigator.clipboard.writeText(commandText.textContent).then(() => {
    // Show toast
    showToast('✓ Slack command copied!');
    
    // Close modal
    closeSlackModal();
    
    // Start Slack simulation
    startSlackSimulation();
  }).catch(err => {
    console.error('Failed to copy:', err);
    // Still proceed with simulation even if copy fails
    closeSlackModal();
    startSlackSimulation();
  });
}

/**
 * Close the Slack command modal
 */
function closeSlackModal() {
  const modal = document.getElementById('slackCommandModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Start the Slack simulation widget animation
 */
function startSlackSimulation() {
  const widget = document.getElementById('slack-widget');
  const messagesContainer = document.getElementById('slack-messages');
  
  if (!widget || !messagesContainer) {
    console.error('Slack widget elements not found');
    completeSlackSimulation();
    return;
  }
  
  const pending = window.pendingTeamAnalysis;
  if (!pending) {
    console.error('No pending team analysis');
    return;
  }
  
  const membersNeedingQuiz = pending.membersNeedingQuiz;
  const memberCount = membersNeedingQuiz.length;
  
  // Build dynamic messages based on actual members
  const SLACK_MESSAGES = [
    { delay: 500, text: "🤖 Deploying TeamSync Chemistry Assessment..." },
    { delay: 1500, text: `📋 Survey sent to ${memberCount} team member${memberCount > 1 ? 's' : ''}` }
  ];
  
  // Add completion message for each member
  membersNeedingQuiz.forEach((member, index) => {
    SLACK_MESSAGES.push({
      delay: 2500 + (index * 1000),
      text: `✓ ${member.name} completed (${index + 1}/${memberCount})`
    });
  });
  
  // Final message
  SLACK_MESSAGES.push({
    delay: 2500 + (memberCount * 1000) + 500,
    text: "🎉 All responses collected! Calculating chemistry..."
  });
  
  // Show widget
  widget.classList.remove('hidden');
  messagesContainer.innerHTML = '';
  
  // Reset progress dots
  const dots = widget.querySelectorAll('.progress-dot');
  dots.forEach(dot => dot.classList.remove('completed'));
  
  // Animate messages
  SLACK_MESSAGES.forEach((msg, index) => {
    setTimeout(() => {
      const messageEl = document.createElement('div');
      messageEl.className = 'slack-message';
      messageEl.textContent = msg.text;
      messagesContainer.appendChild(messageEl);
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Update progress dots (after the first 2 setup messages)
      if (index >= 2 && index < 2 + memberCount) {
        const dotIndex = index - 2;
        if (dots[dotIndex]) {
          dots[dotIndex].classList.add('completed');
        }
      }
      
      // Complete all dots on final message
      if (index === SLACK_MESSAGES.length - 1) {
        dots.forEach(dot => dot.classList.add('completed'));
        
        // Hide widget and complete after delay
        setTimeout(() => {
          widget.classList.add('hidden');
          completeSlackSimulation();
        }, 2000);
      }
    }, msg.delay);
  });
}

/**
 * Complete the Slack simulation - update member data and proceed with analysis
 */
function completeSlackSimulation() {
  const pending = window.pendingTeamAnalysis;
  if (!pending) return;
  
  const { teamName, membersNeedingQuiz, allSelectedMembers } = pending;
  
  // Update members who completed the quiz
  const today = new Date().toISOString().split('T')[0];
  
  membersNeedingQuiz.forEach(member => {
    // Find member in pool and update their quiz data
    const currentPool = AppState.currentQuizType === 'team' ? memberPools.team : memberPools.dyad;
    const poolMember = currentPool.find(m => m.id === member.id);
    
    if (poolMember) {
      // Set quiz date
      poolMember.quizDate = today;
      
      // Generate subscales if not present
      if (!poolMember.subscales) {
        const baseScore = 65 + Math.floor(Math.random() * 15); // 65-79 range
        poolMember.subscales = {
          understanding: baseScore + Math.floor(Math.random() * 10 - 5),
          trust: baseScore + Math.floor(Math.random() * 10 - 5),
          ease: baseScore + Math.floor(Math.random() * 10 - 5),
          integration: baseScore + Math.floor(Math.random() * 10 - 5)
        };
        poolMember.msScore = Math.round(
          (poolMember.subscales.understanding + poolMember.subscales.trust + 
           poolMember.subscales.ease + poolMember.subscales.integration) / 4
        );
      }
      
      console.log(`[Slack Simulation] Updated ${poolMember.name} with quiz date:`, poolMember.quizDate);
    }
  });
  
  // Refresh the member pools to show updated quiz badges
  populateBothPools();
  
  // Clear pending analysis
  window.pendingTeamAnalysis = null;
  
  // Now proceed with the actual team analysis
  proceedWithTeamAnalysis(teamName);
}

// Export Slack simulation functions to global scope
window.copySlackCommand = copySlackCommand;
window.closeSlackModal = closeSlackModal;
window.startSlackSimulation = startSlackSimulation;
window.showSlackDeployModal = showSlackDeployModal;
window.proceedWithTeamAnalysis = proceedWithTeamAnalysis;

