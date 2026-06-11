"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CalendarRange,
  Lightbulb,
  UserPlus,
  Copy,
  Check,
  Eye,
  TrendingUp,
  Calculator,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { workforcePlan, retentionAlerts } from "@/lib/mock-data/employer";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlannerInput {
  headcount: string;
  industry: string;
  avgAge: string;
  attritionPct: string;
  retirementPct: string;
  criticalRoles: string;
}

interface YearProjection {
  year: number;
  attritionLoss: number;
  retirementLoss: number;
  netGrowth: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, string> = {
  High: "bg-red text-white",
  "Very High": "bg-ink text-white",
  Medium: "bg-yellow text-ink",
};

const RISK_BADGE: Record<string, string> = {
  high: "bg-red text-white",
  medium: "bg-yellow text-ink",
  low: "bg-blue/10 text-blue border-2 border-blue",
};

function computeProjections(inputs: PlannerInput): YearProjection[] | null {
  const hc = parseInt(inputs.headcount);
  const attrition = parseFloat(inputs.attritionPct) / 100;
  const retirement = parseFloat(inputs.retirementPct) / 100;
  if (!hc || isNaN(attrition) || isNaN(retirement)) return null;

  let current = hc;
  return [1, 2, 3, 4, 5].map((yr) => {
    const attrLoss = Math.round(current * attrition);
    const retLoss = Math.round(current * retirement);
    const net = current - attrLoss - retLoss;
    current = net;
    return { year: yr, attritionLoss: attrLoss, retirementLoss: retLoss, netGrowth: net };
  });
}

function plannerRecommendations(inputs: PlannerInput, projections: YearProjection[]): string[] {
  const attrition = parseFloat(inputs.attritionPct);
  const critical = parseInt(inputs.criticalRoles) || 0;
  const year5 = projections[4];
  const recs: string[] = [];

  if (attrition > 20) recs.push("High attrition rate — audit exit interview data and run The Watcher for early retention signals.");
  if (critical > 3) recs.push(`${critical} critical roles flagged. Build succession plans now — these take 6–12 months to fill.`);
  if (year5.netGrowth < parseInt(inputs.headcount) * 0.7)
    recs.push("Year 5 projects a 30%+ workforce reduction. Start hiring pipeline now, not when seats are empty.");
  recs.push("Invite existing staff to CareerLuhh so The Watcher can surface retention signals before resignation.");
  if (inputs.industry === "tech" || inputs.industry === "finance")
    recs.push("High-demand sector — candidates have leverage. Competitive salary benchmarks matter more than perks.");
  return recs;
}

// ─── Invite Staff mock data ───────────────────────────────────────────────────

const INVITE_CODE = "TECHNOVA-2026";
const LINKED_STAFF = [
  { id: "emp_003", name: "Siti Hajar bt Kamaruddin", role: "Mid-level Developer", joinedAt: "2 weeks ago", consent: true },
  { id: "emp_007", name: "Farid bin Nordin", role: "Data Analyst", joinedAt: "1 month ago", consent: true },
  { id: "emp_011", name: "Priya Nair", role: "UX Designer", joinedAt: "3 weeks ago", consent: true },
];
const PENDING_INVITES = [
  { email: "ali.hassan@technova.my", sentAt: "2 days ago" },
  { email: "sarah.lim@technova.my", sentAt: "5 days ago" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InviteSection() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(INVITE_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AgentCard agentName="Invite Staff" codeName="Platform Onboarding" accent="blue">
      <p className="mb-4 text-sm font-medium text-ink/60">
        Invite your current team to CareerLuhh. Once they join and consent, The Watcher can surface
        career signals — so you can act before anyone sends a resignation letter.
      </p>

      {/* Consent note */}
      <div className="mb-4 flex items-start gap-2 border-2 border-blue bg-blue/5 p-3">
        <Shield size={14} className="mt-0.5 shrink-0 text-blue" />
        <p className="text-xs font-semibold text-ink/70">
          Staff control their own data. CareerLuhh only shares activity signals with your company after
          explicit consent — per PDPA 2010. They can revoke access at any time from their settings.
        </p>
      </div>

      {/* Invite code */}
      <div className="mb-5">
        <p className="text-label mb-2">Company Invite Code</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 border-2 border-ink bg-canvas px-4 py-2.5 font-black uppercase tracking-widest text-ink">
            {INVITE_CODE}
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 border-2 border-ink bg-blue px-4 py-2.5 text-xs font-black uppercase text-white hover:bg-blue/80"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-1.5 text-xs font-medium text-ink/40">
          Share this code with your team. They enter it during CareerLuhh registration to link their
          account to your company.
        </p>
      </div>

      {/* Pending invites */}
      {PENDING_INVITES.length > 0 && (
        <div className="mb-5">
          <p className="text-label mb-2">Pending Invites ({PENDING_INVITES.length})</p>
          <div className="space-y-2">
            {PENDING_INVITES.map((inv) => (
              <div key={inv.email} className="flex items-center justify-between border border-ink/20 px-3 py-2">
                <span className="text-sm font-medium">{inv.email}</span>
                <span className="text-[10px] font-bold text-ink/40 uppercase">Sent {inv.sentAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Linked staff */}
      <div>
        <p className="text-label mb-2">Linked Staff ({LINKED_STAFF.length})</p>
        <div className="space-y-2">
          {LINKED_STAFF.map((s) => (
            <div key={s.id} className="flex items-center justify-between border-2 border-ink p-3">
              <div>
                <p className="font-bold">{s.name}</p>
                <p className="text-xs font-medium text-ink/50">{s.role}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-ink/40 uppercase">Joined {s.joinedAt}</span>
                {s.consent && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase text-blue">
                    <Check size={10} /> Signals shared
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AgentCard>
  );
}

function WatcherSection() {
  const [scriptOpen, setScriptOpen] = useState<Record<string, boolean>>({});

  return (
    <AgentCard agentName="The Watcher" codeName="RetentionSignalAgent" status="alert" accent="red">
      <p className="mb-1 text-sm font-medium text-ink/60">
        Platform-internal signals only — activity staff generate on CareerLuhh after consenting to share
        data with your company. No external scraping.
      </p>
      <p className="mb-5 text-xs font-medium text-ink/40">
        Signals update in real time. Risk scores are based on signal intensity + pattern over 30 days.
      </p>

      <div className="space-y-5">
        {retentionAlerts.map((a) => {
          const key = a.employeeId;
          const scriptVisible = scriptOpen[key];
          return (
            <div key={key} className="border-2 border-ink">
              {/* Person header */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b-2 border-ink bg-canvas p-4">
                <div>
                  <p className="font-black uppercase">{a.name}</p>
                  <p className="text-xs font-bold text-ink/50">{a.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase ${
                      RISK_BADGE[a.riskLevel]
                    }`}
                  >
                    {a.riskLevel === "high" && <AlertTriangle size={10} />}
                    {a.riskLevel.charAt(0).toUpperCase() + a.riskLevel.slice(1)} risk
                  </span>
                  <span className="border-2 border-ink px-2 py-0.5 text-[10px] font-black">
                    {a.riskScore}/100
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Signals */}
                <p className="mb-2 text-[10px] font-black uppercase text-ink/40 flex items-center gap-1">
                  <Eye size={10} /> Platform activity signals
                </p>
                <ul className="mb-4 space-y-1.5">
                  {a.signals.map((sig) => (
                    <li key={sig} className="flex items-start gap-2 text-sm font-medium text-ink/70">
                      <TrendingUp size={12} className="mt-0.5 shrink-0 text-red" /> {sig}
                    </li>
                  ))}
                </ul>

                {/* Recommended action */}
                <p className="mb-3 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
                  {a.recommendedAction}
                </p>

                {/* Suggested script */}
                <button
                  onClick={() => setScriptOpen((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className="text-[11px] font-bold uppercase text-blue hover:underline flex items-center gap-1"
                >
                  <UserPlus size={11} />
                  {scriptVisible ? "Hide" : "Show"} suggested conversation script
                </button>

                {scriptVisible && (
                  <p className="mt-2 border-l-4 border-yellow bg-yellow/5 p-3 text-sm font-medium italic text-ink/70">
                    &ldquo;{a.suggestedScript}&rdquo;
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AgentCard>
  );
}

function PlannerSection() {
  const [inputs, setInputs] = useState<PlannerInput>({
    headcount: "",
    industry: "",
    avgAge: "",
    attritionPct: "",
    retirementPct: "",
    criticalRoles: "",
  });
  const [projections, setProjections] = useState<YearProjection[] | null>(null);
  const [expanded, setExpanded] = useState(false);

  function handleChange(field: keyof PlannerInput, value: string) {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setProjections(null);
  }

  function runPlanner() {
    const result = computeProjections(inputs);
    setProjections(result);
    if (result) setExpanded(true);
  }

  const recs = projections ? plannerRecommendations(inputs, projections) : [];

  return (
    <AgentCard agentName="Resilience Planner" codeName="WorkforceAgent" accent="yellow">
      <p className="mb-1 text-sm font-medium text-ink/60">
        Enter aggregate company data — no individual staff details required. The Planner projects your
        workforce size over 5 years and gives AI-backed recommendations for workforce sustainability.
      </p>
      <p className="mb-5 text-xs font-medium text-ink/40">
        All inputs are aggregate figures. No PII, no individual staff data processed here.
      </p>

      {/* Input form */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-bauhaus">Total Headcount</label>
          <input
            type="number"
            min={1}
            placeholder="e.g. 45"
            value={inputs.headcount}
            onChange={(e) => handleChange("headcount", e.target.value)}
            className="input-bauhaus w-full"
          />
        </div>
        <div>
          <label className="label-bauhaus">Industry</label>
          <select
            value={inputs.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className="input-bauhaus w-full"
          >
            <option value="">Select industry</option>
            <option value="tech">Technology / Software</option>
            <option value="finance">Banking & Finance</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="label-bauhaus">Average Staff Age</label>
          <input
            type="number"
            min={18}
            max={70}
            placeholder="e.g. 32"
            value={inputs.avgAge}
            onChange={(e) => handleChange("avgAge", e.target.value)}
            className="input-bauhaus w-full"
          />
        </div>
        <div>
          <label className="label-bauhaus">Annual Attrition Rate (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            placeholder="e.g. 15"
            value={inputs.attritionPct}
            onChange={(e) => handleChange("attritionPct", e.target.value)}
            className="input-bauhaus w-full"
          />
        </div>
        <div>
          <label className="label-bauhaus">Expected Retirement Rate / yr (%)</label>
          <input
            type="number"
            min={0}
            max={30}
            placeholder="e.g. 3"
            value={inputs.retirementPct}
            onChange={(e) => handleChange("retirementPct", e.target.value)}
            className="input-bauhaus w-full"
          />
        </div>
        <div>
          <label className="label-bauhaus">Number of Critical / Hard-to-Fill Roles</label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 4"
            value={inputs.criticalRoles}
            onChange={(e) => handleChange("criticalRoles", e.target.value)}
            className="input-bauhaus w-full"
          />
        </div>
      </div>

      <button
        onClick={runPlanner}
        className="mt-5 flex items-center gap-2 border-2 border-ink bg-ink px-5 py-2.5 text-sm font-black uppercase text-white hover:bg-blue"
      >
        <Calculator size={15} /> Run Resilience Planner
      </button>

      {/* Results */}
      {projections && (
        <div className="mt-6">
          {/* 5-year projection table */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mb-3 flex w-full items-center justify-between border-2 border-ink bg-canvas px-4 py-2.5 text-sm font-black uppercase"
          >
            <span className="flex items-center gap-2"><CalendarRange size={14} /> 5-Year Workforce Projection</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="mb-4 border-2 border-ink overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-ink bg-ink text-white">
                    <th className="px-4 py-2 text-left text-xs font-black uppercase">Year</th>
                    <th className="px-4 py-2 text-right text-xs font-black uppercase">Attrition Loss</th>
                    <th className="px-4 py-2 text-right text-xs font-black uppercase">Retirement Loss</th>
                    <th className="px-4 py-2 text-right text-xs font-black uppercase">Net Headcount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {projections.map((p) => (
                    <tr key={p.year} className={p.year === 5 ? "bg-red/5 font-bold" : ""}>
                      <td className="px-4 py-2 font-bold">Year {p.year}</td>
                      <td className="px-4 py-2 text-right text-red font-medium">−{p.attritionLoss}</td>
                      <td className="px-4 py-2 text-right text-ink/50 font-medium">−{p.retirementLoss}</td>
                      <td className="px-4 py-2 text-right font-black">{p.netGrowth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-4 py-2 text-[10px] font-medium text-ink/40 border-t border-ink/10">
                Projection assumes no new hires. Add your planned hiring pace to adjust.
              </p>
            </div>
          )}

          {/* Recommendations */}
          {recs.length > 0 && (
            <div>
              <p className="text-label mb-3 flex items-center gap-1.5"><Lightbulb size={13} className="text-yellow" /> AI Recommendations</p>
              <ul className="space-y-2">
                {recs.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-yellow" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </AgentCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const RISK_COLOR_TABLE: Record<string, string> = RISK_COLOR;

export default function WorkforcePage() {
  const [tab, setTab] = useState<"watcher" | "planner" | "strategy">("watcher");

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-red">WorkforceAgent</p>
      <h1 className="text-heading mb-2">
        Workforce Intelligence<span className="text-blue">.</span>
      </h1>
      <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
        Invite your team, surface retention signals, and plan your workforce 5 years out — all without
        touching individual staff data.
      </p>

      {/* Invite Staff — always visible */}
      <div className="mb-8">
        <InviteSection />
      </div>

      {/* Tab nav */}
      <div className="mb-6 flex flex-wrap border-2 border-ink">
        {(
          [
            { id: "watcher", label: "The Watcher", labelFull: "The Watcher · Retention Signals" },
            { id: "planner", label: "Planner", labelFull: "Resilience Planner" },
            { id: "strategy", label: "Strategy", labelFull: "Workforce Strategy" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 border-b-2 border-r-2 border-ink px-3 py-2.5 text-xs font-black uppercase last:border-r-0 sm:border-b-0 ${
              tab === t.id ? "bg-ink text-white" : "hover:bg-canvas"
            }`}
          >
            <span className="sm:hidden">{t.label}</span>
            <span className="hidden sm:inline">{t.labelFull}</span>
          </button>
        ))}
      </div>

      {tab === "watcher" && <WatcherSection />}

      {tab === "planner" && <PlannerSection />}

      {tab === "strategy" && (
        <div className="space-y-8">
          <AgentCard agentName="The Strategist" codeName="WorkforceAgent" status="alert" accent="red">
            <p className="text-lg font-bold leading-snug">{workforcePlan.summary}</p>
          </AgentCard>

          <div className="grid gap-8 md:grid-cols-2">
            <AgentCard agentName="At-risk roles" codeName="Automation outlook" accent="red">
              <div className="space-y-3">
                {workforcePlan.riskRoles.map((r) => (
                  <div key={r.role} className="flex items-center justify-between gap-3 border-2 border-ink p-3">
                    <div>
                      <p className="font-black uppercase">{r.role}</p>
                      <p className="text-xs font-bold text-ink/50">{r.timeline}</p>
                    </div>
                    <span className={`agent-badge ${RISK_COLOR_TABLE[r.automationRisk] ?? "bg-canvas"}`}>
                      <AlertTriangle size={11} /> {r.automationRisk}
                    </span>
                  </div>
                ))}
              </div>
            </AgentCard>

            <AgentCard agentName="Quarterly plan" codeName="Next 2 quarters" accent="blue">
              <div className="space-y-3">
                {workforcePlan.quarterlyPlan.map((q) => (
                  <div key={q.quarter} className="border-2 border-ink p-3">
                    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue">
                      <CalendarRange size={13} /> {q.quarter}
                    </p>
                    <p className="mt-1 font-bold">{q.action}</p>
                    <p className="text-sm font-medium text-ink/60">{q.cost}</p>
                  </div>
                ))}
              </div>
            </AgentCard>
          </div>

          <AgentCard agentName="Recommendations" codeName="The Strategist" accent="yellow">
            <ul className="grid gap-3 md:grid-cols-3">
              {workforcePlan.recommendations.map((r) => (
                <li key={r} className="flex items-start gap-2 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
                  <Lightbulb size={15} className="mt-0.5 shrink-0 text-red" />
                  {r}
                </li>
              ))}
            </ul>
          </AgentCard>
        </div>
      )}
    </div>
  );
}
