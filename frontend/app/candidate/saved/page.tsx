"use client";

import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Banknote,
  Briefcase,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { jobListings } from "@/lib/mock-data/jobs";

const MY_SKILLS = ["React", "TypeScript", "JavaScript", "Next.js", "Node.js", "CSS", "Git"];

function fmtSalary(min: number, max: number) {
  return `RM${(min / 1000).toFixed(0)}k – RM${(max / 1000).toFixed(0)}k`;
}

const MODE_COLOR: Record<string, string> = {
  remote: "bg-yellow text-ink",
  hybrid: "bg-canvas text-ink border border-ink",
  onsite: "bg-blue text-white",
};

export default function SavedJobsPage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("saved_jobs") ?? "[]")); }
    catch { return new Set(); }
  });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const savedJobs = jobListings.filter((j) => savedIds.has(j.id));

  function unsave(id: string) {
    const next = new Set(savedIds);
    next.delete(id);
    setSavedIds(next);
    localStorage.setItem("saved_jobs", JSON.stringify([...next]));
    if (expanded === id) setExpanded(null);
    setToastMsg("Removed from saved jobs");
    setTimeout(() => setToastMsg(null), 2000);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-label mb-1 text-blue">Saved Jobs</p>
      <h1 className="text-heading mb-2">
        Your Shortlist<span className="text-red">.</span>
      </h1>
      <p className="mb-6 text-sm font-medium text-ink/60">
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}. Click any card to see full details.{" "}
        <a href="/candidate/jobs" className="font-bold text-blue underline underline-offset-2">Browse more jobs →</a>
      </p>

      {savedJobs.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
          <Bookmark size={40} className="text-ink/20" />
          <p className="font-black uppercase">No saved jobs yet</p>
          <p className="max-w-xs text-sm font-medium text-ink/50">
            Click the bookmark icon on any job card to save it here for later.
          </p>
          <a href="/candidate/jobs" className="btn-blue">Browse Jobs</a>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => {
            const isOpen = expanded === job.id;
            const gap = job.skills.filter((s) => !MY_SKILLS.includes(s));
            const have = job.skills.filter((s) => MY_SKILLS.includes(s));

            return (
              <div key={job.id} className="card border-2 border-ink">
                {/* Card header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {job.category}
                      </span>
                      <span className={`border-2 border-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${MODE_COLOR[job.mode] ?? ""}`}>
                        {job.mode}
                      </span>
                    </div>
                    <h2 className="text-lg font-black uppercase leading-tight">{job.title}</h2>
                    <p className="font-bold text-blue">{job.company}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-ink/50">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Banknote size={11} /> {fmtSalary(job.salaryMin, job.salaryMax)}</span>
                      <span>Posted {job.postedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => unsave(job.id)}
                      title="Remove from saved"
                      className="border-2 border-ink bg-yellow p-2 hover:bg-red hover:text-white transition-colors"
                    >
                      <BookmarkCheck size={16} />
                    </button>
                  </div>
                </div>

                {/* AI match score if available */}
                {job.matchScore && (
                  <div className="mt-3 flex items-center gap-2">
                    <Bot size={13} className="text-blue" />
                    <span className="text-sm font-bold text-blue">{job.matchScore}% AI match</span>
                    {job.successRate && (
                      <span className="text-xs font-medium text-ink/40">· {job.successRate}% of similar candidates got interviews</span>
                    )}
                  </div>
                )}

                {/* Skills preview */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className={`border px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        MY_SKILLS.includes(s)
                          ? "border-blue bg-blue/5 text-blue"
                          : "border-ink/20 text-ink/50"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                  className="mt-3 flex w-full items-center justify-between border-t border-ink/10 pt-3 text-xs font-black uppercase tracking-wide text-ink/50 hover:text-blue"
                >
                  <span>{isOpen ? "Hide details" : "View full details"}</span>
                  {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="mt-4 space-y-5 border-t-2 border-ink pt-4">
                    {/* Description */}
                    <div>
                      <p className="text-label mb-2">About this role</p>
                      <p className="text-sm font-medium leading-relaxed text-ink/70">{job.description}</p>
                    </div>

                    {/* Requirements */}
                    {job.requirements.length > 0 && (
                      <div>
                        <p className="text-label mb-2">Requirements</p>
                        <ul className="space-y-1.5">
                          {job.requirements.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm font-medium text-ink/70">
                              <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills gap */}
                    {(have.length > 0 || gap.length > 0) && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {have.length > 0 && (
                          <div className="border-2 border-blue bg-blue/5 p-3">
                            <p className="text-label mb-2 text-blue">You have</p>
                            <div className="flex flex-wrap gap-1.5">
                              {have.map((s) => (
                                <span key={s} className="flex items-center gap-1 border-2 border-blue bg-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase text-blue">
                                  <CheckCircle2 size={9} /> {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {gap.length > 0 && (
                          <div className="border-2 border-ink bg-canvas p-3">
                            <p className="text-label mb-2 text-red">Skills gap</p>
                            <div className="flex flex-wrap gap-1.5">
                              {gap.map((s) => (
                                <span key={s} className="border-2 border-ink/30 px-2 py-0.5 text-[10px] font-bold uppercase text-ink/60">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interview tip */}
                    {job.interviewTip && (
                      <div className="flex items-start gap-2 border-2 border-ink bg-ink p-3 text-white">
                        <Bot size={14} className="mt-0.5 shrink-0 text-yellow" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-yellow/80 mb-1">Interview tip</p>
                          <p className="text-sm font-medium text-white/80">{job.interviewTip}</p>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3">
                      <a href="/candidate/jobs" className="flex items-center gap-2 border-2 border-ink bg-blue px-5 py-2.5 text-xs font-black uppercase text-white hover:bg-blue/80">
                        <Briefcase size={13} /> Apply on Job Board
                      </a>
                      <button
                        onClick={() => unsave(job.id)}
                        className="flex items-center gap-1.5 border-2 border-ink px-4 py-2.5 text-xs font-black uppercase hover:bg-red hover:text-white hover:border-red"
                      >
                        <X size={12} /> Remove from saved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-between border-t-2 border-ink pt-4">
            <p className="text-xs font-medium text-ink/50">
              {savedJobs.length} saved · data stored locally
            </p>
            <button
              onClick={() => {
                setSavedIds(new Set());
                localStorage.removeItem("saved_jobs");
                setToastMsg("Cleared all saved jobs");
                setTimeout(() => setToastMsg(null), 2000);
              }}
              className="flex items-center gap-1 text-xs font-bold text-red hover:underline"
            >
              <X size={12} /> Clear all saved
            </button>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 border-4 border-ink bg-ink px-5 py-3 font-black uppercase text-white shadow-hard-md">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
