"use client";

import { useState, useMemo } from "react";
import {
  MapPin,
  Banknote,
  Zap,
  Search,
  X,
  Briefcase,
  Check,
  SlidersHorizontal,
  Bot,
} from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import {
  jobListings,
  type JobListing,
  type JobCategory,
  type WorkMode,
  type ApplicationRecord,
} from "@/lib/mock-data/jobs";

const CATEGORIES: JobCategory[] = [
  "Technology",
  "Design",
  "Data",
  "Product",
  "Marketing",
  "Finance",
  "Operations",
];
const MODES: WorkMode[] = ["remote", "hybrid", "onsite"];

const APP_STATUS_LABEL: Record<ApplicationRecord["status"], string> = {
  applied: "Applied",
  reviewing: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

const APP_STATUS_COLOR: Record<ApplicationRecord["status"], string> = {
  applied: "bg-canvas text-ink",
  reviewing: "bg-yellow text-ink",
  shortlisted: "bg-blue text-white",
  interview: "bg-blue text-white",
  offer: "bg-blue text-white",
  rejected: "bg-red text-white",
};

function fmtSalary(min: number, max: number) {
  return `RM${(min / 1000).toFixed(0)}k – RM${(max / 1000).toFixed(0)}k`;
}

// ─── Apply Modal ───────────────────────────────────────────────────────────
function ApplyModal({
  job,
  onClose,
  onSubmit,
}: {
  job: JobListing;
  onClose: () => void;
  onSubmit: (coverNote: string) => void;
}) {
  const [coverNote, setCoverNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg border-4 border-ink bg-white shadow-hard-lg">
        <div className="flex items-center justify-between border-b-4 border-ink bg-blue px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">Applying for</p>
            <p className="font-black uppercase text-white">{job.title}</p>
            <p className="text-sm font-bold text-white/70">{job.company}</p>
          </div>
          <button onClick={onClose} className="border-2 border-white/40 p-1.5 text-white hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="label-bauhaus">Full Name</label>
            <input className="input-bauhaus" defaultValue="Ahmad Faris bin Azman" readOnly />
          </div>
          <div>
            <label className="label-bauhaus">Email</label>
            <input className="input-bauhaus" defaultValue="candidate@demo.com" readOnly />
          </div>
          <div>
            <label className="label-bauhaus">
              Cover Note{" "}
              <span className="font-normal normal-case tracking-normal text-ink/50">— optional</span>
            </label>
            <textarea
              className="input-bauhaus h-28 resize-none"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Tell them why you're a good fit — 2-3 sentences is enough"
            />
          </div>
          <p className="text-[11px] font-semibold text-ink/50">
            Stage 1: application stored locally. Stage 2: sent to employer + triggers ResumeOCRAgent to pre-fill your profile.
          </p>
        </div>

        <div className="flex gap-3 border-t-4 border-ink px-5 py-4">
          <button onClick={onClose} className="btn-ghost flex-1 py-2 text-xs">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(coverNote)}
            className="btn-blue flex-1 py-2 text-xs"
          >
            Submit Application <Briefcase size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────────────
function JobCard({
  job,
  applied,
  onApply,
  showMatch,
}: {
  job: JobListing;
  applied: boolean;
  onApply: (job: JobListing) => void;
  showMatch: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`card cursor-pointer transition-shadow hover:shadow-hard ${
        applied ? "border-blue/60" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              {job.category}
            </span>
            {showMatch && job.matchScore && (
              <span className="agent-badge bg-blue text-white">
                <Bot size={11} /> {job.matchScore}% match
              </span>
            )}
            {job.stretchFlag && (
              <span className="agent-badge-alert">
                <Zap size={11} /> Stretch
              </span>
            )}
            {applied && (
              <span className="agent-badge bg-blue text-white">
                <Check size={11} /> Applied
              </span>
            )}
          </div>
          <h2 className="text-lg font-black uppercase leading-tight">{job.title}</h2>
          <p className="font-bold text-blue">{job.company}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-sm font-bold">
          <span className="flex items-center gap-1.5 text-ink/70">
            <MapPin size={13} /> {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-ink/70">
            <Banknote size={13} /> {fmtSalary(job.salaryMin, job.salaryMax)}
          </span>
          <span className="rounded-full border-2 border-ink px-2 py-0.5 text-[10px] uppercase tracking-wider">
            {job.mode}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t-2 border-dashed border-ink/20 pt-4">
          <p className="text-sm font-medium text-ink/70">{job.description}</p>

          {showMatch && job.matchReason && (
            <p className="flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-semibold text-ink/70">
              <Bot size={12} className="mt-0.5 shrink-0 text-blue" />
              <span><span className="font-black text-blue">Why it fits:</span> {job.matchReason}</span>
            </p>
          )}

          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/50">
              Requirements
            </p>
            <ul className="space-y-1">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs font-semibold">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-ink" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <span key={s} className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-3">
            <p className="text-xs font-bold text-ink/40">Posted {job.postedAt} · via {job.source}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!applied) onApply(job);
              }}
              className={`px-4 py-2 text-xs ${applied ? "btn-ghost cursor-default" : "btn-blue"}`}
            >
              {applied ? <><Check size={13} /> Applied</> : <>Apply Now <Briefcase size={13} /></>}
            </button>
          </div>
        </div>
      )}

      {!expanded && (
        <p className="mt-3 text-xs font-bold text-ink/40">
          Click to expand · Posted {job.postedAt}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function JobsPage() {
  const [tab, setTab] = useState<"browse" | "matched">("browse");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<JobCategory | "">("");
  const [mode, setMode] = useState<WorkMode | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const [applyingTo, setApplyingTo] = useState<JobListing | null>(null);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      return new Set(JSON.parse(localStorage.getItem("applied_jobs") ?? "[]"));
    } catch {
      return new Set();
    }
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  function submitApplication(job: JobListing, coverNote: string) {
    const next = new Set([...appliedIds, job.id]);
    setAppliedIds(next);
    localStorage.setItem("applied_jobs", JSON.stringify([...next]));
    setApplyingTo(null);
    setToastMsg(`Application sent to ${job.company}!`);
    setTimeout(() => setToastMsg(null), 3500);
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return jobListings.filter((j) => {
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q));
      const matchCat = !category || j.category === category;
      const matchMode = !mode || j.mode === mode;
      return matchQ && matchCat && matchMode;
    });
  }, [query, category, mode]);

  const matchedJobs = jobListings.filter((j) => j.matchScore !== undefined);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">Job Board</p>
      <h1 className="text-heading mb-2">
        Find Your Next Role<span className="text-red">.</span>
      </h1>
      <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
        Browse {jobListings.length} live listings or let the AI surface your top matches — each explains{" "}
        <span className="font-bold text-ink">why</span> it fits your trajectory.
      </p>

      {/* Tabs */}
      <div className="mb-6 flex border-b-4 border-ink">
        <button
          onClick={() => setTab("browse")}
          className={`px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${
            tab === "browse" ? "bg-ink text-white" : "hover:bg-canvas"
          }`}
        >
          Browse All Jobs ({jobListings.length})
        </button>
        <button
          onClick={() => setTab("matched")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${
            tab === "matched" ? "bg-ink text-white" : "hover:bg-canvas"
          }`}
        >
          <Bot size={14} /> AI Matched ({matchedJobs.length})
        </button>
      </div>

      {/* ── Browse Tab ─────────────────────────────── */}
      {tab === "browse" && (
        <>
          {/* Search + filter bar */}
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                className="input-bauhaus pl-9"
                placeholder="Search title, company, or skill…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border-2 border-ink px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                showFilters || category || mode ? "bg-yellow" : "hover:bg-canvas"
              }`}
            >
              <SlidersHorizontal size={14} /> Filters
              {(category || mode) && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-white">
                  {[category, mode].filter(Boolean).length}
                </span>
              )}
            </button>
            {(query || category || mode) && (
              <button
                onClick={() => { setQuery(""); setCategory(""); setMode(""); }}
                className="flex items-center gap-1 text-xs font-bold text-red hover:underline"
              >
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mb-4 grid gap-3 border-2 border-ink bg-canvas p-4 sm:grid-cols-2">
              <div>
                <label className="label-bauhaus">Category</label>
                <select
                  className="input-bauhaus"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as JobCategory | "")}
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-bauhaus">Work Mode</label>
                <select
                  className="input-bauhaus"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as WorkMode | "")}
                >
                  <option value="">All Modes</option>
                  {MODES.map((m) => (
                    <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <p className="mb-4 text-sm font-bold text-ink/50">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
            {query && <> for &ldquo;<span className="text-ink">{query}</span>&rdquo;</>}
          </p>

          {filtered.length === 0 ? (
            <div className="card py-12 text-center">
              <p className="text-sm font-bold text-ink/50">No jobs match your search. Try different keywords or clear filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  applied={appliedIds.has(job.id)}
                  onApply={setApplyingTo}
                  showMatch={false}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── AI Matched Tab ──────────────────────────── */}
      {tab === "matched" && (
        <div className="space-y-4">
          <div className="flex items-start gap-2 border-2 border-ink bg-yellow/10 p-3 text-xs font-semibold">
            <Bot size={14} className="mt-0.5 shrink-0" />
            Matched by <strong>JobMatchAgent</strong> based on your resume, portfolio, and trajectory —
            not just keywords. Each card explains why it fits.
          </div>
          {matchedJobs
            .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
            .map((job) => (
              <JobCard
                key={job.id}
                job={job}
                applied={appliedIds.has(job.id)}
                onApply={setApplyingTo}
                showMatch
              />
            ))}
        </div>
      )}

      {/* Apply Modal */}
      {applyingTo && (
        <ApplyModal
          job={applyingTo}
          onClose={() => setApplyingTo(null)}
          onSubmit={(note) => submitApplication(applyingTo, note)}
        />
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 border-4 border-ink bg-blue px-5 py-3 font-black uppercase text-white shadow-hard-md">
          <Check size={16} /> {toastMsg}
        </div>
      )}
    </div>
  );
}
