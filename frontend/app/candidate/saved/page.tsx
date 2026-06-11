"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, MapPin, Banknote, Briefcase, X } from "lucide-react";
import { jobListings } from "@/lib/mock-data/jobs";

function fmtSalary(min: number, max: number) {
  return `RM${(min / 1000).toFixed(0)}k – RM${(max / 1000).toFixed(0)}k`;
}

export default function SavedJobsPage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("saved_jobs") ?? "[]")); }
    catch { return new Set(); }
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const savedJobs = jobListings.filter((j) => savedIds.has(j.id));

  function unsave(id: string) {
    const next = new Set(savedIds);
    next.delete(id);
    setSavedIds(next);
    localStorage.setItem("saved_jobs", JSON.stringify([...next]));
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
        {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}. Ready to apply? Go to{" "}
        <a href="/candidate/jobs" className="font-bold text-blue underline underline-offset-2">Job Board</a>.
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
          {savedJobs.map((job) => (
            <div key={job.id} className="card border-2 border-ink">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {job.category}
                    </span>
                    <span className="border-2 border-ink px-2 py-0.5 text-[10px] uppercase tracking-wider">
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
                  <a href="/candidate/jobs" className="btn-blue px-4 py-2 text-xs">
                    Apply <Briefcase size={12} />
                  </a>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <span key={s} className="border border-ink/20 px-1.5 py-0.5 text-[10px] font-bold uppercase">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

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
