// Stage 1 — DUMMY DATA ONLY. These are the hardcoded mock outputs of the
// student-side agents. Stage 2 replaces these with real Gemini calls.

export type RoadmapNodeType = "milestone" | "skill" | "action" | "role";

export interface RoadmapNode {
  id: string;
  label: string;
  type: RoadmapNodeType;
  x: number;
  y: number;
}

export interface CareerPath {
  id: string;
  title: string;
  color: string;
  timeline: string;
  salaryRange: string;
  matchScore: number;
  nodes: RoadmapNode[];
  edges: { from: string; to: string }[];
}

// PathfinderAgent — The Navigator
export const careerPaths: CareerPath[] = [
  {
    id: "path_1",
    title: "Frontend Developer",
    color: "#1040C0",
    timeline: "12-18 months",
    salaryRange: "RM3,000 - RM5,500",
    matchScore: 87,
    nodes: [
      { id: "n1", label: "Complete Degree", type: "milestone", x: 0, y: 0 },
      { id: "n2", label: "Learn React + Next.js", type: "skill", x: 1, y: 0 },
      { id: "n3", label: "Build 2 Portfolio Projects", type: "action", x: 2, y: 0 },
      { id: "n4", label: "Junior Frontend Dev", type: "role", x: 3, y: 0 },
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
    ],
  },
  {
    id: "path_2",
    title: "UI/UX Designer",
    color: "#D02020",
    timeline: "8-12 months",
    salaryRange: "RM2,800 - RM5,000",
    matchScore: 74,
    nodes: [
      { id: "n1", label: "Complete Degree", type: "milestone", x: 0, y: 0 },
      { id: "n2", label: "Learn Figma + Design Systems", type: "skill", x: 1, y: 0 },
      { id: "n3", label: "Build Case Studies", type: "action", x: 2, y: 0 },
      { id: "n4", label: "Junior UI/UX Designer", type: "role", x: 3, y: 0 },
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
    ],
  },
  {
    id: "path_3",
    title: "Data Analyst",
    color: "#F0C020",
    timeline: "18-24 months",
    salaryRange: "RM3,500 - RM6,500",
    matchScore: 61,
    nodes: [
      { id: "n1", label: "Complete Degree", type: "milestone", x: 0, y: 0 },
      { id: "n2", label: "Learn Python + SQL", type: "skill", x: 1, y: 0 },
      { id: "n3", label: "Kaggle + Personal Projects", type: "action", x: 2, y: 0 },
      { id: "n4", label: "Junior Data Analyst", type: "role", x: 3, y: 0 },
    ],
    edges: [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
    ],
  },
];

// ReadinessAgent — The Auditor
export const readiness = {
  score: 62,
  grade: "B",
  gaps: [
    "No portfolio projects yet",
    "Missing internship experience",
    "LinkedIn profile incomplete",
  ],
  strengths: [
    "CGPA above 3.0",
    "Active GitHub account",
    "Strong academic results in core subjects",
  ],
  nextActions: [
    "Build one full-stack project this month",
    "Apply for internship by next semester",
    "Complete LinkedIn profile today",
  ],
};

// InternMatchAgent — The Recruiter
export const internships = [
  {
    id: "int_1",
    company: "Maybank",
    title: "IT Internship — Frontend Track",
    mode: "hybrid",
    location: "Kuala Lumpur",
    allowance: 800,
    matchScore: 91,
    matchReason:
      "Your React interest + CGPA 3.2 aligns with their junior dev intern profile",
    absorptionRate: "High — 70% converted to full-time last year",
    duration: 6,
  },
  {
    id: "int_2",
    company: "Shopee Malaysia",
    title: "Product Design Intern",
    mode: "onsite",
    location: "Kuala Lumpur",
    allowance: 1200,
    matchScore: 78,
    matchReason:
      "UI/UX interest shown in your profile matches product design track",
    absorptionRate: "Medium — active hiring from intern pool",
    duration: 4,
  },
  {
    id: "int_3",
    company: "Petronas Digital",
    title: "Data & Analytics Intern",
    mode: "hybrid",
    location: "Kuala Lumpur",
    allowance: 1000,
    matchScore: 69,
    matchReason:
      "Your strong maths results signal data aptitude — worth exploring this track",
    absorptionRate: "Medium — graduate programme pipeline available",
    duration: 6,
  },
];

// SkorAlignAgent — The Translator
export const skorAlign = {
  localCert: "MUET Band 4",
  globalEquivalent: "CEFR B2 (Upper Intermediate)",
  cefrLevel: "B2",
  employerDescription:
    "Demonstrates solid working proficiency in English — able to handle professional communication, presentations, and written reports independently.",
};

// LokalRouteAgent — The Planner
export const lokalScenarios = {
  scenarios: [
    {
      city: "Kuala Lumpur",
      grossSalary: 3500,
      costOfLiving: 2100,
      netDisposable: 1400,
      mode: "onsite",
      verdict: "Moderate savings — tight budget in first year",
    },
    {
      city: "Alor Setar (Remote)",
      grossSalary: 3000,
      costOfLiving: 900,
      netDisposable: 2100,
      mode: "remote",
      verdict: "Better net savings — recommended if remote role available",
    },
  ],
  recommendation:
    "The remote job in Alor Setar saves RM700/month more than KL despite RM500 lower salary. Prioritise remote-first roles.",
  remoteJobsAvailable: true,
};

// CoachAgent — The Advisor (Student Mode)
export const studentCoach = {
  message:
    "Your graduation is 4 months away and your readiness score is 62. You need at least one deployed project before you start applying. Start this weekend — even a simple one counts.",
  urgency: "medium" as const,
  actionLabel: "See what to build",
  actionUrl: "/student/roadmap",
};

export const studentProfile = {
  name: "Aina Sofea",
  university: "UiTM Shah Alam",
  programme: "Bachelor of Computer Science (Hons)",
  semester: 6,
  cgpa: 3.2,
  graduation: "October 2026",
};
