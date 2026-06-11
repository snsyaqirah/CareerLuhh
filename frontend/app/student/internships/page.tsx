import { MapPin, Clock, Banknote, TrendingUp } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { internships } from "@/lib/mock-data/student";

export default function InternshipsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-red">The Recruiter · InternMatchAgent</p>
      <h1 className="text-heading mb-2">
        Matched Internships<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Ranked by fit with your profile — including absorption rate, because an
        internship that converts to a job beats one that doesn&apos;t.
      </p>

      <div className="space-y-6">
        {internships.map((i) => (
          <AgentCard
            key={i.id}
            agentName={`${i.matchScore}% match`}
            codeName={i.matchScore >= 85 ? "Strong fit" : "Worth exploring"}
            status={i.matchScore >= 85 ? "complete" : "running"}
            accent={i.matchScore >= 85 ? "blue" : "yellow"}
            className="card-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <h2 className="text-xl font-black uppercase">{i.title}</h2>
                <p className="mb-3 font-bold text-blue">{i.company}</p>
                <p className="text-sm font-medium text-ink/70">{i.matchReason}</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-red">
                  <TrendingUp size={14} /> {i.absorptionRate}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-bold">
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> {i.location} · {i.mode}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} /> {i.duration} months
                </span>
                <span className="flex items-center gap-2">
                  <Banknote size={14} /> RM{i.allowance}/month
                </span>
                <button className="btn-yellow mt-2 px-4 py-2 text-xs">Apply (demo)</button>
              </div>
            </div>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
