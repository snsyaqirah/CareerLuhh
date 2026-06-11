"use client";

import { useState } from "react";
import { MapPin, Clock, Banknote, TrendingUp, ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { internships } from "@/lib/mock-data/student";

export default function InternshipsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

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
        {internships.map((i) => {
          const isOpen = expanded === i.id;
          return (
            <AgentCard
              key={i.id}
              agentName={`${i.matchScore}% match`}
              codeName={i.matchScore >= 85 ? "Strong fit" : "Worth exploring"}
              status={i.matchScore >= 85 ? "complete" : "running"}
              accent={i.matchScore >= 85 ? "blue" : "yellow"}
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
                  <span className="flex items-center gap-2 text-ink/70">
                    <MapPin size={14} /> {i.location} · {i.mode}
                  </span>
                  <span className="flex items-center gap-2 text-ink/70">
                    <Clock size={14} /> {i.duration} months
                  </span>
                  <span className="flex items-center gap-2 text-ink/70">
                    <Banknote size={14} /> RM{i.allowance}/month
                  </span>
                </div>
              </div>

              {/* Expand / collapse */}
              <button
                onClick={() => setExpanded(isOpen ? null : i.id)}
                className="mt-4 flex w-full items-center justify-between border-t border-ink/10 pt-3 text-xs font-black uppercase tracking-wide text-blue hover:text-blue/70"
              >
                <span>{isOpen ? "Hide details" : "View full details"}</span>
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {isOpen && (
                <div className="mt-4 space-y-4 border-t-2 border-ink pt-4">
                  {/* Description */}
                  {i.description && (
                    <div>
                      <p className="text-label mb-2">About this internship</p>
                      <p className="text-sm font-medium leading-relaxed text-ink/70">{i.description}</p>
                    </div>
                  )}

                  {/* Requirements */}
                  {i.requirements && i.requirements.length > 0 && (
                    <div>
                      <p className="text-label mb-2">What they&apos;re looking for</p>
                      <ul className="space-y-1.5">
                        {i.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm font-medium text-ink/70">
                            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {i.skills && i.skills.length > 0 && (
                    <div>
                      <p className="text-label mb-2">Skills they want</p>
                      <div className="flex flex-wrap gap-1.5">
                        {i.skills.map((s) => (
                          <span key={s} className="border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="btn-yellow px-5 py-2 text-xs">
                      Apply (demo)
                    </button>
                    {i.url && (
                      <a
                        href={i.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 border-2 border-ink px-4 py-2 text-xs font-black uppercase hover:bg-canvas"
                      >
                        <ExternalLink size={12} /> View listing
                      </a>
                    )}
                  </div>
                </div>
              )}
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
