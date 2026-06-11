// The Planner (LokalRouteAgent) — city vs salary trade-off view.
// Shared between /student/lokal and /candidate/lokal.

import { MapPin, Wifi, Building } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { lokalScenarios } from "@/lib/mock-data/student";

function ScenarioBar({ gross, col, net }: { gross: number; col: number; net: number }) {
  const colPct = (col / gross) * 100;
  return (
    <div>
      <div className="flex h-9 border-2 border-ink">
        <div
          className="flex items-center justify-center bg-red text-[10px] font-black uppercase text-white"
          style={{ width: `${colPct}%` }}
        >
          Cost
        </div>
        <div className="flex flex-1 items-center justify-center bg-blue text-[10px] font-black uppercase text-white">
          Keep
        </div>
      </div>
      <div className="mt-1.5 flex justify-between text-xs font-bold">
        <span className="text-red">−RM{col.toLocaleString()} living</span>
        <span className="text-blue">RM{net.toLocaleString()}/mo stays yours</span>
      </div>
    </div>
  );
}

export function LokalPlanner() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-yellow">The Planner · LokalRouteAgent</p>
      <h1 className="text-heading mb-2">
        Lokal Route<span className="text-red">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        A KL salary isn&apos;t a KL life. The Planner runs gross salary minus real
        cost of living so you compare what you actually keep — not what the
        offer letter says.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {lokalScenarios.scenarios.map((s) => (
          <AgentCard
            key={s.city}
            agentName={s.mode === "remote" ? "Remote" : "Onsite"}
            codeName={`RM${s.grossSalary.toLocaleString()} gross`}
            status={s.mode === "remote" ? "complete" : "idle"}
            accent={s.mode === "remote" ? "blue" : "red"}
          >
            <p className="mb-1 flex items-center gap-2 text-xl font-black uppercase">
              {s.mode === "remote" ? <Wifi size={18} /> : <Building size={18} />}
              {s.city}
            </p>
            <p className="mb-4 text-sm font-bold text-ink/50">
              <MapPin size={12} className="mr-1 inline" />
              {s.verdict}
            </p>
            <ScenarioBar gross={s.grossSalary} col={s.costOfLiving} net={s.netDisposable} />
            <p className="mt-4 border-2 border-ink bg-canvas px-3 py-2 text-center">
              <span className="text-label text-ink/50">Net disposable</span>
              <span className="block text-3xl font-black">
                RM{s.netDisposable.toLocaleString()}
              </span>
            </p>
          </AgentCard>
        ))}
      </div>

      <div className="card mt-8 bg-yellow">
        <p className="text-label mb-2">The Planner recommends</p>
        <p className="text-lg font-bold leading-snug">{lokalScenarios.recommendation}</p>
      </div>
    </div>
  );
}
