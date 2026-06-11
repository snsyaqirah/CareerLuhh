// Stage 1 — DUMMY DATA ONLY. Hardcoded mock outputs of the employer-side agents.

// TrajectoryMatchAgent — The Headhunter
export const trajectoryMatches = [
  {
    candidateId: "cand_001",
    name: "Nurul Ain bt Rosli",
    currentRole: "Junior Developer",
    university: "UTM",
    trajectoryScore: 89,
    trajectorySummary:
      "Has basic React but actively learning Next.js and TypeScript based on recent portfolio commits. Trajectory aligns with your modernisation project Q3.",
    readinessScore: 74,
    matchReason: "Growth curve matches your mid-level opening in 3 months — hire now, ramp fast.",
  },
  {
    candidateId: "cand_002",
    name: "Haziq bin Hamdan",
    currentRole: "Self-taught Developer",
    university: "TVET — Kolej Vokasional",
    trajectoryScore: 84,
    trajectorySummary:
      "Self-taught React in 6 months with 3 deployed projects. Learning velocity in top 10% of tracked candidates.",
    readinessScore: 68,
    matchReason:
      "Non-traditional background but strong trajectory — matches your last 2 successful junior hires.",
  },
  {
    candidateId: "cand_003",
    name: "Tan Wei Jian",
    currentRole: "QA Engineer",
    university: "USM",
    trajectoryScore: 76,
    trajectorySummary:
      "Transitioning QA → automation engineering. Recent Playwright + CI pipeline work signals strong fit for your SDET need.",
    readinessScore: 81,
    matchReason: "Already production-ready for the automation role — immediate start possible.",
  },
];

// TalentRadarAgent — The Scout
export const talentRadar = {
  weeklyDigest: [
    {
      candidateId: "cand_002",
      name: "Haziq bin Hamdan",
      highlight:
        "TVET grad, self-taught React in 6 months, 3 deployed projects. Matches your last 2 successful junior hires.",
      whyFlag: "Non-traditional background but strong trajectory — often missed by keyword filters",
    },
    {
      candidateId: "cand_004",
      name: "Priya Nair",
      highlight:
        "Final-year UM student, won 2 hackathons this semester, building in public on GitHub.",
      whyFlag: "High-signal student — intern pipeline candidate before competitors notice her",
    },
  ],
};

// RetentionSignalAgent — The Watcher
// Signals are CareerLuhh-internal (platform activity) — not LinkedIn scraping.
// Stage 2: employer invites staff to CareerLuhh; staff consent to sharing activity data.
export const retentionAlerts = [
  {
    employeeId: "emp_003",
    name: "Siti Hajar bt Kamaruddin",
    role: "Mid-level Developer",
    riskLevel: "medium" as const,
    riskScore: 61,
    signals: [
      "Updated CareerLuhh skills profile 3 days ago — added Docker, Kubernetes (2 levels above her current role scope)",
      "Browsed 8 job listings this week (5× her usual activity)",
      "Ran a salary benchmark for Senior Engineer roles — 32% above her current package",
    ],
    recommendedAction:
      "Have a career conversation this week. Ask where she sees herself in 12 months. She may be looking for a path to senior level — do you have that for her?",
    suggestedScript: "Siti, I've been thinking about your growth here. You've clearly been building beyond your current scope — Docker, Kubernetes — that's senior-level thinking. I want to make sure we have a path that matches where you're heading. What does your ideal next role look like?",
  },
  {
    employeeId: "emp_007",
    name: "Farid bin Nordin",
    role: "Data Analyst",
    riskLevel: "low" as const,
    riskScore: 28,
    signals: [
      "Completed 2 new certifications (Power BI, dbt) in the past 30 days",
      "Salary benchmark search for Data Engineer roles (one level up)",
    ],
    recommendedAction:
      "Low risk right now, but monitor. He's upskilling intentionally — consider a title conversation before he starts actively searching.",
    suggestedScript: "Farid, I noticed you've been investing in your skills lately — Power BI, dbt. That's exactly the direction our data team needs to go. I'd love to talk about what a Data Engineer path looks like for you here.",
  },
  {
    employeeId: "emp_011",
    name: "Priya Nair",
    role: "UX Designer",
    riskLevel: "high" as const,
    riskScore: 79,
    signals: [
      "Viewed 14 job listings in the past 5 days — all Product Manager roles (career pivot signal)",
      "Updated CareerLuhh career goal from 'Senior Designer' to 'Product Manager'",
      "Opened salary benchmark for PM roles at 3 different companies",
    ],
    recommendedAction:
      "High flight risk — and she's signalling a career pivot, not just a company change. Explore whether you can create a hybrid design-PM role or offer internal mobility before she leaves.",
    suggestedScript: "Priya, you've always had strong product instincts. I've been wondering if the pure design track is the right fit for where you're heading. Have you ever thought about a product management path? There might be something worth exploring here.",
  },
];

// ReEngagementAgent — The Diplomat
export const reEngagement = {
  subjectLine: "Still thinking about you — new opening at [Company]",
  messageDraft:
    "Hi [Name], it's been about 18 months since we last spoke. I remember you were focused on building your data engineering skills at the time — looks like you've made great progress. We have a Senior Data Engineer role opening next month that I think is worth a conversation. Would a quick 20-minute call work for you?",
  sendTiming: "Tuesday or Wednesday morning, 9-11am — highest reply rate",
  notes: "Candidate was rejected due to budget constraint, not fit. High priority re-engage.",
};

// OnboardingAgent — The Buddy
export const onboardingCheck = {
  newHireId: "hire_004",
  name: "Irfan Danial bin Azmi",
  checkInDay: 30,
  riskScore: 42,
  flags: ["Has not engaged in team Slack channels", "Submitted first PR 3 weeks late"],
  managerAction: "Check in today — not performance review, just a genuine catch-up.",
  conversationStarter:
    "Hey Irfan, just wanted to see how you're settling in. What's been the most surprising thing about the role so far?",
};

// WorkforceAgent — The Strategist
export const workforcePlan = {
  summary:
    "Your current tech team of 12 has 3 roles at high automation risk in 18 months. Recommend upskilling budget allocation now rather than new hires.",
  quarterlyPlan: [
    { quarter: "Q3 2026", action: "Upskill 2 junior devs to full-stack", cost: "RM4,000 training" },
    { quarter: "Q4 2026", action: "Hire 1 senior AI engineer", cost: "RM12,000/month" },
  ],
  riskRoles: [
    { role: "Manual QA Tester", automationRisk: "High", timeline: "12-18 months" },
    { role: "Data Entry Specialist", automationRisk: "Very High", timeline: "6-12 months" },
  ],
  recommendations: [
    "Invest in AI tooling training",
    "Prioritise remote hiring to access wider talent pool",
    "Build internship pipeline from UTM and UiTM",
  ],
};

export const employerProfile = {
  companyName: "TechNova Sdn Bhd",
  industry: "Software & IT Services",
  size: "11-50 employees",
};

// Saved shortlist — candidates the employer is tracking
export const shortlist = [
  {
    candidateId: "cand_001",
    name: "Nurul Ain bt Rosli",
    currentRole: "Junior Developer",
    trajectoryScore: 89,
    status: "contacted" as const,
    notes: "Replied — open to a call after her current sprint ends. Follow up next Monday.",
    addedAt: "3 days ago",
  },
  {
    candidateId: "cand_002",
    name: "Haziq bin Hamdan",
    currentRole: "Self-taught Developer",
    trajectoryScore: 84,
    status: "watching" as const,
    notes: "Wait for his 4th deployed project — strong junior hire signal if velocity holds.",
    addedAt: "1 week ago",
  },
  {
    candidateId: "cand_003",
    name: "Tan Wei Jian",
    currentRole: "QA Engineer",
    trajectoryScore: 76,
    status: "interviewing" as const,
    notes: "Technical interview scheduled Thursday — prep automation take-home.",
    addedAt: "2 weeks ago",
  },
];

// Re-engagement warmlist — past candidates worth a second conversation
export const warmlist = [
  {
    id: "warm_1",
    name: "Daniel Wong",
    lastRole: "Data Engineer @ fintech startup",
    lastContact: "18 months ago",
    rejectionReason: "Budget constraint, not fit",
    matchedOpening: "Senior Data Engineer (opens next month)",
    priority: "high" as const,
  },
  {
    id: "warm_2",
    name: "Aisyah Rahman",
    lastRole: "UX Designer @ agency",
    lastContact: "10 months ago",
    rejectionReason: "Accepted competing offer",
    matchedOpening: "Product Designer",
    priority: "medium" as const,
  },
  {
    id: "warm_3",
    name: "Kavitha Pillai",
    lastRole: "Backend Developer",
    lastContact: "6 months ago",
    rejectionReason: "Role was filled internally",
    matchedOpening: "Backend Developer (Node.js)",
    priority: "medium" as const,
  },
];

// OnboardingAgent — all new hires being tracked
export const newHires = [
  {
    id: "hire_004",
    name: "Irfan Danial bin Azmi",
    role: "Junior Developer",
    day: 30,
    riskScore: 42,
    flags: ["Has not engaged in team Slack channels", "Submitted first PR 3 weeks late"],
    managerAction: "Check in today — not performance review, just a genuine catch-up.",
    conversationStarter:
      "Hey Irfan, just wanted to see how you're settling in. What's been the most surprising thing about the role so far?",
  },
  {
    id: "hire_005",
    name: "Lim Jia Ying",
    role: "Product Designer",
    day: 14,
    riskScore: 12,
    flags: [],
    managerAction: "On track — shipped first design review without escalation. No action needed.",
    conversationStarter: "Nice work on the onboarding flow mockups — what do you want to tackle next?",
  },
  {
    id: "hire_006",
    name: "Arjun Mehta",
    role: "QA Engineer",
    day: 60,
    riskScore: 67,
    flags: ["Missed 2 standups this week", "Flagged workload concerns in 1:1 notes"],
    managerAction: "Schedule a workload conversation this week — burnout signals at day 60 rarely self-correct.",
    conversationStarter: "Arjun, your plate looks full. If you could hand off one thing tomorrow, what would it be?",
  },
];

// Employer's posted internship listings
export const internshipListings = [
  {
    id: "list_1",
    title: "Frontend Developer Intern",
    mode: "hybrid",
    location: "Kuala Lumpur",
    durationMonths: 6,
    allowance: 900,
    skillsNeeded: ["React", "TypeScript", "Git"],
    applicants: 23,
    topMatchScore: 91,
    isActive: true,
    postedAt: "2 weeks ago",
  },
  {
    id: "list_2",
    title: "UI/UX Design Intern",
    mode: "onsite",
    location: "Kuala Lumpur",
    durationMonths: 4,
    allowance: 800,
    skillsNeeded: ["Figma", "Design Systems", "Prototyping"],
    applicants: 41,
    topMatchScore: 87,
    isActive: true,
    postedAt: "1 month ago",
  },
  {
    id: "list_3",
    title: "Data Analyst Intern",
    mode: "remote",
    location: "Remote (MY)",
    durationMonths: 6,
    allowance: 1000,
    skillsNeeded: ["Python", "SQL", "Tableau"],
    applicants: 17,
    topMatchScore: 74,
    isActive: false,
    postedAt: "3 months ago",
  },
];
