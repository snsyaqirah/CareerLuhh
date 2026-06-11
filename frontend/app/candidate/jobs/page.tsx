import { MapPin, Banknote, Zap } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { jobMatches } from "@/lib/mock-data/candidate";

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">The Broker · JobMatchAgent</p>
      <h1 className="text-heading mb-2">
        Job Matches<span className="text-red">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Matched by trajectory, not keywords — each card explains{" "}
        <span className="font-bold text-ink">why</span> it fits and flags stretch
        roles worth the risk.
      </p>

      <div className="space-y-6">
        {jobMatches.map((j) => (
          <AgentCard
            key={j.id}
            agentName={`${j.matchScore}% match`}
            codeName={`via ${j.source}`}
            status={j.matchScore >= 90 ? "complete" : "running"}
            accent={j.stretchFlag ? "red" : "blue"}
            className="card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black uppercase">{j.title}</h2>
                  {j.stretchFlag && (
                    <span className="agent-badge-alert">
                      <Zap size={11} /> Stretch role
                    </span>
                  )}
                </div>
                <p className="mb-3 font-bold text-blue">{j.company}</p>
                <p className="text-sm font-medium text-ink/70">{j.matchReason}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-bold">
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> {j.location} · {j.mode}
                </span>
                <span className="flex items-center gap-2">
                  <Banknote size={14} /> {j.salaryRange}
                </span>
                <button className="btn-blue mt-2 px-4 py-2 text-xs">Apply (demo)</button>
              </div>
            </div>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
