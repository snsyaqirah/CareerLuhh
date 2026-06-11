import { AlertTriangle, CalendarRange, Lightbulb } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { workforcePlan } from "@/lib/mock-data/employer";

const RISK_COLOR: Record<string, string> = {
  High: "bg-red text-white",
  "Very High": "bg-ink text-white",
  Medium: "bg-yellow text-ink",
};

export default function WorkforcePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-red">The Strategist · WorkforceAgent</p>
      <h1 className="text-heading mb-2">
        Workforce Plan<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        18-month automation risk and hiring strategy for your team.
      </p>

      <AgentCard agentName="The Strategist" codeName="WorkforceAgent" status="alert" accent="red">
        <p className="text-lg font-bold leading-snug">{workforcePlan.summary}</p>
      </AgentCard>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Risk roles */}
        <AgentCard agentName="At-risk roles" codeName="Automation outlook" accent="red">
          <div className="space-y-3">
            {workforcePlan.riskRoles.map((r) => (
              <div key={r.role} className="flex items-center justify-between gap-3 border-2 border-ink p-3">
                <div>
                  <p className="font-black uppercase">{r.role}</p>
                  <p className="text-xs font-bold text-ink/50">{r.timeline}</p>
                </div>
                <span className={`agent-badge ${RISK_COLOR[r.automationRisk] ?? "bg-soft"}`}>
                  <AlertTriangle size={11} /> {r.automationRisk}
                </span>
              </div>
            ))}
          </div>
        </AgentCard>

        {/* Quarterly plan */}
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

      <div className="mt-8">
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
    </div>
  );
}
