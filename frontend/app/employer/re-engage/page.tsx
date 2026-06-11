"use client";

import { useState } from "react";
import { MailOpen, Clock, Sparkles, Send } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { warmlist, reEngagement } from "@/lib/mock-data/employer";

export default function ReEngagePage() {
  const [selected, setSelected] = useState(warmlist[0].id);
  const candidate = warmlist.find((w) => w.id === selected)!;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">The Diplomat · ReEngagementAgent</p>
      <h1 className="text-heading mb-2">
        The Warmlist<span className="text-yellow">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        The best hire is often someone you already said no to — for reasons that
        no longer apply. The Diplomat tracks them and drafts the re-opener.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Warmlist */}
        <div className="space-y-4">
          {warmlist.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id)}
              className={`card-sm w-full text-left transition-all ${
                selected === w.id ? "bg-yellow" : "card-hover bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-black uppercase">{w.name}</p>
                  <p className="text-sm font-bold text-blue">{w.lastRole}</p>
                </div>
                {w.priority === "high" && <span className="agent-badge-alert">High</span>}
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ink/50">
                <Clock size={11} className="mr-1 inline" />
                Last contact {w.lastContact} · {w.rejectionReason}
              </p>
              <p className="mt-1 border-l-4 border-red pl-2 text-xs font-semibold">
                Matches: {w.matchedOpening}
              </p>
            </button>
          ))}
        </div>

        {/* Draft */}
        <AgentCard agentName="The Diplomat" codeName="Draft ready" status="complete" accent="blue">
          <p className="mb-1 text-label text-ink/50">Re-engaging</p>
          <p className="mb-4 text-xl font-black uppercase">{candidate.name}</p>
          <p className="border-2 border-ink bg-canvas px-4 py-2 text-sm font-black">
            Subject: {reEngagement.subjectLine.replace("[Company]", "TechNova")}
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-ink/70">
            {reEngagement.messageDraft.replace("[Name]", candidate.name.split(" ")[0])}
          </p>
          <p className="mt-4 flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-semibold text-ink/60">
            <Sparkles size={12} className="mt-0.5 shrink-0" /> {reEngagement.sendTiming}
          </p>
          <div className="mt-5 flex gap-3">
            <button className="btn-blue px-4 py-2 text-xs">
              <Send size={13} /> Send (demo)
            </button>
            <button className="btn-white px-4 py-2 text-xs">
              <MailOpen size={13} /> Edit draft
            </button>
          </div>
        </AgentCard>
      </div>
    </div>
  );
}
