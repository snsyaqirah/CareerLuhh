// Multi-agent orchestration definitions — the script the Agent Console plays.
//
// Each portal has a pipeline of agents that fire in sequence, every one:
//   • reads keys from the shared Career Profile (shared memory)
//   • retrieves grounding passages from the Knowledge Base (RAG)
//   • reasons (a "why" trace)
//   • writes new keys back to the Career Profile (consistency — later agents
//     read what earlier agents wrote)
//   • returns a structured JSON output (reused from the mock-data agent outputs)
//
// Stage 1: durations + outputs are scripted. Stage 2: each step becomes a real
// runAgent() call to Gemini, reading/writing a persisted profile row.

import type { Role } from "./auth-context";
import * as student from "./mock-data/student";
import * as candidate from "./mock-data/candidate";
import * as employer from "./mock-data/employer";

export type ProfileValue = string | number | boolean | string[];
export type CareerProfile = Record<string, ProfileValue>;

export interface AgentStep {
  id: string;
  agentName: string; // persona, e.g. "The Navigator"
  codeName: string; // engineering name, e.g. "PathfinderAgent"
  accent: "blue" | "red" | "yellow";
  reads: string[]; // profile keys this agent consumes
  kbRefs: string[]; // KB_DOCS ids retrieved before reasoning
  reasoning: string; // the "why" trace
  writes: CareerProfile; // keys merged into the shared profile on completion
  output: unknown; // structured JSON result
  durationMs: number;
}

export interface Pipeline {
  role: Role;
  trigger: string;
  seed: CareerProfile; // starting profile (from onboarding)
  steps: AgentStep[];
}

// ----------------------------------------------------------------------------
// STUDENT — onboarding fires the full student pipeline
// ----------------------------------------------------------------------------
const studentPipeline: Pipeline = {
  role: "student",
  trigger: "Student completed onboarding",
  seed: {
    name: "Aina Sofea",
    programme: "BSc Computer Science",
    cgpa: 3.2,
    location: "Shah Alam",
    interests: ["Web Development", "UI/UX Design"],
  },
  steps: [
    {
      id: "pathfinder",
      agentName: "The Navigator",
      codeName: "PathfinderAgent",
      accent: "blue",
      reads: ["programme", "cgpa", "interests", "location"],
      kbRefs: ["kb_skill_demand"],
      reasoning:
        "CGPA 3.2 + Web Development interest + rising Next.js demand → Frontend Developer is the strongest realistic path for the Malaysian market.",
      writes: { topPath: "Frontend Developer", topPathMatch: 87, pathsGenerated: 3 },
      output: student.careerPaths,
      durationMs: 1300,
    },
    {
      id: "readiness",
      agentName: "The Auditor",
      codeName: "ReadinessAgent",
      accent: "red",
      reads: ["topPath", "cgpa"],
      kbRefs: [],
      reasoning:
        "Strong academics but no portfolio projects or internship yet — honest score is 62 (grade B), not inflated.",
      writes: { readinessScore: 62, readinessGrade: "B" },
      output: student.readiness,
      durationMs: 1100,
    },
    {
      id: "intern-match",
      agentName: "The Recruiter",
      codeName: "InternMatchAgent",
      accent: "blue",
      reads: ["topPath", "cgpa", "readinessScore"],
      kbRefs: ["kb_intern_absorption"],
      reasoning:
        "Frontend path + CGPA 3.2 matches Maybank's junior intern profile; ranked by absorption rate so conversion-likely roles surface first.",
      writes: { internMatches: 3, topInternScore: 91 },
      output: student.internships,
      durationMs: 1200,
    },
    {
      id: "skor-align",
      agentName: "The Translator",
      codeName: "SkorAlignAgent",
      accent: "yellow",
      reads: ["programme"],
      kbRefs: ["kb_muet_cefr"],
      reasoning:
        "Retrieved the equivalence map so MUET Band 4 is rendered as CEFR B2 — globally readable by MNC HR systems.",
      writes: { englishLevel: "CEFR B2" },
      output: student.skorAlign,
      durationMs: 800,
    },
    {
      id: "lokal-route",
      agentName: "The Planner",
      codeName: "LokalRouteAgent",
      accent: "red",
      reads: ["location", "topPath"],
      kbRefs: ["kb_col_kl", "kb_col_tier2"],
      reasoning:
        "Gross − cost-of-living: a remote Alor Setar role nets RM2,100/mo vs RM1,400 in KL despite lower salary. Flags remote-first.",
      writes: { bestLocation: "Alor Setar (remote)", netDisposable: 2100 },
      output: student.lokalScenarios,
      durationMs: 1000,
    },
    {
      id: "coach",
      agentName: "The Advisor",
      codeName: "CoachAgent",
      accent: "yellow",
      reads: ["readinessScore", "topPath"],
      kbRefs: [],
      reasoning:
        "Reads The Auditor's score of 62 + 4 months to graduation → medium-urgency nudge: ship one deployed project before applying.",
      writes: { coachUrgency: "medium" },
      output: student.studentCoach,
      durationMs: 900,
    },
  ],
};

// ----------------------------------------------------------------------------
// CANDIDATE — resume upload fires the candidate pipeline
// ----------------------------------------------------------------------------
const candidatePipeline: Pipeline = {
  role: "candidate",
  trigger: "Candidate uploaded resume (PDF)",
  seed: {
    resume: "ahmad_faris_resume.pdf",
    location: "Shah Alam",
  },
  steps: [
    {
      id: "clerk",
      agentName: "The Clerk",
      codeName: "ResumeOCRAgent",
      accent: "blue",
      reads: ["resume"],
      kbRefs: [],
      reasoning:
        "Extracted only what's in the document — no inference. Skills, role and tenure now seed the shared profile for every downstream agent.",
      writes: {
        currentRole: "Junior Software Engineer",
        yearsExp: 2,
        skills: ["JavaScript", "React", "Node.js", "MySQL", "Git"],
        currentSalary: 4200,
      },
      output: candidate.parsedResume,
      durationMs: 1200,
    },
    {
      id: "pay-benchmark",
      agentName: "The Analyst",
      codeName: "PayBenchmarkAgent",
      accent: "red",
      reads: ["currentRole", "yearsExp", "currentSalary"],
      kbRefs: ["kb_salary_react_kl"],
      reasoning:
        "Retrieved KL React-dev benchmark (RM5,000–7,500). Current RM4,200 sits below the floor → verdict Underpaid, gap RM800.",
      writes: { salaryVerdict: "Underpaid", salaryGap: 800 },
      output: candidate.payBenchmark,
      durationMs: 1100,
    },
    {
      id: "job-match",
      agentName: "The Broker",
      codeName: "JobMatchAgent",
      accent: "blue",
      reads: ["skills", "salaryVerdict"],
      kbRefs: ["kb_skill_demand"],
      reasoning:
        "Matches by trajectory not keywords — side-project signal + underpaid verdict prioritise roles with real salary upside.",
      writes: { jobMatches: 3, topJobScore: 94 },
      output: candidate.jobMatches,
      durationMs: 1200,
    },
    {
      id: "next-move",
      agentName: "The Navigator",
      codeName: "NextMoveAgent",
      accent: "yellow",
      reads: ["currentRole", "skills"],
      kbRefs: [],
      reasoning:
        "Maps a safe / growth / bold fork from the parsed profile, each with its own upskilling bill and salary band.",
      writes: { nextMoves: 3 },
      output: candidate.nextMoves,
      durationMs: 1000,
    },
    {
      id: "coach",
      agentName: "The Advisor",
      codeName: "CoachAgent",
      accent: "red",
      reads: ["salaryVerdict", "salaryGap"],
      kbRefs: [],
      reasoning:
        "Reads The Analyst's RM800 gap + 18 months at flat pay → high-urgency: annual review in 6 weeks is the negotiation window.",
      writes: { coachUrgency: "high" },
      output: candidate.candidateCoach,
      durationMs: 900,
    },
  ],
};

// ----------------------------------------------------------------------------
// EMPLOYER — opening a role fires the employer pipeline
// ----------------------------------------------------------------------------
const employerPipeline: Pipeline = {
  role: "employer",
  trigger: "Employer opened a mid-level Frontend role",
  seed: {
    company: "TechNova Sdn Bhd",
    openRole: "Mid-level Frontend Developer",
    teamSize: 12,
  },
  steps: [
    {
      id: "scout",
      agentName: "The Scout",
      codeName: "TalentRadarAgent",
      accent: "blue",
      reads: ["openRole"],
      kbRefs: ["kb_trajectory_priors"],
      reasoning:
        "Surfaces high-trajectory candidates keyword filters miss — incl. a TVET grad whose curve matches your last 2 successful hires.",
      writes: { flaggedCandidates: 2 },
      output: employer.talentRadar,
      durationMs: 1100,
    },
    {
      id: "headhunter",
      agentName: "The Headhunter",
      codeName: "TrajectoryMatchAgent",
      accent: "red",
      reads: ["openRole", "flaggedCandidates"],
      kbRefs: ["kb_skill_demand"],
      reasoning:
        "Ranks by growth curve vs your Q3 timeline — Nurul Ain's Next.js/TS velocity scores 89, ready to ramp in 3 months.",
      writes: { topTrajectoryScore: 89, shortlisted: 3 },
      output: employer.trajectoryMatches,
      durationMs: 1300,
    },
    {
      id: "watcher",
      agentName: "The Watcher",
      codeName: "RetentionSignalAgent",
      accent: "red",
      reads: ["teamSize"],
      kbRefs: [],
      reasoning:
        "LinkedIn update + new skills unrelated to current role = medium flight risk. Flagged before the resignation, not after.",
      writes: { flightRisks: 1 },
      output: employer.retentionAlerts,
      durationMs: 1000,
    },
    {
      id: "buddy",
      agentName: "The Buddy",
      codeName: "OnboardingAgent",
      accent: "yellow",
      reads: ["teamSize"],
      kbRefs: [],
      reasoning:
        "Day-30/60 check-ins: one new hire shows disengagement signals (risk 42, then 67) — manager action drafted per hire.",
      writes: { atRiskHires: 1 },
      output: employer.newHires,
      durationMs: 1000,
    },
    {
      id: "strategist",
      agentName: "The Strategist",
      codeName: "WorkforceAgent",
      accent: "blue",
      reads: ["teamSize", "flightRisks"],
      kbRefs: ["kb_automation_risk"],
      reasoning:
        "Retrieved automation-risk index: 3 of 12 roles at high risk in 18mo → recommend upskilling budget now over net-new hires.",
      writes: { riskRoles: 2, planQuarters: 2 },
      output: employer.workforcePlan,
      durationMs: 1300,
    },
  ],
};

export const PIPELINES: Record<Role, Pipeline> = {
  student: studentPipeline,
  candidate: candidatePipeline,
  employer: employerPipeline,
};
