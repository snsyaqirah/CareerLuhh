// CareerLuhh Knowledge Base — the Malaysian-market corpus that agents
// "retrieve" from (RAG). Stage 1: static docs. Stage 2: these become vector-
// indexed documents queried live before each agent reasons, so outputs stay
// grounded in local market data instead of hallucinated.

export interface KBDoc {
  id: string;
  source: string; // document the snippet was retrieved from
  category: string;
  snippet: string; // the retrieved passage shown in the RAG trace
}

export const KB_DOCS: KBDoc[] = [
  {
    id: "kb_salary_react_kl",
    source: "my-salary-benchmarks.json",
    category: "Compensation",
    snippet: "React Developer · Kuala Lumpur · 2yr exp → RM5,000–7,500 (median RM6,200)",
  },
  {
    id: "kb_skill_demand",
    source: "my-skill-demand-2026.json",
    category: "Market Signal",
    snippet: "Next.js + TypeScript demand ↑34% YoY across KL product companies (Q1 2026)",
  },
  {
    id: "kb_muet_cefr",
    source: "cert-equivalence-map.json",
    category: "Credentials",
    snippet: "MUET Band 4 → CEFR B2 (Upper Intermediate) · SKM Tahap 3 → EQF Level 4",
  },
  {
    id: "kb_col_kl",
    source: "cost-of-living-my.json",
    category: "Cost of Living",
    snippet: "Kuala Lumpur monthly: RM1,500–2,750 total (rent, transport, food)",
  },
  {
    id: "kb_col_tier2",
    source: "cost-of-living-my.json",
    category: "Cost of Living",
    snippet: "Alor Setar / Tier-2 cities monthly: RM700–1,200 total",
  },
  {
    id: "kb_intern_absorption",
    source: "employer-absorption-rates.json",
    category: "Internships",
    snippet: "Maybank IT internship → 70% intern-to-full-time conversion (2025 cohort)",
  },
  {
    id: "kb_automation_risk",
    source: "automation-risk-index.json",
    category: "Workforce",
    snippet: "Manual QA → High risk (12–18mo) · Data Entry → Very High (6–12mo)",
  },
  {
    id: "kb_trajectory_priors",
    source: "hiring-outcome-priors.json",
    category: "Talent",
    snippet: "Self-taught devs w/ 3+ deployed projects match 2 prior successful junior hires",
  },
];

export const kbDoc = (id: string) => KB_DOCS.find((d) => d.id === id)!;
