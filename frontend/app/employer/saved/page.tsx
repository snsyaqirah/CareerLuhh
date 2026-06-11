import Link from "next/link";
import { Search, StickyNote } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { shortlist } from "@/lib/mock-data/employer";

const STATUS_STYLE: Record<string, string> = {
  watching: "agent-badge-idle",
  contacted: "agent-badge-running",
  interviewing: "agent-badge-complete",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-blue">Talent Shortlist</p>
          <h1 className="text-heading mb-2">
            Saved Candidates<span className="text-red">.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium text-ink/60">
            Candidates you&apos;re tracking — The Scout keeps watching their
            trajectory and flags meaningful changes.
          </p>
        </div>
        <Link href="/employer/search" className="btn-blue px-4 py-2 text-xs">
          <Search size={14} /> Find more
        </Link>
      </div>

      <div className="space-y-6">
        {shortlist.map((c) => (
          <AgentCard
            key={c.candidateId}
            agentName={`Trajectory ${c.trajectoryScore}`}
            codeName={`Added ${c.addedAt}`}
            accent={c.status === "interviewing" ? "blue" : c.status === "contacted" ? "yellow" : "red"}
            className="card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black uppercase">{c.name}</h2>
                <p className="font-bold text-blue">{c.currentRole}</p>
              </div>
              <span className={STATUS_STYLE[c.status]}>{c.status}</span>
            </div>
            <p className="mt-3 flex items-start gap-2 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
              <StickyNote size={15} className="mt-0.5 shrink-0 text-red" />
              {c.notes}
            </p>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
