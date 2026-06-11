import { ArrowRight, Globe2, Copy } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { skorAlignments } from "@/lib/mock-data/student";

export default function QualificationsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-red">The Translator · SkorAlignAgent</p>
      <h1 className="text-heading mb-2">
        Your Quals, Globally Readable<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        MUET, SKM, STPM — Malaysian credentials that international HR systems
        don&apos;t recognise. The Translator converts them into language employers
        anywhere can parse, ready to paste into your resume.
      </p>

      <div className="space-y-6">
        {skorAlignments.map((q) => (
          <AgentCard
            key={q.localCert}
            agentName={q.category}
            codeName="SkorAlignAgent"
            accent={q.category === "Language" ? "blue" : q.category === "Academic" ? "red" : "yellow"}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="border-2 border-ink bg-canvas px-3 py-1.5 text-sm font-black uppercase">
                {q.localCert}
              </span>
              <ArrowRight size={18} className="text-red" />
              <span className="border-2 border-ink bg-blue px-3 py-1.5 text-sm font-black uppercase text-white">
                {q.globalEquivalent}
              </span>
            </div>
            <div className="flex items-start gap-2 border-2 border-ink bg-canvas p-4">
              <Globe2 size={16} className="mt-0.5 shrink-0 text-blue" />
              <div>
                <p className="text-label mb-1 text-ink/50">How employers will read it</p>
                <p className="text-sm font-semibold leading-relaxed">{q.employerDescription}</p>
              </div>
            </div>
            <button className="btn-white mt-4 px-4 py-2 text-xs">
              <Copy size={13} /> Copy for resume (demo)
            </button>
          </AgentCard>
        ))}
      </div>
    </div>
  );
}
