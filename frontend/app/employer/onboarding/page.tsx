"use client";

import { useState } from "react";
import {
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  UserCheck,
  XCircle,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { newHires } from "@/lib/mock-data/employer";

type CheckInStatus = "pending" | "done" | "skipped";

interface CheckIn {
  day: 30 | 60 | 90;
  label: string;
  focus: string;
  script: string;
}

const CHECK_IN_SCHEDULE: CheckIn[] = [
  {
    day: 30,
    label: "Day 30 — First Month Check-in",
    focus: "Role clarity, early wins, support gaps",
    script:
      "How is the role matching what you expected? What's something you've already figured out on your own that you're proud of? And honestly — what do you still feel unclear about?",
  },
  {
    day: 60,
    label: "Day 60 — Integration Check-in",
    focus: "Team dynamics, confidence, workload",
    script:
      "Two months in — are you finding your rhythm? Is the workload manageable, or are there areas where you feel stretched? What would make your day-to-day easier?",
  },
  {
    day: 90,
    label: "Day 90 — Direction Check-in",
    focus: "Growth trajectory, motivation, next goals",
    script:
      "You've been here 90 days — that's a real milestone. Where do you feel most energised? And where do you want to go from here? I want to make sure we're building a path together.",
  },
];

function riskMeta(score: number) {
  if (score >= 60) return { label: "High risk", style: "agent-badge-alert", accent: "red" as const };
  if (score >= 30) return { label: "Watch", style: "agent-badge-running", accent: "yellow" as const };
  return { label: "On track", style: "agent-badge-complete", accent: "blue" as const };
}

function dayProgress(currentDay: number) {
  const pct = Math.min((currentDay / 90) * 100, 100);
  return pct;
}

export default function OnboardingTrackerPage() {
  const [checkIns, setCheckIns] = useState<Record<string, Record<number, CheckInStatus>>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [scriptOpen, setScriptOpen] = useState<Record<string, boolean>>({});

  function markCheckIn(hireId: string, day: number, status: CheckInStatus) {
    setCheckIns((prev) => ({
      ...prev,
      [hireId]: { ...(prev[hireId] ?? {}), [day]: status },
    }));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleScript(key: string) {
    setScriptOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-yellow">The Buddy · OnboardingAgent</p>
      <h1 className="text-heading mb-2">
        Manager Check-in Scheduler<span className="text-blue">.</span>
      </h1>
      <p className="mb-2 max-w-2xl text-sm font-medium text-ink/60">
        Most quiet quitting starts in the first 90 days — and most managers miss the window.
        The Buddy reminds you when to check in, what to focus on, and gives you a suggested
        conversation script so the meeting actually lands.
      </p>
      <p className="mb-8 max-w-2xl text-xs font-medium text-ink/40">
        Risk scores are based on missed check-ins + manager-reported quality at each milestone.
        Not behavioural surveillance — just structured follow-through.
      </p>

      <div className="space-y-6">
        {newHires.map((h) => {
          const risk = riskMeta(h.riskScore);
          const hireCheckIns = checkIns[h.id] ?? {};
          const isExpanded = expanded[h.id] ?? false;
          const pct = dayProgress(h.day);

          return (
            <AgentCard
              key={h.id}
              agentName={`Day ${h.day}`}
              codeName={h.role}
              status={h.riskScore >= 60 ? "alert" : h.riskScore >= 30 ? "running" : "complete"}
              accent={risk.accent}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black uppercase">{h.name}</h2>
                  <p className="text-sm font-bold text-ink/50">{h.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={risk.style}>{risk.label}</span>
                  <span className="border-2 border-ink px-2 py-0.5 text-xs font-black">
                    {h.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[10px] font-bold uppercase text-ink/40">
                  <span>Day 1</span>
                  <span className="text-ink/70">Day {h.day} now</span>
                  <span>Day 90</span>
                </div>
                <div className="h-2 w-full border-2 border-ink bg-canvas">
                  <div
                    className="h-full bg-blue transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {[30, 60, 90].map((d) => {
                    const s = hireCheckIns[d];
                    return (
                      <div
                        key={d}
                        className="absolute -translate-x-1/2"
                        style={{ left: `${(d / 90) * 100}%` }}
                      >
                        <div
                          className={`mt-0.5 h-3 w-3 border-2 border-ink rounded-full ${
                            s === "done"
                              ? "bg-blue"
                              : s === "skipped"
                              ? "bg-ink/20"
                              : d <= h.day
                              ? "bg-yellow"
                              : "bg-canvas"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Signals */}
              {h.flags.length > 0 ? (
                <ul className="mt-5 space-y-1.5">
                  {h.flags.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium text-ink/70">
                      <AlertTriangle size={13} className="shrink-0 text-red" /> {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-ink/70">
                  <CheckCircle2 size={13} className="shrink-0 text-blue" /> No warning signals
                </p>
              )}

              {/* Manager action */}
              <p className="mt-4 border-2 border-ink bg-canvas p-3 text-sm font-semibold">
                {h.managerAction}
              </p>

              {/* Expand check-in schedule */}
              <button
                onClick={() => toggleExpand(h.id)}
                className="mt-4 flex w-full items-center justify-between border-2 border-ink bg-white px-4 py-2.5 text-sm font-black uppercase tracking-wider hover:bg-canvas"
              >
                <span className="flex items-center gap-2">
                  <Calendar size={14} /> Check-in Schedule
                </span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {isExpanded && (
                <div className="mt-0 border-2 border-t-0 border-ink divide-y divide-ink/10">
                  {CHECK_IN_SCHEDULE.map((ci) => {
                    const status = hireCheckIns[ci.day];
                    const isPast = ci.day <= h.day;
                    const scriptKey = `${h.id}-${ci.day}`;
                    const scriptVisible = scriptOpen[scriptKey];

                    return (
                      <div key={ci.day} className="p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-black uppercase text-sm">{ci.label}</p>
                            <p className="text-xs font-medium text-ink/50 mt-0.5">{ci.focus}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {status === "done" && (
                              <span className="flex items-center gap-1 text-xs font-black text-blue uppercase">
                                <UserCheck size={12} /> Done
                              </span>
                            )}
                            {status === "skipped" && (
                              <span className="flex items-center gap-1 text-xs font-black text-ink/40 uppercase">
                                <XCircle size={12} /> Skipped
                              </span>
                            )}
                            {!status && isPast && (
                              <span className="flex items-center gap-1 text-xs font-black text-yellow uppercase">
                                <Clock size={12} /> Due now
                              </span>
                            )}
                            {!status && !isPast && (
                              <span className="text-[10px] font-bold text-ink/30 uppercase">Upcoming</span>
                            )}
                          </div>
                        </div>

                        {/* Script toggle */}
                        <button
                          onClick={() => toggleScript(scriptKey)}
                          className="mt-2 text-[11px] font-bold uppercase text-blue hover:underline flex items-center gap-1"
                        >
                          <MessageCircle size={11} />
                          {scriptVisible ? "Hide" : "Show"} suggested script
                        </button>

                        {scriptVisible && (
                          <p className="mt-2 flex items-start gap-2 border-l-4 border-yellow bg-yellow/5 p-3 text-sm font-medium italic text-ink/70">
                            <MessageCircle size={14} className="mt-0.5 shrink-0 text-yellow" />
                            &ldquo;{ci.script}&rdquo;
                          </p>
                        )}

                        {/* Actions */}
                        {isPast && !status && (
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => markCheckIn(h.id, ci.day, "done")}
                              className="flex items-center gap-1.5 border-2 border-blue bg-blue px-3 py-1.5 text-xs font-black uppercase text-white hover:bg-blue/80"
                            >
                              <CheckCircle2 size={11} /> Mark done
                            </button>
                            <button
                              onClick={() => markCheckIn(h.id, ci.day, "skipped")}
                              className="flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 text-xs font-black uppercase hover:bg-canvas"
                            >
                              <XCircle size={11} /> Skip
                            </button>
                          </div>
                        )}
                        {status && (
                          <button
                            onClick={() =>
                              setCheckIns((prev) => {
                                const updated = { ...(prev[h.id] ?? {}) };
                                delete updated[ci.day];
                                return { ...prev, [h.id]: updated };
                              })
                            }
                            className="mt-3 text-[10px] font-bold text-ink/30 uppercase hover:text-ink/60 underline"
                          >
                            Undo
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </AgentCard>
          );
        })}
      </div>
    </div>
  );
}
