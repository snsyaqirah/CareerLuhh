// Central job listings — shared by candidate job board and employer management views.
// Stage 1: all static mock data. Stage 2: fetched from Neon DB + Maukerja/Jobstreet APIs.

export type JobCategory =
  | "Technology"
  | "Design"
  | "Data"
  | "Product"
  | "Marketing"
  | "Finance"
  | "Operations"
  | "Human Resources"
  | "Healthcare"
  | "Education"
  | "Logistics"
  | "Accounting";

export type WorkMode = "remote" | "hybrid" | "onsite";
export type JobType = "full-time" | "part-time" | "contract";
export type ApplicationStatus =
  | "applied"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offer"
  | "rejected";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  location: string;
  mode: WorkMode;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  description: string;
  requirements: string[];
  skills: string[];
  source: string;
  matchScore?: number;
  matchReason?: string;
  stretchFlag?: boolean;
  socialProof?: string;
  successRate?: number;
  interviewTip?: string;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  mode: WorkMode;
  salaryMin: number;
  salaryMax: number;
  appliedAt: string;
  status: ApplicationStatus;
  coverNote?: string;
}

export interface EmployerApplicant {
  id: string;
  name: string;
  currentRole: string;
  yearsExp: number;
  matchScore: number;
  status: "new" | "reviewing" | "shortlisted" | "rejected";
  appliedAt: string;
}

export interface EmployerJobPosting {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  mode: WorkMode;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  postedAt: string;
  isActive: boolean;
  applicantCount: number;
  applicants: EmployerApplicant[];
  description: string;
  requirements: string[];
  skills: string[];
}

// ─────────────────────────────────────────────
// 16 browsable job listings
// ─────────────────────────────────────────────
export const jobListings: JobListing[] = [
  {
    id: "jl_01",
    title: "Frontend Developer (React)",
    company: "Grab Malaysia",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 6000,
    salaryMax: 8500,
    postedAt: "2 days ago",
    description:
      "Join Grab's consumer web team building high-traffic React applications used by millions across Southeast Asia. You'll own features end-to-end — from design review to production deploy.",
    requirements: [
      "2+ years of React experience",
      "Strong TypeScript fundamentals",
      "Experience with REST APIs and state management",
      "Familiarity with CI/CD pipelines",
    ],
    skills: ["React", "TypeScript", "Next.js", "CSS", "Git"],
    source: "linkedin",
    matchScore: 94,
    matchReason:
      "Your React + Node.js background directly fits their consumer web team. They value trajectory — your side projects signal growth mindset.",
    stretchFlag: false,
    socialProof: "11 CS grads from UiTM & UM joined Grab Malaysia in 2025",
    successRate: 72,
    interviewTip: "Two rounds: technical (live coding in React) + culture fit. They love asking about your most complex state management problem. Prepare a specific story.",
  },
  {
    id: "jl_02",
    title: "Software Engineer (Full-Stack)",
    company: "Shopee",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 7000,
    salaryMax: 10000,
    postedAt: "1 day ago",
    description:
      "Build and scale e-commerce features for Shopee's Malaysian platform. You'll work across frontend and backend in a fast-paced product team with strong engineering culture.",
    requirements: [
      "3+ years full-stack experience",
      "Proficiency in Node.js or Go",
      "Experience with microservices",
      "AWS or equivalent cloud experience",
    ],
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    source: "jobstreet",
    matchScore: 81,
    matchReason:
      "Slightly above current level — worth applying. Your AWS cert fills their infra gap.",
    stretchFlag: true,
    socialProof: "6 graduates from your trajectory level got hired at Shopee in the last 12 months",
    successRate: 54,
    interviewTip: "3 rounds: take-home assignment + system design + HR. Focus on scalability — they care about how you handle 100x traffic spikes.",
  },
  {
    id: "jl_03",
    title: "React Developer (Remote)",
    company: "Setel Ventures",
    category: "Technology",
    location: "Remote (MY)",
    mode: "remote",
    type: "full-time",
    salaryMin: 5500,
    salaryMax: 7000,
    postedAt: "5 days ago",
    description:
      "Setel powers Malaysia's largest petrol payment platform. Fully remote role building the React web dashboard and improving the customer-facing product.",
    requirements: [
      "2+ years of React experience",
      "Comfortable working async and remote",
      "Experience with mobile-responsive design",
    ],
    skills: ["React", "JavaScript", "CSS Modules", "REST APIs"],
    source: "maukerja",
    matchScore: 77,
    matchReason:
      "Fully remote — pairs well with The Planner's recommendation to maximise net disposable income.",
    stretchFlag: false,
    socialProof: "Setel hires from non-FAANG backgrounds — 4 graduates with your profile joined in 2025",
    successRate: 68,
    interviewTip: "Async-friendly process. Portfolio review first, then a short Loom video interview. Show off a live deployed project.",
  },
  {
    id: "jl_04",
    title: "Backend Engineer (Node.js)",
    company: "AirAsia Superapp",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 6500,
    salaryMax: 9000,
    postedAt: "3 days ago",
    description:
      "Design and build APIs powering the AirAsia Superapp backend. You'll work on high-throughput services handling millions of daily transactions across flights, hotels, and food.",
    requirements: [
      "3+ years Node.js or similar backend experience",
      "Strong SQL and database design skills",
      "Experience with message queues (Kafka/RabbitMQ)",
    ],
    skills: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Docker"],
    source: "linkedin",
    stretchFlag: false,
    socialProof: "AirAsia actively recruits from Malaysian universities — 8 hires in backend engineering in 2025",
    successRate: 61,
    interviewTip: "System design is core here. Expect a question like: 'Design a payment queue that handles 1M transactions/day'. Know Kafka basics.",
  },
  {
    id: "jl_05",
    title: "Mobile Developer (Flutter)",
    company: "Axiata Digital",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 5000,
    salaryMax: 8000,
    postedAt: "1 week ago",
    description:
      "Build cross-platform mobile apps for Axiata's digital services portfolio. Own features across the full stack from Dart to backend API integration.",
    requirements: [
      "2+ years Flutter / Dart",
      "Published apps on App Store or Play Store",
      "Understanding of mobile UX principles",
    ],
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
    source: "jobstreet",
    stretchFlag: false,
  },
  {
    id: "jl_06",
    title: "UI/UX Designer",
    company: "CIMB Bank",
    category: "Design",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 4500,
    salaryMax: 7000,
    postedAt: "4 days ago",
    description:
      "Design digital banking experiences used by 9 million customers. You'll lead UX research, wireframing, and work closely with product and engineering to ship polished features.",
    requirements: [
      "3+ years UX/UI design experience",
      "Strong Figma skills",
      "Experience with financial or e-commerce products",
      "Portfolio of shipped product work",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
    source: "direct",
    stretchFlag: false,
  },
  {
    id: "jl_07",
    title: "Data Analyst",
    company: "Petronas Digital",
    category: "Data",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 5000,
    salaryMax: 8000,
    postedAt: "6 days ago",
    description:
      "Analyse operational and commercial data to support Petronas Digital's business intelligence team. Build dashboards and translate data into decisions for senior leadership.",
    requirements: [
      "2+ years data analysis experience",
      "Proficiency in SQL and Python or R",
      "Experience with BI tools (Power BI, Tableau)",
      "Strong communication skills",
    ],
    skills: ["SQL", "Python", "Power BI", "Excel", "Statistics"],
    source: "jobstreet",
    stretchFlag: false,
  },
  {
    id: "jl_08",
    title: "Data Scientist",
    company: "GoTo Financial",
    category: "Data",
    location: "Remote (MY)",
    mode: "remote",
    type: "full-time",
    salaryMin: 8000,
    salaryMax: 14000,
    postedAt: "2 days ago",
    description:
      "Build ML models for credit scoring, fraud detection, and personalisation for GoTo's Southeast Asia fintech platform. High ownership, remote-first culture.",
    requirements: [
      "3+ years data science / ML engineering",
      "Python (scikit-learn, PyTorch, or TensorFlow)",
      "Experience productionising ML models",
      "Strong statistics foundation",
    ],
    skills: ["Python", "Machine Learning", "SQL", "Docker", "MLflow"],
    source: "linkedin",
    stretchFlag: true,
  },
  {
    id: "jl_09",
    title: "Product Manager (Technical Track)",
    company: "Lazada Malaysia",
    category: "Product",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 9000,
    salaryMax: 15000,
    postedAt: "3 days ago",
    description:
      "Lead the product roadmap for Lazada's seller tools. You'll own a feature set end-to-end — from problem discovery and spec writing to launch and post-launch metrics.",
    requirements: [
      "3+ years in product management",
      "Technical background (engineering or data)",
      "Strong analytical skills — SQL is a plus",
      "Experience managing cross-functional teams",
    ],
    skills: ["Product Strategy", "SQL", "Figma", "Analytics", "Stakeholder Management"],
    source: "linkedin",
    stretchFlag: true,
  },
  {
    id: "jl_10",
    title: "DevOps / Cloud Engineer",
    company: "Maxis",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 7000,
    salaryMax: 11000,
    postedAt: "1 week ago",
    description:
      "Own and scale Maxis's cloud infrastructure on AWS and Azure. Build CI/CD pipelines, improve system reliability, and mentor junior engineers on DevOps best practices.",
    requirements: [
      "3+ years DevOps / cloud engineering",
      "AWS or Azure certification preferred",
      "Terraform or Ansible experience",
      "Strong Linux and scripting background",
    ],
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD"],
    source: "direct",
    stretchFlag: false,
  },
  {
    id: "jl_11",
    title: "Business Analyst",
    company: "Maybank",
    category: "Finance",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 5000,
    salaryMax: 7500,
    postedAt: "5 days ago",
    description:
      "Bridge the gap between business stakeholders and technology teams at Maybank's digital banking division. Translate requirements into specs and user stories.",
    requirements: [
      "2+ years business analysis experience",
      "Familiarity with agile / scrum methodology",
      "Banking or fintech background preferred",
    ],
    skills: ["Requirements Gathering", "JIRA", "SQL", "Process Mapping", "Agile"],
    source: "jobstreet",
    stretchFlag: false,
  },
  {
    id: "jl_12",
    title: "Full-Stack Engineer (Next.js)",
    company: "FPX",
    category: "Technology",
    location: "Remote (MY)",
    mode: "remote",
    type: "full-time",
    salaryMin: 7000,
    salaryMax: 11000,
    postedAt: "2 days ago",
    description:
      "Build and maintain FPX's merchant-facing payment dashboard with Next.js on the frontend and Node.js microservices on the backend. Full ownership of features.",
    requirements: [
      "3+ years full-stack experience",
      "Strong Next.js / React knowledge",
      "Experience with PostgreSQL and ORM (Prisma preferred)",
    ],
    skills: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript"],
    source: "maukerja",
    stretchFlag: false,
    socialProof: "FPX is fintech — strong brand on your CV. 5 engineers with similar profiles joined in 2025",
    successRate: 79,
    interviewTip: "They care about clean code and testing habits. Walk them through a refactor you did. Mention Prisma experience if you have it — that's their ORM.",
  },
  {
    id: "jl_13",
    title: "Cloud Engineer (AWS)",
    company: "MYEG Services",
    category: "Technology",
    location: "Remote (MY)",
    mode: "remote",
    type: "full-time",
    salaryMin: 7000,
    salaryMax: 12000,
    postedAt: "4 days ago",
    description:
      "Design and manage cloud infrastructure for MYEG's e-government services platform. You'll work on high-availability systems handling millions of citizen transactions.",
    requirements: [
      "AWS Solutions Architect certification",
      "3+ years cloud infrastructure experience",
      "Strong scripting skills (Python or Bash)",
    ],
    skills: ["AWS", "Python", "Terraform", "Linux", "Security"],
    source: "jobstreet",
    stretchFlag: false,
  },
  {
    id: "jl_14",
    title: "Digital Marketing Manager",
    company: "AirAsia Superapp",
    category: "Marketing",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 5000,
    salaryMax: 8000,
    postedAt: "1 week ago",
    description:
      "Lead digital acquisition and retention campaigns for AirAsia's Superapp. Own the paid, social, and email channels with a data-driven approach and clear ROAS targets.",
    requirements: [
      "4+ years digital marketing experience",
      "Experience with GA4, Meta Ads, Google Ads",
      "Strong analytical and reporting skills",
    ],
    skills: ["Google Ads", "Meta Ads", "GA4", "Email Marketing", "A/B Testing"],
    source: "linkedin",
    stretchFlag: false,
  },
  {
    id: "jl_15",
    title: "UX Researcher",
    company: "Grab Malaysia",
    category: "Design",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 6000,
    salaryMax: 9000,
    postedAt: "3 days ago",
    description:
      "Lead qualitative and quantitative research to shape Grab's product decisions in Malaysia. Partner with product and design to surface real user needs and translate them into clear direction.",
    requirements: [
      "3+ years UX research experience",
      "Proficiency in usability testing and interview methods",
      "Ability to synthesise research into actionable insights",
    ],
    skills: ["Usability Testing", "User Interviews", "Survey Design", "Figma", "Analytics"],
    source: "direct",
    stretchFlag: false,
  },
  {
    id: "jl_16",
    title: "Software Engineer (Python / Backend)",
    company: "RHB Bank",
    category: "Finance",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 6000,
    salaryMax: 9000,
    postedAt: "6 days ago",
    description:
      "Build Python microservices for RHB's open banking platform. You'll design APIs consumed by fintechs and internal teams, with a focus on security and reliability.",
    requirements: [
      "3+ years Python backend experience",
      "REST and GraphQL API design",
      "Experience in regulated environments (banking or fintech)",
    ],
    skills: ["Python", "Django", "PostgreSQL", "Docker", "API Design"],
    source: "jobstreet",
    stretchFlag: false,
  },

  // ── Non-IT roles — CareerLuhh covers ALL industries ──────────────────────

  {
    id: "jl_17",
    title: "Human Resources Business Partner",
    company: "Sunway Group",
    category: "Human Resources",
    location: "Petaling Jaya, Selangor",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 5500,
    salaryMax: 8500,
    postedAt: "3 days ago",
    description:
      "Partner with business units to drive talent strategy, manage performance cycles, and lead change initiatives. You'll be the bridge between people and business outcomes in a conglomerate with 60,000+ employees across Southeast Asia.",
    requirements: [
      "3+ years HR generalist or HRBP experience",
      "Degree in Human Resource Management or Psychology",
      "Experience with HR systems (SAP SuccessFactors preferred)",
    ],
    skills: ["Talent Management", "HR Strategy", "Performance Management", "Change Management", "Employee Relations"],
    source: "jobstreet",
    stretchFlag: false,
    successRate: 58,
    interviewTip: "Two rounds: HR director + business unit head. Prepare a case study of a people problem you solved — with numbers.",
  },
  {
    id: "jl_18",
    title: "Registered Nurse (General Ward)",
    company: "Pantai Hospital Kuala Lumpur",
    category: "Healthcare",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 3800,
    salaryMax: 5500,
    postedAt: "1 week ago",
    description:
      "Provide direct patient care in a busy general ward. Collaborate with doctors and allied health professionals to deliver safe, compassionate care. Mentorship for newly registered nurses is available.",
    requirements: [
      "Registered with Malaysian Nursing Board (MNB)",
      "Post-basic certificate an advantage",
      "Willing to work rotating shifts",
    ],
    skills: ["Patient Care", "Clinical Assessment", "IV Therapy", "BLS Certified", "Electronic Medical Records"],
    source: "direct",
    stretchFlag: false,
    successRate: 72,
    interviewTip: "Clinical panel interview — expect scenario questions on patient deterioration. SBAR communication framework is expected.",
  },
  {
    id: "jl_19",
    title: "Supply Chain Executive",
    company: "Nestlé Malaysia",
    category: "Logistics",
    location: "Shah Alam, Selangor",
    mode: "onsite",
    type: "full-time",
    salaryMin: 4500,
    salaryMax: 7000,
    postedAt: "5 days ago",
    description:
      "Coordinate end-to-end supply chain operations — from vendor management to distribution scheduling. You will optimise inventory levels and support the logistics team in achieving on-time delivery targets.",
    requirements: [
      "Degree in Supply Chain, Logistics, or Business",
      "1–3 years in FMCG or manufacturing supply chain",
      "Proficient in SAP or equivalent ERP system",
    ],
    skills: ["SAP", "Inventory Management", "Vendor Management", "Logistics Planning", "Excel / Power BI"],
    source: "jobstreet",
    stretchFlag: false,
    successRate: 64,
    interviewTip: "Case study round — be ready to walk through a supply disruption scenario and how you'd resolve it.",
  },
  {
    id: "jl_20",
    title: "Junior Accounts Executive",
    company: "KPMG Malaysia",
    category: "Accounting",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 3500,
    salaryMax: 5500,
    postedAt: "2 weeks ago",
    description:
      "Support audit and assurance engagements for mid-cap Malaysian companies. Gain exposure to financial reporting standards, regulatory requirements, and client management under senior oversight.",
    requirements: [
      "Pursuing or completed ACCA / ICPA / MICPA",
      "Fresh graduate or up to 2 years audit experience",
      "Strong Excel and report-writing skills",
    ],
    skills: ["Financial Reporting", "Audit", "Excel", "MFRS", "Client Communication"],
    source: "direct",
    stretchFlag: false,
    successRate: 66,
    interviewTip: "Competency-based interview. Expect 'give me an example of a time you dealt with ambiguity' — have two stories ready.",
  },
];

// Pre-baked mock applications (Stage 1 seed data shown on /candidate/applications)
export const mockApplications: ApplicationRecord[] = [
  {
    id: "app_1",
    jobId: "jl_03",
    jobTitle: "React Developer (Remote)",
    company: "Setel Ventures",
    location: "Remote (MY)",
    mode: "remote",
    salaryMin: 5500,
    salaryMax: 7000,
    appliedAt: "8 Jun 2026",
    status: "reviewing",
    coverNote: "I'm particularly excited about the remote-first culture and the opportunity to work on a product used by millions of Malaysians daily.",
  },
  {
    id: "app_2",
    jobId: "jl_07",
    jobTitle: "Data Analyst",
    company: "Petronas Digital",
    location: "Kuala Lumpur",
    mode: "onsite",
    salaryMin: 5000,
    salaryMax: 8000,
    appliedAt: "5 Jun 2026",
    status: "shortlisted",
  },
  {
    id: "app_3",
    jobId: "jl_12",
    jobTitle: "Full-Stack Engineer (Next.js)",
    company: "FPX",
    location: "Remote (MY)",
    mode: "remote",
    salaryMin: 7000,
    salaryMax: 11000,
    appliedAt: "2 Jun 2026",
    status: "interview",
    coverNote: "Strong Next.js experience from my current role — I've shipped 3 production apps using the App Router.",
  },
  {
    id: "app_4",
    jobId: "jl_04",
    jobTitle: "Backend Engineer (Node.js)",
    company: "AirAsia Superapp",
    location: "Kuala Lumpur",
    mode: "hybrid",
    salaryMin: 6500,
    salaryMax: 9000,
    appliedAt: "28 May 2026",
    status: "rejected",
  },
];

// Employer's own posted jobs (used on /employer/jobs)
export const employerJobPostings: EmployerJobPosting[] = [
  {
    id: "emp_j1",
    title: "Frontend Developer (React)",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 5500,
    salaryMax: 8000,
    postedAt: "5 days ago",
    isActive: true,
    applicantCount: 12,
    description:
      "Build customer-facing React applications for our flagship product.",
    requirements: ["2+ years React", "TypeScript", "REST APIs"],
    skills: ["React", "TypeScript", "Git"],
    applicants: [
      { id: "a1", name: "Nurul Ain bt Rosli", currentRole: "Junior Developer", yearsExp: 2, matchScore: 89, status: "shortlisted", appliedAt: "2 days ago" },
      { id: "a2", name: "Haziq bin Hamdan", currentRole: "TVET Graduate", yearsExp: 1, matchScore: 76, status: "reviewing", appliedAt: "3 days ago" },
      { id: "a3", name: "Puteri Alia Zahra", currentRole: "Freelance Developer", yearsExp: 2, matchScore: 84, status: "new", appliedAt: "1 day ago" },
      { id: "a4", name: "Aiman Hakimi", currentRole: "Junior Frontend Dev", yearsExp: 1, matchScore: 71, status: "new", appliedAt: "4 hours ago" },
    ],
  },
  {
    id: "emp_j2",
    title: "Full-Stack Engineer",
    category: "Technology",
    location: "Kuala Lumpur",
    mode: "hybrid",
    type: "full-time",
    salaryMin: 7000,
    salaryMax: 10000,
    postedAt: "2 weeks ago",
    isActive: true,
    applicantCount: 7,
    description:
      "Own features end-to-end across Next.js frontend and Node.js backend.",
    requirements: ["3+ years full-stack", "Node.js", "PostgreSQL"],
    skills: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    applicants: [
      { id: "b1", name: "Ahmad Faris bin Azman", currentRole: "Junior Software Engineer", yearsExp: 2, matchScore: 81, status: "shortlisted", appliedAt: "1 week ago" },
      { id: "b2", name: "Siti Hajar bt Kamaruddin", currentRole: "Mid-level Developer", yearsExp: 3, matchScore: 88, status: "shortlisted", appliedAt: "5 days ago" },
    ],
  },
  {
    id: "emp_j3",
    title: "UI/UX Designer",
    category: "Design",
    location: "Kuala Lumpur",
    mode: "onsite",
    type: "full-time",
    salaryMin: 4500,
    salaryMax: 7000,
    postedAt: "3 weeks ago",
    isActive: false,
    applicantCount: 9,
    description:
      "Design digital experiences across our product suite.",
    requirements: ["3+ years UX/UI", "Figma", "Portfolio required"],
    skills: ["Figma", "User Research", "Prototyping"],
    applicants: [
      { id: "c1", name: "Farhana Zulaikha", currentRole: "UI Designer", yearsExp: 3, matchScore: 92, status: "shortlisted", appliedAt: "2 weeks ago" },
    ],
  },
];
