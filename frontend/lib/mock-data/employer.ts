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
export const retentionAlerts = [
  {
    employeeId: "emp_003",
    name: "Siti Hajar bt Kamaruddin",
    riskLevel: "medium" as const,
    signals: [
      "Updated LinkedIn profile 3 days ago",
      "Added new skills (Docker, Kubernetes) not relevant to current role",
    ],
    recommendedAction:
      "Have a career conversation this week. Ask where she sees herself in 12 months. She may be looking for a path to senior level — do you have that for her?",
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
