"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Search, Lightbulb, ArrowDown, ArrowUp, Bot, Database } from "lucide-react";
import type { Role } from "@/lib/auth-context";
import { PIPELINES, type AgentStep } from "@/lib/orchestration";
import { useOrchestration, type StepStatus } from "@/lib/use-orchestration";
import { KB_DOCS, kbDoc } from "@/lib/mock-data/knowledge-base";
import { CoachChat } from "@/components/orchestration/CoachChat";

const ACCENT_BG = { blue: "bg-blue", red: "bg-red", yellow: "bg-yellow" };

function statusBadge(s: StepStatus) {
  if (s === "running") return "agent-badge-running";
  if (s === "complete") return "agent-badge-complete";
  return "agent-badge-idle";
}

// Animated bar that fills 0→100% over the agent's duration while it runs.
function ProgressBar({ durationMs, active }: { durationMs: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (active) {
      setW(0);
      const raf = requestAnimationFrame(() => setW(100));
      return () => cancelAnimationFrame(raf);
    }
    setW(0);
  }, [active]);
  return (
    <div className="h-1.5 w-full border border-ink bg-white">
      <div
        className="h-full bg-blue"
        style={{ width: `${w}%`, transition: active ? `width ${durationMs}ms linear` : "none" }}
      />
    </div>
  );
}

function chip(text: string) {
  return (
    <span
      key={text}
      className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
    >
      {text}
    </span>
  );
}

function StepCard({ step, status }: { step: AgentStep; status: StepStatus }) {
  const open = status !== "idle";
  return (
    <div
      className={`card-sm border-2 transition-all ${
        status === "running"
          ? "shadow-hard"
          : status === "complete"
            ? "bg-white"
            : "bg-white opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-8 w-8 shrink-0 border-2 border-ink ${ACCENT_BG[step.accent]}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black uppercase leading-tight">{step.agentName}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
            {step.codeName}
          </p>
        </div>
        <span className={statusBadge(status)}>
          {status === "running" ? (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-ink" /> running
            </>
          ) : status === "complete" ? (
            "done"
          ) : (
            "queued"
          )}
        </span>
      </div>

      {status === "running" && (
        <div className="mt-3">
          <ProgressBar durationMs={step.durationMs} active />
        </div>
      )}

      {open && (
        <div className="mt-3 space-y-3 border-t-2 border-dashed border-ink/20 pt-3">
          {/* reads */}
          {step.reads.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <ArrowDown size={12} className="text-blue" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
                reads
              </span>
              {step.reads.map(chip)}
            </div>
          )}

          {/* RAG retrieval */}
          {step.kbRefs.length > 0 && (
            <div className="border-2 border-ink bg-canvas p-2.5">
              <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/50">
                <Search size={12} /> Retrieved from knowledge base
              </p>
              {step.kbRefs.map((id) => {
                const d = kbDoc(id);
                return (
                  <p key={id} className="text-xs font-semibold leading-snug">
                    📚 <span className="text-blue">{d.source}</span> — {d.snippet}
                  </p>
                );
              })}
            </div>
          )}

          {/* reasoning */}
          <p className="flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-medium text-ink/70">
            <Lightbulb size={12} className="mt-0.5 shrink-0" /> {step.reasoning}
          </p>

          {/* writes */}
          {status === "complete" && (
            <div className="flex flex-wrap items-center gap-1.5">
              <ArrowUp size={12} className="text-red" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
                wrote to memory
              </span>
              {Object.entries(step.writes).map(([k, v]) =>
                chip(`${k}: ${Array.isArray(v) ? v.length : v}`)
              )}
            </div>
          )}

          {/* structured output */}
          {status === "complete" && (
            <details className="border-2 border-ink">
              <summary className="cursor-pointer bg-ink px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                View structured output (JSON)
              </summary>
              <pre className="max-h-52 overflow-auto bg-[#0d0d0d] p-3 text-[11px] leading-relaxed text-green-300">
                {JSON.stringify(step.output, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

function MemoryPanel({
  profile,
  prevKeys,
}: {
  profile: Record<string, string | number | boolean | string[]>;
  prevKeys: React.MutableRefObject<Set<string>>;
}) {
  const entries = Object.entries(profile);
  return (
    <div className="card sticky top-24">
      <div className="mb-3 flex items-center gap-2">
        <Database size={16} />
        <p className="font-black uppercase leading-tight">Career Profile</p>
      </div>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-ink/50">
        Shared memory · every agent reads & writes here
      </p>
      <div className="space-y-1.5">
        {entries.map(([k, v]) => {
          const isNew = !prevKeys.current.has(k);
          return (
            <div
              key={k}
              className={`flex items-start justify-between gap-3 border-l-4 px-2 py-1 text-xs ${
                isNew ? "border-yellow bg-yellow/20" : "border-ink/20"
              }`}
            >
              <span className="font-bold uppercase tracking-wide text-ink/60">{k}</span>
              <span className="text-right font-black">
                {Array.isArray(v) ? v.join(", ") : String(v)}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-ink/40">
        {entries.length} fields · grows as agents complete
      </p>
    </div>
  );
}

export function AgentConsole({ role }: { role: Role }) {
  const pipeline = PIPELINES[role];
  const { status, profile, running, done, run } = useOrchestration(pipeline);

  // track which profile keys existed last render so new ones can flash
  const prevKeys = useRef<Set<string>>(new Set(Object.keys(pipeline.seed)));
  useEffect(() => {
    prevKeys.current = new Set(Object.keys(profile));
  });

  const completed = Object.values(status).filter((s) => s === "complete").length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-blue">Multi-Agent Orchestration</p>
          <h1 className="text-heading mb-2">
            Agent Console<span className="text-red">.</span>
          </h1>
          <p className="max-w-2xl text-sm font-medium text-ink/60">
            Watch {pipeline.steps.length} specialised agents run as a pipeline —
            each retrieves from the knowledge base, reasons, and writes to one
            shared Career Profile. Trigger: <b>{pipeline.trigger}</b>.
          </p>
        </div>
        <button onClick={run} disabled={running} className="btn-red px-5 py-2.5 text-xs">
          <Sparkles size={14} className={running ? "animate-pulse" : ""} />
          {running ? "Running…" : done ? "Re-run pipeline" : "Run pipeline"}
        </button>
      </div>

      {/* status bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 border-2 border-ink bg-white p-3">
        <span className={running ? "agent-badge-running" : done ? "agent-badge-complete" : "agent-badge-idle"}>
          <Bot size={13} />
          {running ? "Pipeline running" : done ? "Pipeline complete" : "Idle"}
        </span>
        <div className="h-1.5 flex-1 border border-ink bg-white">
          <div
            className="h-full bg-blue transition-all duration-300"
            style={{ width: `${(completed / pipeline.steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black uppercase tracking-wider">
          {completed}/{pipeline.steps.length} agents
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* pipeline */}
        <div className="space-y-3">
          {pipeline.steps.map((step) => (
            <StepCard key={step.id} step={step} status={status[step.id] ?? "idle"} />
          ))}
        </div>

        {/* shared memory + KB index */}
        <div className="space-y-6">
          <MemoryPanel profile={profile} prevKeys={prevKeys} />

          <details className="card-sm">
            <summary className="flex cursor-pointer items-center gap-2 font-black uppercase">
              <Search size={15} /> Knowledge Base · {KB_DOCS.length} docs
            </summary>
            <p className="mb-3 mt-2 text-[11px] font-bold uppercase tracking-wider text-ink/50">
              The grounding corpus agents retrieve from (RAG)
            </p>
            <div className="space-y-2">
              {KB_DOCS.map((d) => (
                <div key={d.id} className="border-l-4 border-blue pl-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue">
                    {d.source} · {d.category}
                  </p>
                  <p className="text-xs font-semibold">{d.snippet}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* conversational layer */}
      <div className="mt-8">
        <CoachChat role={role} profile={profile} ready={done} />
      </div>
    </div>
  );
}
