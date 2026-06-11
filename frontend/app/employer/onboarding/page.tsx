import { MessageCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { newHires } from "@/lib/mock-data/employer";

function riskMeta(score: number) {
  if (score >= 60) return { label: "High risk", style: "agent-badge-alert", accent: "red" as const };
  if (score >= 30) return { label: "Watch", style: "agent-badge-running", accent: "yellow" as const };
  return { label: "On track", style: "agent-badge-complete", accent: "blue" as const };
}

export default function OnboardingTrackerPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-yellow">The Buddy · OnboardingAgent</p>
      <h1 className="text-heading mb-2">
        New Hire Tracker<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Most quiet quitting starts in the first 90 days. The Buddy reads early
        signals and tells managers when (and how) to check in — before the
        resignation letter, not after.
      </p>

      <div className="space-y-6">
        {newHires.map((h) => {
          const risk = riskMeta(h.riskScore);
          return (
            <AgentCard
              key={h.id}
              agentName={`Day ${h.day}`}
              codeName={`${h.role}`}
              status={h.riskScore >= 60 ? "alert" : h.riskScore >= 30 ? "running" : "complete"}
              accent={risk.accent}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black uppercase">{h.name}</h2>
                  <p className="text-sm font-bold text-ink/50">
                    Risk score {h.riskScore}/100
                  </p>
                </div>
                <span className={risk.style}>{risk.label}</span>
              </div>

              {h.flags.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {h.flags.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium text-ink/70">
                      <AlertTriangle size={13} className="shrink-0 text-red" /> {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink/70">
                  <CheckCircle2 size={13} className="shrink-0 text-blue" /> No warning signals
                </p>
              )}

              <p className="mt-4 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
                {h.managerAction}
              </p>
              <p className="mt-3 flex items-start gap-2 border-l-4 border-yellow pl-2 text-sm font-medium italic text-ink/60">
                <MessageCircle size={14} className="mt-0.5 shrink-0" />
                &ldquo;{h.conversationStarter}&rdquo;
              </p>
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
