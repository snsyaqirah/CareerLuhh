/**
 * STAGE 1 DEMO GUIDE — CareerLuhh
 *
 * This file powers the floating "Page Guide" popup visible on all pages during the
 * Stage 1 prototype demo. It helps hackathon judges quickly understand what each
 * page does, which AI agents are active, and what's coming in Stage 2.
 *
 * TO DISABLE FOR STAGE 2:
 *   Set DEMO_GUIDE_ENABLED = false  →  all guide buttons disappear, zero other changes.
 *
 * TO UPDATE FOR STAGE 2:
 *   Edit the entries below to reflect live functionality. The component stays the same.
 */

export const DEMO_GUIDE_ENABLED = true;

export interface PageGuide {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  agents?: string[];
  mockNote?: string;
  stage2Plans?: string[];
}

// Keys match URL pathnames (exact or prefix).
// PortalShell auto-matches by pathname — no per-page code needed.
export const demoGuides: Record<string, PageGuide> = {

  // ── STUDENT PORTAL ──────────────────────────────────────────────────────────

  "/student/dashboard": {
    title: "Student Dashboard",
    tagline: "Your career readiness at a glance",
    description:
      "The landing page for students. Shows your AI-generated readiness score, skill gaps vs. strengths, and top next actions to take before graduation. Quick links surface your roadmap and matched internships.",
    features: [
      "Readiness score ring (0–100) with letter grade",
      "Skill gaps vs. strengths breakdown",
      "Top 3 next actions ranked by career impact",
      "SkorAlign — translate your local cert to global equivalents",
      "Matched internship quick-count",
      "One-click transfer to Candidate portal after securing a job",
    ],
    agents: ["ReadinessAgent (The Auditor)", "SkorAlignAgent (The Translator)"],
    mockNote: "Score, gaps, and strengths are hardcoded mock outputs. In Stage 2, ReadinessAgent derives these from live portfolio, transcript, and job listing data.",
    stage2Plans: [
      "Live readiness recalculation when portfolio or transcript updates",
      "Weekly coaching nudge via email (The Coach · NudgeAgent)",
      "Connect transcript GPA and course completion to readiness model",
    ],
  },

  "/student/roadmap": {
    title: "Career Roadmap",
    tagline: "Three realistic paths from where you are now",
    description:
      "The Navigator maps 3 distinct career paths based on your current skills and trajectory. Each path shows year-by-year milestones, required skills, and honest salary ranges for Malaysia — so you can compare paths before committing.",
    features: [
      "3 paths generated from your profile (e.g. Frontend Dev → Fullstack → Architect)",
      "Per-path skill requirements and gap analysis",
      "Honest Malaysian salary ranges per role level",
      "Visual timeline with year 1 / 3 / 5 / 10 milestones",
      "Side-by-side path comparison",
    ],
    agents: ["NavigatorAgent (The Navigator)"],
    mockNote: "Paths are hardcoded mock data. Stage 2 generates paths dynamically from the student profile.",
    stage2Plans: [
      "Live path generation from Gemini 2.0 Flash using profile + job market data",
      "Path branching — show what happens if you upskill in skill X",
    ],
  },

  "/student/internships": {
    title: "Matched Internships",
    tagline: "Ranked by your fit, not alphabetically",
    description:
      "The Recruiter matches available internships to your profile and ranks them by match score. Unlike keyword-filtered job boards, it explains why each listing matches (or doesn't) — and flags what you're missing.",
    features: [
      "Match score % per listing based on skills + trajectory",
      "Skills gap for each role (exactly what you're missing)",
      "Company description and allowance range",
      "Direct apply button (links to register/login for Stage 1)",
      "Filter by mode: remote / hybrid / onsite",
    ],
    agents: ["RecruiterAgent (The Recruiter)"],
    mockNote: "Match scores and listings are mock data. Stage 2 pulls live postings and recalculates match per user.",
    stage2Plans: [
      "Live internship scraping from Malaysian job boards",
      "One-click application with auto-filled profile data",
    ],
  },

  "/student/portfolio": {
    title: "Portfolio",
    tagline: "Your work, structured for employers",
    description:
      "Upload and manage portfolio items — GitHub repos, deployed projects, certifications. The system extracts tech stack tags automatically and displays them in an employer-readable format. Data here auto-populates the Resume Builder.",
    features: [
      "Add GitHub repos, deployed projects, design work, certifications",
      "Tech stack tag extraction per item",
      "Portfolio items auto-populate Resume Builder",
      "Employer-facing portfolio view",
      "Completion prompts when portfolio is thin",
    ],
    agents: [],
    mockNote: "Portfolio items are mock data from student.ts. Stage 2 uses GitHub OAuth to import repos directly.",
    stage2Plans: [
      "GitHub OAuth integration for auto-import",
      "AI quality assessment of portfolio items (The Auditor)",
      "Public shareable portfolio URL",
    ],
  },

  "/student/transcript": {
    title: "Academic Transcript",
    tagline: "Your grades, translated into career signals",
    description:
      "Upload or enter your academic transcript. The system tracks GPA per semester and highlights courses that are career-relevant — connecting academic performance to readiness scoring.",
    features: [
      "Semester-by-semester GPA tracking",
      "Course list with relevance tags",
      "CGPA trend visualization",
      "Carries over to Resume Builder automatically",
    ],
    agents: [],
    mockNote: "Transcript records are mock data. Stage 2 allows PDF transcript upload with OCR extraction.",
    stage2Plans: [
      "PDF transcript upload with OCR parsing",
      "GPA contribution to readiness score calculation",
    ],
  },

  "/student/resume": {
    title: "Resume Builder",
    tagline: "AI-guided resume built from your actual profile",
    description:
      "Build a polished resume with AI tips at each section. Data from your Portfolio and Transcript auto-populates the form — no copy-pasting. Preview your resume as an A4 layout, print to PDF, or download as DOCX to edit in Word.",
    features: [
      "7-section form: Personal, Objective, Education, Skills, Projects, Experience, Certifications",
      "Auto-import from Portfolio (projects, tech stack, certs) and Transcript (GPA, university)",
      "AI Draft button — generates a full first draft in 1.5s",
      "AI tips per section explaining what employers look for",
      "Live A4 preview rendered alongside the form",
      "Print to PDF (no browser timestamps/headers)",
      "Download as DOCX for easy editing in Word",
    ],
    agents: ["ResumeAgent (The Writer)"],
    mockNote: "AI Draft is a mock generation. Stage 2 calls Gemini 2.0 Flash with real profile data.",
    stage2Plans: [
      "Real Gemini-powered draft generation from profile",
      "Resume quality scoring with specific improvement suggestions",
      "Multiple resume versions for different job targets",
    ],
  },

  "/student/qualifications": {
    title: "Qualifications",
    tagline: "Your credentials mapped to global standards",
    description:
      "SkorAlign translates Malaysian qualifications (SPM, STPM, UiTM Diploma, UTM degree) into internationally understood equivalents — so employers abroad understand your credentials without guesswork.",
    features: [
      "Malaysian qualification → global equivalent mapping",
      "Employer-facing description of each qualification",
      "Common misconceptions corrected",
      "Suggested certifications to add global credibility",
    ],
    agents: ["SkorAlignAgent (The Translator)"],
    mockNote: "Qualification mappings are curated mock data for Malaysian context.",
    stage2Plans: [
      "Integration with Malaysia Qualifications Agency (MQA) database",
      "Credential verification for employers",
    ],
  },

  "/student/lokal": {
    title: "Lokal Route",
    tagline: "Staying in Malaysia? Here's your map.",
    description:
      "For students who want to build careers in Malaysia rather than chase overseas opportunities. Shows local industry hubs, growing sectors, government-linked companies, and realistic career paths without leaving home.",
    features: [
      "Malaysian industry hub map (KL, Penang, Johor)",
      "GLCs and local tech companies worth targeting",
      "Growth sectors for the next 5 years (AI, green energy, fintech)",
      "Salary benchmarks for local roles",
    ],
    agents: ["LokalAgent"],
    mockNote: "Location and salary data is curated mock data for Stage 1.",
    stage2Plans: [
      "Live data from Talentbank and Jobstreet for local market",
      "Personalised local path recommendations based on profile",
    ],
  },

  "/student/agents": {
    title: "Agent Console",
    tagline: "All 16 AI agents working for you",
    description:
      "The Agent Console shows every AI agent in the Student portal — what it does, its current status, and the last output it generated. Think of it as mission control for your career co-pilot.",
    features: [
      "All active agents with live status (running / complete / alert)",
      "Last output preview per agent",
      "Agent-by-agent explanation of what signal it's watching",
    ],
    agents: ["ReadinessAgent", "NavigatorAgent", "RecruiterAgent", "SkorAlignAgent", "NudgeAgent"],
    mockNote: "All agent outputs are Stage 1 mock data. Stage 2 runs these agents on a schedule against live data.",
    stage2Plans: [
      "Real-time agent execution via background jobs",
      "Agent history — see how outputs change over time",
    ],
  },

  "/student/onboarding": {
    title: "Onboarding",
    tagline: "Set up your career profile in 5 minutes",
    description:
      "The guided onboarding flow for new students. Collects university, programme, semester, graduation date, and top career goals. Pre-populates all agent outputs and the dashboard.",
    features: [
      "Step-by-step profile setup",
      "Graduation date calculator (feeds into readiness urgency)",
      "Goal selection (local vs global, industry preference)",
    ],
    agents: [],
    mockNote: "Onboarding data is saved to localStorage in Stage 1.",
    stage2Plans: [
      "Neon PostgreSQL persistence",
      "Resume pre-draft generated immediately after onboarding",
    ],
  },

  "/student/graduate": {
    title: "Got a Job? Graduate to Candidate",
    tagline: "Your student work doesn't disappear — it carries over",
    description:
      "When a student secures their first job, they 'graduate' to the Candidate portal. Portfolio items, transcript, readiness score, and skills profile all carry over — so they don't start from zero.",
    features: [
      "One-click portal transfer",
      "Portfolio and transcript migration",
      "Candidate profile pre-populated from student data",
      "Celebration moment (not just a redirect)",
    ],
    agents: [],
    mockNote: "Transfer is simulated in localStorage for Stage 1.",
    stage2Plans: ["Real cross-portal data migration via database", "Alumni pathway — students can return to add new achievements"],
  },

  // ── CANDIDATE PORTAL ────────────────────────────────────────────────────────

  "/candidate/dashboard": {
    title: "Candidate Dashboard",
    tagline: "Your job search intelligence hub",
    description:
      "The central view for active job seekers. Shows job match scores, application pipeline status, salary benchmarks vs. current/target roles, and next actions recommended by The Advisor.",
    features: [
      "Application pipeline overview (Applied / Screening / Interview / Offer)",
      "Top matched roles with AI match scores",
      "Salary benchmark vs. your current role",
      "Next actions from The Advisor",
      "Days since last application (accountability nudge)",
    ],
    agents: ["AdvisorAgent (The Advisor)", "JobMatchAgent", "SalaryAgent"],
    mockNote: "All dashboard metrics are Stage 1 mock data.",
    stage2Plans: [
      "Live application status sync",
      "Salary benchmark updates from live job posting data",
    ],
  },

  "/candidate/jobs": {
    title: "Job Board",
    tagline: "Jobs ranked by your fit, explained in plain language",
    description:
      "Unlike standard job boards that rank by recency or paid listings, CareerLuhh ranks jobs by how well they match your profile. Each role shows your match score, the exact skills gap, social proof from similar candidates, and a company-specific interview tip.",
    features: [
      "AI match score per job (% fit based on your skills + trajectory)",
      "Skills gap — exactly which skills you're missing for each role",
      "Social proof — % of similar candidates who got an interview",
      "'Why JobMatchAgent picked this' explanation per role",
      "Save/bookmark jobs to review later",
      "Interview tips per company (not generic advice)",
      "Filter by: All Jobs / AI Matched / Saved",
    ],
    agents: ["JobMatchAgent", "InterviewPrepAgent (The Interrogator)"],
    mockNote: "Match scores and tips are mock data. Stage 2 uses Gemini + live job data.",
    stage2Plans: [
      "Real-time match recalculation as job postings change",
      "One-click apply with auto-filled profile",
      "Application tracking from this page",
    ],
  },

  "/candidate/applications": {
    title: "My Applications",
    tagline: "Track every application — and learn from rejections",
    description:
      "Full application tracker showing status per company. When a rejection comes in, The Coach provides honest AI feedback explaining likely reasons and specific improvements — not generic encouragement.",
    features: [
      "Status timeline per application (Applied → Screening → Interview → Offer/Rejected)",
      "AI feedback card on rejected applications",
      "Days since last update per application",
      "Notes field per application",
    ],
    agents: ["AdvisorAgent (The Advisor)", "NudgeAgent (The Coach)"],
    mockNote: "Application statuses and AI feedback are mock data.",
    stage2Plans: [
      "Email integration for automatic status updates",
      "Rejection pattern analysis across multiple applications",
    ],
  },

  "/candidate/saved": {
    title: "Saved Jobs",
    tagline: "Jobs you bookmarked, ready when you are",
    description:
      "All jobs you've saved from the Job Board, shown with their current match score and skills gap. Quick unsave, or jump directly to apply.",
    features: [
      "Persistent saved list (localStorage in Stage 1)",
      "Match score and skills gap shown per saved job",
      "Clear all button",
      "Direct link to apply",
    ],
    agents: [],
    mockNote: "Saved state is localStorage in Stage 1.",
    stage2Plans: ["Database-persisted saves synced across devices", "Alerts when a saved job changes or closes"],
  },

  "/candidate/resume": {
    title: "Resume Analyzer + Builder",
    tagline: "Upload your resume and get honest feedback, or build one from scratch",
    description:
      "Two modes: (1) Analyze — upload your existing resume and ResumeOCRAgent extracts the content, scores it, and lists specific issues by severity. (2) Build — guided resume builder with AI tips and live A4 preview, with export to PDF and DOCX.",
    features: [
      "Resume upload → OCR analysis (score out of 100)",
      "Issues ranked by severity: high / medium / low",
      "Specific improvement suggestions per issue",
      "Resume Builder with 6-section form",
      "Live A4 preview alongside the form",
      "Print to PDF + Download as DOCX",
    ],
    agents: ["ResumeOCRAgent", "ResumeAgent (The Writer)"],
    mockNote: "OCR analysis is a mock 2.2s simulation. Score and issues are hardcoded for demo. Stage 2 uses Gemini Vision to parse uploaded resume.",
    stage2Plans: [
      "Real Gemini Vision OCR of uploaded resume PDFs",
      "Rewrite suggestions powered by Gemini",
      "ATS compatibility scoring against specific job descriptions",
    ],
  },

  "/candidate/next-move": {
    title: "Next Move",
    tagline: "What should you do in the next 6 months?",
    description:
      "The Advisor builds a personalized 6-month action plan based on your current role, target role, and skills gap. Concrete, ordered steps — not generic career advice.",
    features: [
      "Current → target role gap analysis",
      "6-month action plan with ordered steps",
      "Skill recommendations with specific resources",
      "Salary milestone projected at each step",
    ],
    agents: ["AdvisorAgent (The Advisor)"],
    mockNote: "Next move plan is hardcoded mock data.",
    stage2Plans: ["Gemini-powered plan generation from live profile and job market data"],
  },

  "/candidate/salary": {
    title: "Salary Benchmark",
    tagline: "Know your number before you negotiate",
    description:
      "Salary intelligence for Malaysian candidates. Shows market rate ranges by role, level, industry, and city — so you walk into negotiations knowing what the market actually pays, not just what you think you're worth.",
    features: [
      "Salary range by role + level + city",
      "Your current salary vs. market median",
      "Negotiation tips per role",
      "Cost-of-living comparison: KL vs. Penang vs. Johor vs. remote",
    ],
    agents: ["SalaryAgent"],
    mockNote: "Salary data is curated mock data for Malaysian market context.",
    stage2Plans: [
      "Live salary data from aggregated job postings",
      "Personalised negotiation script generator",
    ],
  },

  "/candidate/agents": {
    title: "Agent Console",
    tagline: "All 16 AI agents, visible and explainable",
    description:
      "Shows every AI agent active for candidates — their current status, what signal they're watching, and their last output. Designed to show judges and users that the AI is working with specific reasoning, not black-box outputs.",
    features: [
      "All candidate-side agents with live status",
      "Last output per agent",
      "Plain-language explanation of each agent's role",
    ],
    agents: ["All candidate agents"],
    mockNote: "All outputs are Stage 1 mock data. Stage 2 runs agents on a schedule.",
    stage2Plans: ["Live agent execution", "Notification when an agent surfaces a new signal"],
  },

  // ── EMPLOYER PORTAL ─────────────────────────────────────────────────────────

  "/employer/dashboard": {
    title: "Employer Dashboard",
    tagline: "Your talent pipeline and team intelligence at a glance",
    description:
      "Command centre for hiring managers. Shows your active job listings, top candidate matches, shortlist pipeline, and retention signals from current staff — all in one view.",
    features: [
      "Active job listing stats (applicants, top match score)",
      "Top 3 candidate matches from TrajectoryMatchAgent",
      "Shortlist pipeline status",
      "Retention signal summary from The Watcher",
      "New hire check-in status from The Buddy",
    ],
    agents: ["TrajectoryMatchAgent (The Headhunter)", "RetentionSignalAgent (The Watcher)", "OnboardingAgent (The Buddy)"],
    mockNote: "All dashboard data is Stage 1 mock data from employer.ts.",
    stage2Plans: [
      "Live applicant counts from real job postings",
      "Real-time retention signal updates from staff platform activity",
    ],
  },

  "/employer/search": {
    title: "Talent Search",
    tagline: "Find candidates by trajectory, not just keywords",
    description:
      "TrajectoryMatchAgent surfaces candidates ranked by growth curve and fit — not just keyword matches on a CV. Includes TVET graduates and self-taught developers that keyword filters would miss.",
    features: [
      "Trajectory score per candidate (how fast they're growing)",
      "Readiness score (how production-ready they are now)",
      "Match reason explained in plain language",
      "Shortlist candidates directly from search",
      "Filter: University / Self-taught / TVET background",
    ],
    agents: ["TrajectoryMatchAgent (The Headhunter)", "TalentRadarAgent (The Scout)"],
    mockNote: "Candidate profiles and scores are mock data.",
    stage2Plans: [
      "Real candidate matching from live platform profiles",
      "Blind recruitment mode — hide name, gender, and photo until shortlisted",
    ],
  },

  "/employer/listings": {
    title: "My Job Listings",
    tagline: "Post and manage openings — with AI-optimised descriptions",
    description:
      "Create and manage job postings. The system suggests skills to include, flags descriptions that may reduce candidate pool diversity, and shows how your listing ranks against similar postings.",
    features: [
      "Post new job with AI-suggested skills list",
      "Edit and close active listings",
      "Applicant count and top match score per listing",
    ],
    agents: [],
    mockNote: "Listings are mock data from employer.ts.",
    stage2Plans: [
      "AI-powered job description improvement (reduce bias, improve clarity)",
      "Auto-suggest salary range based on market data",
    ],
  },

  "/employer/onboarding": {
    title: "Manager Check-in Scheduler",
    tagline: "Don't lose good hires in the first 90 days",
    description:
      "The Buddy schedules structured check-ins at Day 30, 60, and 90 for each new hire. It tells managers what to focus on at each milestone and provides a suggested conversation script — so check-ins actually happen and aren't just performative.",
    features: [
      "All new hires with current day in onboarding",
      "Progress bar from Day 1 → Day 90 with milestone dots",
      "Platform-internal signals (missed milestones, careerLuhh activity)",
      "Risk score based on missed check-ins + manager signals",
      "Per-milestone: focus area + suggested conversation script (toggle)",
      "Mark check-in as Done or Skipped",
    ],
    agents: ["OnboardingAgent (The Buddy)"],
    mockNote: "New hire data and risk scores are mock data. Check-in state saves to component state only (not persistent in Stage 1).",
    stage2Plans: [
      "Calendar integration to actually schedule the check-in",
      "Manager-reported quality score at each milestone updates risk score",
      "Automated Day 30/60/90 reminders via email",
    ],
  },

  "/employer/workforce": {
    title: "Workforce Intelligence",
    tagline: "Retain, plan, and future-proof your team",
    description:
      "Three tools in one page: (1) Invite Staff to CareerLuhh so The Watcher can surface retention signals. (2) The Watcher shows platform-internal flight risk signals for consented staff. (3) Resilience Planner calculates your 5-year workforce projection using aggregate company data — no individual staff data required.",
    features: [
      "Invite staff with company invite code — they consent to share signals",
      "Linked staff list with consent status",
      "The Watcher: platform-internal signals (profile updates, job browsing, salary benchmarks)",
      "Risk score (0–100) + suggested conversation script per at-risk employee",
      "Resilience Planner: input headcount, attrition %, retirement % → 5-year projection table",
      "AI recommendations from planner output",
    ],
    agents: ["RetentionSignalAgent (The Watcher)", "WorkforceAgent (The Strategist)"],
    mockNote: "Staff signals are mock data. The Resilience Planner calculator runs real math — input real numbers to test it.",
    stage2Plans: [
      "Live signals from staff CareerLuhh activity (post-consent)",
      "Workforce planner exports to PDF report",
      "Succession planning module for critical roles",
    ],
  },

  "/employer/re-engage": {
    title: "Re-Engagement",
    tagline: "Past candidates worth a second conversation",
    description:
      "The Diplomat builds a warm list of previously rejected candidates who have since grown into your current openings — with a personalised re-engagement message and suggested send timing.",
    features: [
      "Warmlist of high-potential past candidates",
      "Why each candidate is worth re-engaging now",
      "Draft re-engagement message per candidate",
      "Optimal send timing (day + time with highest reply rate)",
    ],
    agents: ["ReEngagementAgent (The Diplomat)"],
    mockNote: "Re-engagement list and messages are mock data.",
    stage2Plans: ["Direct message send from CareerLuhh platform (Stage 2 with consent)", "Automated re-engagement trigger when a new role opens"],
  },

  "/employer/agents": {
    title: "Agent Console",
    tagline: "All employer-side AI agents in one view",
    description:
      "Shows all 7 employer-facing agents: The Headhunter, The Scout, The Watcher, The Buddy, The Diplomat, The Strategist, and JobMatchAgent. Each shows current status and last output.",
    features: [
      "All employer agents with live status",
      "Last output per agent",
      "Plain-language explanation of each agent's role",
    ],
    agents: ["TrajectoryMatchAgent", "TalentRadarAgent", "RetentionSignalAgent", "OnboardingAgent", "ReEngagementAgent", "WorkforceAgent"],
    mockNote: "All outputs are Stage 1 mock data.",
    stage2Plans: ["Live agent execution triggered by platform events"],
  },

  // ── PUBLIC PAGES ────────────────────────────────────────────────────────────

  "/jobs": {
    title: "Public Job Board",
    tagline: "Browse open roles — no login required",
    description:
      "Any visitor can browse all 16 job listings without signing up. Roles show company, location, salary range, work mode, and required skills. Logged-in users see AI match scores, skills gap, and interview tips for each role.",
    features: [
      "All open listings with salary, location, skills, work mode",
      "Public apply button (redirects to registration)",
      "Login upsell — explains the value of AI match scores and skills gap",
    ],
    agents: [],
    mockNote: "All 16 listings are mock data. Stage 2 integrates live employer postings.",
    stage2Plans: [
      "Real employer-posted listings",
      "Match score preview for logged-in candidates on this page",
    ],
  },

  "/login": {
    title: "Log In",
    tagline: "Demo accounts available for all three portals",
    description:
      "Log in to any of the three portals: Student, Candidate, or Employer. For hackathon judging, demo accounts are pre-loaded — no signup required.",
    features: [
      "Email + password login",
      "Demo accounts shown on the page for each portal",
      "Role-based redirect after login",
      "Persistent session via localStorage",
    ],
    agents: [],
    mockNote: "Authentication is client-side only (localStorage). Stage 2 uses NextAuth.js v5 + Neon PostgreSQL.",
    stage2Plans: ["NextAuth.js with email/password + OAuth (Google)", "Server-side session management"],
  },

  "/register": {
    title: "Register",
    tagline: "Create your CareerLuhh account",
    description:
      "Registration page for new users. Choose a role (Student / Candidate / Employer), enter your details, and consent to PDPA data processing. Role selection determines which portal you're directed to.",
    features: [
      "Role selection: Student / Candidate / Employer",
      "Name, email, password fields",
      "PDPA consent checkbox (required)",
      "Redirect to portal onboarding after registration",
    ],
    agents: [],
    mockNote: "Registration saves to localStorage only in Stage 1.",
    stage2Plans: ["Server-side registration with Neon PostgreSQL", "Email verification"],
  },
};

/**
 * Returns the guide for a given pathname, matching exact routes or prefixes.
 * Returns null if DEMO_GUIDE_ENABLED is false or no guide exists for the route.
 */
export function getGuideForPath(pathname: string): PageGuide | null {
  if (!DEMO_GUIDE_ENABLED) return null;
  if (demoGuides[pathname]) return demoGuides[pathname];
  // Prefix match for dynamic routes
  const prefix = Object.keys(demoGuides).find(
    (k) => pathname.startsWith(k + "/") || pathname.startsWith(k)
  );
  return prefix ? demoGuides[prefix] : null;
}
