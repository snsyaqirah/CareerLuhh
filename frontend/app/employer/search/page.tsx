"use client";

import { useState } from "react";
import { Search, TrendingUp, Bookmark, Check } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { trajectoryMatches } from "@/lib/mock-data/employer";

export default function TalentSearchPage() {
  const [query, setQuery] = useState("React developer, junior to mid, KL or remote");
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">The Headhunter · TrajectoryMatchAgent</p>
      <h1 className="text-heading mb-2">
        Search by Trajectory<span className="text-yellow">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Keyword filters miss where people are <span className="font-bold text-ink">heading</span>.
        The Headhunter ranks candidates by growth curve, not just CV history.
      </p>

      {/* Search bar (demo — results are static) */}
      <div className="mb-8 flex gap-3">
        <input
          className="input-bauhaus flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe who you need…"
        />
        <button className="btn-blue px-5">
          <Search size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {trajectoryMatches.map((c) => (
          <AgentCard
            key={c.candidateId}
            agentName={`Trajectory ${c.trajectoryScore}`}
            codeName={`Readiness ${c.readinessScore}/100`}
            status={c.trajectoryScore >= 85 ? "complete" : "running"}
            accent={c.trajectoryScore >= 85 ? "blue" : "yellow"}
            className="card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <h2 className="text-xl font-black uppercase">{c.name}</h2>
                <p className="mb-3 font-bold text-blue">
                  {c.currentRole} · {c.university}
                </p>
                <p className="text-sm font-medium text-ink/70">{c.trajectorySummary}</p>
                <p className="mt-3 flex items-start gap-1.5 text-sm font-bold text-red">
                  <TrendingUp size={14} className="mt-0.5 shrink-0" /> {c.matchReason}
                </p>
              </div>
              <button
                onClick={() => toggleSave(c.candidateId)}
                className={saved.includes(c.candidateId) ? "btn-yellow px-4 py-2 text-xs" : "btn-white px-4 py-2 text-xs"}
              >
                {saved.includes(c.candidateId) ? (
                  <>
                    <Check size={14} /> Shortlisted
                  </>
                ) : (
                  <>
                    <Bookmark size={14} /> Shortlist
                  </>
                )}
              </button>
            </div>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
