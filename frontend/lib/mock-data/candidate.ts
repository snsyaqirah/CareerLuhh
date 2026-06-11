// Stage 1 — DUMMY DATA ONLY. Hardcoded mock outputs of the candidate-side agents.

// ResumeOCRAgent — The Clerk
export const parsedResume = {
  name: "Ahmad Faris bin Azman",
  email: "faris@email.com",
  phone: "012-3456789",
  location: "Shah Alam, Selangor",
  currentRole: "Junior Software Engineer",
  yearsExp: 2,
  skills: ["JavaScript", "React", "Node.js", "MySQL", "Git"],
  education: [
    {
      institution: "UiTM Shah Alam",
      qualification: "Bachelor of Computer Science (Hons)",
      year: 2022,
      cgpa: 3.45,
    },
  ],
  experience: [
    {
      company: "TechStartup Sdn Bhd",
      role: "Junior Software Engineer",
      duration: "Jan 2023 - Present",
      responsibilities: [
        "Built React dashboards",
        "Maintained REST APIs",
        "Participated in sprint planning",
      ],
    },
  ],
  certifications: ["AWS Cloud Practitioner (2023)"],
  projects: ["E-commerce platform (freelance)", "Personal finance tracker (side project)"],
};

// NextMoveAgent — The Navigator (Candidate Mode)
export const nextMoves = [
  {
    type: "safe",
    label: "Safe Move",
    role: "Mid-level Frontend Developer",
    timeline: "3-6 months",
    salaryRange: "RM5,500 - RM7,500",
    upskilling: ["TypeScript (2 months)", "Testing with Jest"],
    reason: "Natural progression from current role — low risk, steady salary jump",
  },
  {
    type: "growth",
    label: "Growth Move",
    role: "Full-Stack Developer (Next.js + Node)",
    timeline: "6-9 months",
    salaryRange: "RM6,500 - RM9,000",
    upskilling: ["Next.js App Router", "PostgreSQL", "Docker basics"],
    reason: "Expands your stack — opens MNC and product company doors",
  },
  {
    type: "bold",
    label: "Bold Pivot",
    role: "Product Manager (Technical Track)",
    timeline: "12-18 months",
    salaryRange: "RM8,000 - RM14,000",
    upskilling: [
      "Product Management fundamentals",
      "Analytics (GA4, Mixpanel)",
      "Stakeholder communication",
    ],
    reason:
      "Your engineering background is a rare PM asset — high ceiling but needs intentional transition",
  },
];

// PayBenchmarkAgent — The Analyst
export const payBenchmark = {
  verdict: "Underpaid",
  currentSalary: 4200,
  benchmarkMin: 5000,
  benchmarkMax: 7500,
  gap: 800,
  percentilePosition: "Bottom 25% for your role and experience",
  negotiationTip:
    "Open with: 'Based on my 2 years of delivered projects and current market rates for React developers in KL, I'd like to discuss adjusting my compensation to RM5,500.'",
  bestTiming:
    "Annual review coming in 2 months — prepare now. Or use a competing offer as leverage.",
};

// JobMatchAgent — The Broker
export const jobMatches = [
  {
    id: "job_1",
    title: "Frontend Developer (React)",
    company: "Grab Malaysia",
    source: "linkedin",
    matchScore: 94,
    matchReason:
      "Your React + Node.js background directly fits their consumer web team. They value trajectory — your side projects signal growth mindset.",
    salaryRange: "RM6,000 - RM8,500",
    mode: "hybrid",
    location: "Kuala Lumpur",
    stretchFlag: false,
  },
  {
    id: "job_2",
    title: "Software Engineer (Full-Stack)",
    company: "Shopee",
    source: "jobstreet",
    matchScore: 81,
    matchReason:
      "Slightly above current level — worth applying. Your AWS cert fills their infra gap.",
    salaryRange: "RM7,000 - RM10,000",
    mode: "onsite",
    location: "Kuala Lumpur",
    stretchFlag: true,
  },
  {
    id: "job_3",
    title: "React Developer (Remote)",
    company: "Setel Ventures",
    source: "maukerja",
    matchScore: 77,
    matchReason:
      "Fully remote role — pairs well with The Planner's recommendation to maximise net disposable income.",
    salaryRange: "RM5,500 - RM7,000",
    mode: "remote",
    location: "Remote (MY)",
    stretchFlag: false,
  },
];

// GigBridgeAgent — The Converter
export const gigConversions = [
  {
    original: "Grab food delivery driver, 2 years, 3,200 deliveries, 4.91 rating",
    converted:
      "Logistics operations specialist with 2 years of high-volume, time-critical delivery management. Maintained 98.2% on-time performance across 3,200+ orders with a 4.91/5 customer satisfaction rating. Demonstrated expertise in route optimisation, real-time problem solving, and professional client interaction.",
    skillsExtracted: [
      "Time management",
      "Route optimisation",
      "Customer service",
      "Reliability under pressure",
      "Operational consistency",
    ],
  },
];

// CoachAgent — The Advisor (Candidate Mode)
export const candidateCoach = {
  message:
    "You've been at RM4,200 for 18 months. Market rate for your stack is RM5,500 minimum. Annual review is in 6 weeks — that's your window. Want me to help you prep the conversation?",
  urgency: "high" as const,
  actionLabel: "See salary benchmark",
  actionUrl: "/candidate/salary",
};
