"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  X,
  CheckCircle2,
  Bot,
  Zap,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getGuideForPath, type PageGuide } from "@/lib/demo-guide";

interface Props {
  pathname: string;
  portalColor?: "blue" | "red" | "yellow";
}

export function DemoGuide({ pathname, portalColor = "yellow" }: Props) {
  const [open, setOpen] = useState(false);
  const [stage2Open, setStage2Open] = useState(false);
  const guide = getGuideForPath(pathname);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!guide) return null;

  const accentBg = portalColor === "blue" ? "bg-blue" : portalColor === "red" ? "bg-red" : "bg-yellow";
  const accentText = portalColor === "yellow" ? "text-ink" : "text-white";

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open page guide"
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 border-4 border-ink px-3 py-2.5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_#121212] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none md:bottom-8 md:right-8 ${accentBg} ${accentText}`}
      >
        <BookOpen size={14} />
        <span className="hidden sm:inline">Page Guide</span>
        <span className="sm:hidden">?</span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-4 md:items-center md:justify-center"
          style={{ backgroundColor: "rgba(18,18,18,0.6)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="relative flex max-h-[90dvh] w-full max-w-lg flex-col border-4 border-ink bg-white shadow-[8px_8px_0_#121212]">
            {/* Header */}
            <div className={`border-b-4 border-ink px-5 py-4 ${accentBg} ${accentText}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    Stage 1 · Page Guide
                  </p>
                  <h2 className="text-lg font-black uppercase leading-tight">
                    {guide.title}
                  </h2>
                  <p className={`text-sm font-semibold ${portalColor === "yellow" ? "text-ink/70" : "text-white/80"}`}>
                    {guide.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className={`shrink-0 border-2 p-1.5 transition-colors ${
                    portalColor === "yellow"
                      ? "border-ink/40 hover:bg-ink hover:text-white"
                      : "border-white/40 hover:bg-white hover:text-ink"
                  }`}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Description */}
              <p className="mb-5 text-sm font-medium leading-relaxed text-ink/70">
                {guide.description}
              </p>

              {/* Features */}
              <div className="mb-5">
                <p className="text-label mb-3 flex items-center gap-1.5 text-ink">
                  <CheckCircle2 size={13} /> What&apos;s built
                </p>
                <ul className="space-y-2">
                  {guide.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 border-2 border-ink/10 bg-canvas px-3 py-2 text-sm font-medium"
                    >
                      <CheckCircle2
                        size={13}
                        className="mt-0.5 shrink-0 text-blue"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agents */}
              {guide.agents && guide.agents.length > 0 && (
                <div className="mb-5">
                  <p className="text-label mb-3 flex items-center gap-1.5 text-ink">
                    <Bot size={13} /> AI Agents on this page
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {guide.agents.map((a) => (
                      <span
                        key={a}
                        className="border-2 border-ink bg-canvas px-2.5 py-1 text-xs font-black uppercase"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage 1 mock note */}
              {guide.mockNote && (
                <div className="mb-5 flex items-start gap-2 border-2 border-yellow bg-yellow/10 p-3">
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-ink" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-ink/50 mb-0.5">
                      Stage 1 · Mock data
                    </p>
                    <p className="text-xs font-semibold text-ink/70">{guide.mockNote}</p>
                  </div>
                </div>
              )}

              {/* Stage 2 plans */}
              {guide.stage2Plans && guide.stage2Plans.length > 0 && (
                <div>
                  <button
                    onClick={() => setStage2Open((v) => !v)}
                    className="mb-2 flex w-full items-center justify-between border-2 border-ink/20 bg-canvas px-3 py-2 text-xs font-black uppercase tracking-wider hover:bg-ink/5"
                  >
                    <span className="flex items-center gap-1.5">
                      <Zap size={12} /> Stage 2 roadmap
                    </span>
                    {stage2Open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  {stage2Open && (
                    <ul className="space-y-1.5">
                      {guide.stage2Plans.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 border border-ink/10 px-3 py-2 text-xs font-medium text-ink/60"
                        >
                          <Zap size={11} className="mt-0.5 shrink-0 text-blue" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t-4 border-ink bg-ink px-5 py-3">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/50">
                CareerLuhh · Talentbank First Cohort Tech Hackathon 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
