"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, FileText, Check, ArrowRight, Sparkles } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { parsedResume } from "@/lib/mock-data/candidate";

type Phase = "upload" | "parsing" | "done";

const PARSE_STEPS = [
  "Reading PDF structure…",
  "Extracting work experience…",
  "Mapping skills to market taxonomy…",
  "Building your living Career Profile…",
];

export default function CandidateOnboarding() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [parseStep, setParseStep] = useState(0);

  function startParse() {
    // Stage 1: fake the OCR pipeline with a stepped animation
    setPhase("parsing");
    PARSE_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setParseStep(i);
        if (i === PARSE_STEPS.length - 1) setTimeout(() => setPhase("done"), 700);
      }, i * 700);
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-label mb-1 text-blue">The Clerk · ResumeOCRAgent</p>
      <h1 className="text-heading mb-2">
        Drop your resume<span className="text-red">.</span>
      </h1>
      <p className="mb-8 max-w-xl text-sm font-medium text-ink/60">
        The Clerk parses it into a structured Career Profile — no retyping your
        history into yet another job site form.
      </p>

      {phase === "upload" && (
        <button
          onClick={startParse}
          className="card card-hover flex w-full flex-col items-center gap-4 border-dashed py-16"
        >
          <span className="border-2 border-ink bg-yellow p-4">
            <Upload size={28} />
          </span>
          <span className="text-xl font-black uppercase">Upload resume (PDF)</span>
          <span className="text-sm font-medium text-ink/50">
            Demo mode — click anywhere in this box to parse a sample resume
          </span>
        </button>
      )}

      {phase === "parsing" && (
        <div className="card py-12">
          <div className="mx-auto max-w-sm space-y-4">
            <span className="agent-badge-running animate-pulse">
              <Sparkles size={13} /> The Clerk is working
            </span>
            {PARSE_STEPS.map((s, i) => (
              <p
                key={s}
                className={`flex items-center gap-2 text-sm font-bold ${
                  i < parseStep ? "text-ink" : i === parseStep ? "text-blue" : "text-ink/30"
                }`}
              >
                {i < parseStep ? <Check size={15} className="text-blue" /> : <FileText size={15} />}
                {s}
              </p>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div>
          <AgentCard agentName="The Clerk" codeName="Parse complete" status="complete" accent="blue">
            <h2 className="mb-1 text-xl font-black uppercase">{parsedResume.name}</h2>
            <p className="mb-5 text-sm font-bold text-blue">
              {parsedResume.currentRole} · {parsedResume.yearsExp} yrs · {parsedResume.location}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-label mb-2 text-ink/50">Skills detected</p>
                <div className="flex flex-wrap gap-2">
                  {parsedResume.skills.map((s) => (
                    <span key={s} className="border-2 border-ink bg-yellow px-2 py-0.5 text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-label mb-2 text-ink/50">Latest experience</p>
                <p className="text-sm font-black">{parsedResume.experience[0].role}</p>
                <p className="text-sm font-medium text-ink/60">
                  {parsedResume.experience[0].company} · {parsedResume.experience[0].duration}
                </p>
              </div>
            </div>
            <p className="mt-5 border-l-4 border-blue pl-3 text-sm font-semibold text-ink/70">
              Nothing invented, nothing inferred — The Clerk only extracts what&apos;s
              actually in the document. Missing fields stay empty.
            </p>
          </AgentCard>
          <Link href="/candidate/dashboard" className="btn-red mt-6">
            Continue to Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
