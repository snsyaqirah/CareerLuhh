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

// Living Portfolio — items the student has added so far
export interface PortfolioItem {
  id: string;
  type: "project" | "github" | "cert" | "competition";
  title: string;
  description: string;
  techStack: string[];
  date: string;        // display string e.g. "Mar 2026" or "Active"
  dateEnd?: string;    // e.g. "Jun 2026" or "Ongoing"
  url?: string;        // project URL, GitHub profile, cert link
  certId?: string;     // optional cert ID for "cert" type
  aiSummary: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "pf_1",
    type: "project",
    title: "Campus Food Ordering App",
    description: "Group project — React Native app for campus cafeteria pre-orders",
    techStack: ["React Native", "Firebase", "Figma"],
    date: "Jan 2026",
    dateEnd: "Mar 2026",
    url: "https://github.com/ainasofea/campus-food",
    aiSummary:
      "Demonstrates end-to-end product thinking: UI design through deployment. Strongest signal for frontend roles.",
  },
  {
    id: "pf_2",
    type: "github",
    title: "github.com/ainasofea",
    description: "12 repos · 47 contributions in the last 3 months",
    techStack: ["JavaScript", "Python", "Git"],
    date: "Active",
    url: "https://github.com/ainasofea",
    aiSummary:
      "Consistent commit cadence reads as discipline. Pin the food-ordering repo — it's your best work.",
  },
  {
    id: "pf_3",
    type: "cert",
    title: "freeCodeCamp Responsive Web Design",
    description: "300-hour certification completed",
    techStack: ["HTML", "CSS", "Accessibility"],
    date: "Jan 2026",
    certId: "fCC-RWD-2026-001",
    url: "https://freecodecamp.org/certification/ainasofea/responsive-web-design",
    aiSummary: "Entry-level signal — pair it with a deployed project to make it count.",
  },
];

// Transcript — AcademicResult records per semester
export interface TranscriptSubject {
  code: string;
  name: string;
  creditHours: number;
  grade: string;
  gradePoint: number;
}

export interface SemesterRecord {
  id: string;
  semester: number;
  year: string;
  gpa: number;
  subjects: TranscriptSubject[];
}

const GRADE_POINTS: Record<string, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, E: 0.0,
};

export function calcGpa(subjects: TranscriptSubject[]): number {
  const total = subjects.reduce((s, x) => s + x.gradePoint * x.creditHours, 0);
  const credits = subjects.reduce((s, x) => s + x.creditHours, 0);
  return credits === 0 ? 0 : Math.round((total / credits) * 100) / 100;
}

export function calcCgpa(semesters: SemesterRecord[]): number {
  const allSubjects = semesters.flatMap((s) => s.subjects);
  return calcGpa(allSubjects);
}

export const transcriptRecords: SemesterRecord[] = [
  {
    id: "sem_1",
    semester: 1,
    year: "2023/24",
    gpa: 3.45,
    subjects: [
      { code: "CSC101", name: "Introduction to Programming", creditHours: 3, grade: "A", gradePoint: 4.0 },
      { code: "MAT101", name: "Calculus I", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "CSC102", name: "Computer Organisation", creditHours: 3, grade: "A-", gradePoint: 3.7 },
      { code: "ENG101", name: "English for Communication", creditHours: 2, grade: "A", gradePoint: 4.0 },
      { code: "MPW101", name: "Malaysian Studies", creditHours: 2, grade: "A-", gradePoint: 3.7 },
    ],
  },
  {
    id: "sem_2",
    semester: 2,
    year: "2023/24",
    gpa: 3.30,
    subjects: [
      { code: "CSC201", name: "Data Structures & Algorithms", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "MAT201", name: "Discrete Mathematics", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "CSC202", name: "Object-Oriented Programming", creditHours: 3, grade: "A-", gradePoint: 3.7 },
      { code: "ENG201", name: "Technical Writing", creditHours: 2, grade: "A", gradePoint: 4.0 },
      { code: "CSC203", name: "Web Technology", creditHours: 3, grade: "B", gradePoint: 3.0 },
    ],
  },
  {
    id: "sem_3",
    semester: 3,
    year: "2024/25",
    gpa: 3.15,
    subjects: [
      { code: "CSC301", name: "Database Systems", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "CSC302", name: "Operating Systems", creditHours: 3, grade: "B", gradePoint: 3.0 },
      { code: "CSC303", name: "Software Engineering", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "MAT301", name: "Statistics for CS", creditHours: 3, grade: "B", gradePoint: 3.0 },
      { code: "CSC304", name: "Computer Networks", creditHours: 3, grade: "B-", gradePoint: 2.7 },
    ],
  },
  {
    id: "sem_4",
    semester: 4,
    year: "2024/25",
    gpa: 3.20,
    subjects: [
      { code: "CSC401", name: "Artificial Intelligence", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "CSC402", name: "Mobile Application Development", creditHours: 3, grade: "A-", gradePoint: 3.7 },
      { code: "CSC403", name: "Human-Computer Interaction", creditHours: 3, grade: "A-", gradePoint: 3.7 },
      { code: "CSC404", name: "Information Security", creditHours: 3, grade: "B", gradePoint: 3.0 },
      { code: "MPW401", name: "Co-curriculum", creditHours: 1, grade: "A", gradePoint: 4.0 },
    ],
  },
  {
    id: "sem_5",
    semester: 5,
    year: "2025/26",
    gpa: 3.10,
    subjects: [
      { code: "CSC501", name: "Cloud Computing", creditHours: 3, grade: "B", gradePoint: 3.0 },
      { code: "CSC502", name: "Final Year Project I", creditHours: 4, grade: "A-", gradePoint: 3.7 },
      { code: "CSC503", name: "Advanced Web Development", creditHours: 3, grade: "B+", gradePoint: 3.3 },
      { code: "CSC504", name: "Internship Preparation", creditHours: 1, grade: "A", gradePoint: 4.0 },
      { code: "CSC505", name: "Big Data Analytics", creditHours: 3, grade: "B-", gradePoint: 2.7 },
    ],
  },
];

// SkorAlignAgent — full translation table for the Qualifications page
export const skorAlignments = [
  {
    localCert: "MUET Band 4",
    globalEquivalent: "CEFR B2 (Upper Intermediate)",
    category: "Language",
    employerDescription:
      "Demonstrates solid working proficiency in English — able to handle professional communication, presentations, and written reports independently.",
  },
  {
    localCert: "SKM Tahap 3 — IT Support",
    globalEquivalent: "Vocational Diploma equivalent (EQF Level 4)",
    category: "Technical (TVET)",
    employerDescription:
      "Hands-on certified competency in IT support workflows — equivalent to entry-level helpdesk certification recognised by MNC HR systems.",
  },
  {
    localCert: "STPM CGPA 3.5",
    globalEquivalent: "A-Levels equivalent (UCAS ~120 points)",
    category: "Academic",
    employerDescription:
      "Pre-university qualification at distinction level — internationally comparable to strong A-Level results.",
  },
];
