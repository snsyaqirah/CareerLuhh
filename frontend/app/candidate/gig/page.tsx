"use client";

import { useState } from "react";
import { ArrowDown, Sparkles, Copy, Recycle } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { gigConversions } from "@/lib/mock-data/candidate";

export default function GigBridgePage() {
  const conversion = gigConversions[0];
  const [input, setInput] = useState(conversion.original);
  const [converted, setConverted] = useState(false);
  const [working, setWorking] = useState(false);

  function convert() {
    // Stage 1: fake the agent call with a short delay
    setWorking(true);
    setConverted(false);
    setTimeout(() => {
      setWorking(false);
      setConverted(true);
    }, 1200);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-label mb-1 text-red">The Converter · GigBridgeAgent</p>
      <h1 className="text-heading mb-2">
        Gig Work Counts<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        2 years of Grab deliveries is logistics operations experience — most
        resumes just never say it that way. The Converter rewrites gig history
        into credentials HR systems respect.
      </p>

      <AgentCard agentName="Your gig experience" codeName="Plain words in" accent="yellow">
        <textarea
          className="input-bauhaus min-h-[90px] resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={convert} className="btn-red mt-4 px-5 py-2 text-xs" disabled={working}>
          {working ? (
            <>
              <Sparkles size={14} className="animate-pulse" /> Converting…
            </>
          ) : (
            <>
              <Recycle size={14} /> Convert to professional credential
            </>
          )}
        </button>
      </AgentCard>

      {converted && (
        <>
          <div className="my-5 flex justify-center">
            <span className="border-2 border-ink bg-yellow p-2">
              <ArrowDown size={18} />
            </span>
          </div>

          <AgentCard agentName="The Converter" codeName="Resume-ready out" status="complete" accent="blue">
            <p className="text-sm font-semibold leading-relaxed">{conversion.converted}</p>
            <p className="text-label mb-2 mt-5 text-ink/50">Skills extracted</p>
            <div className="flex flex-wrap gap-2">
              {conversion.skillsExtracted.map((s) => (
                <span key={s} className="border-2 border-ink bg-yellow px-2 py-0.5 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
            <button className="btn-white mt-5 px-4 py-2 text-xs">
              <Copy size={13} /> Copy to resume (demo)
            </button>
          </AgentCard>
        </>
      )}
    </div>
  );
}
