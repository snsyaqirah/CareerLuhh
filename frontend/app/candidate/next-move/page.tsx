import { Shield, TrendingUp, Rocket, GraduationCap } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { nextMoves } from "@/lib/mock-data/candidate";

const MOVE_META: Record<string, { icon: React.ReactNode; accent: "blue" | "yellow" | "red" }> = {
  safe: { icon: <Shield size={22} />, accent: "blue" },
  growth: { icon: <TrendingUp size={22} />, accent: "yellow" },
  bold: { icon: <Rocket size={22} />, accent: "red" },
};

export default function NextMovePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-label mb-1 text-blue">The Navigator · NextMoveAgent</p>
      <h1 className="text-heading mb-2">
        Your Next 3 Moves<span className="text-yellow">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Every career fork has a safe lane, a growth lane, and a bold one. The
        Navigator maps all three from your actual profile — with the upskilling
        bill for each.
      </p>

      <div className="grid gap-8 lg:grid-cols-3">
        {nextMoves.map((m) => {
          const meta = MOVE_META[m.type];
          return (
            <AgentCard
              key={m.type}
              agentName={m.label}
              codeName={m.timeline}
              accent={meta.accent}
              className="card-hover flex flex-col"
            >
              <span
                className={`mb-4 inline-flex w-fit border-2 border-ink p-3 ${
                  m.type === "safe"
                    ? "bg-blue text-white"
                    : m.type === "growth"
                      ? "bg-yellow text-ink"
                      : "bg-red text-white"
                }`}
              >
                {meta.icon}
              </span>
              <h2 className="mb-1 text-xl font-black uppercase leading-tight">{m.role}</h2>
              <p className="mb-4 text-2xl font-black text-blue">{m.salaryRange}</p>
              <p className="mb-5 text-sm font-medium leading-relaxed text-ink/70">{m.reason}</p>
              <div className="mt-auto">
                <p className="text-label mb-2 flex items-center gap-1.5 text-ink/50">
                  <GraduationCap size={13} /> Upskill first
                </p>
                <ul className="space-y-1.5">
                  {m.upskilling.map((u) => (
                    <li key={u} className="border-l-4 border-yellow pl-2 text-sm font-semibold">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
