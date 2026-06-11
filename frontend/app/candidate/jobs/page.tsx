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
  Bookmark,
  BookmarkCheck,
  Users,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
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
  "Technology", "Design", "Data", "Product", "Marketing", "Finance", "Operations",
];
const MODES: WorkMode[] = ["remote", "hybrid", "onsite"];

// Candidate's current skills (mock — Stage 2 reads from CareerProfile)
const MY_SKILLS = ["React", "TypeScript", "JavaScript", "Next.js", "Node.js", "CSS", "Git"];

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
  job, onClose, onSubmit,
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
            Stage 1: stored locally. Stage 2: triggers ResumeOCRAgent to pre-fill your profile.
          </p>
        </div>
        <div className="flex gap-3 border-t-4 border-ink px-5 py-4">
          <button onClick={onClose} className="btn-ghost flex-1 py-2 text-xs">Cancel</button>
          <button onClick={() => onSubmit(coverNote)} className="btn-blue flex-1 py-2 text-xs">
            Submit Application <Briefcase size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────────────
function JobCard({
  job, applied, saved, onApply, onSave, showMatch,
}: {
  job: JobListing;
  applied: boolean;
  saved: boolean;
  onApply: (job: JobListing) => void;
  onSave: (job: JobListing) => void;
  showMatch: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const skillsGap = job.skills.filter((s) => !MY_SKILLS.includes(s));
  const matchedSkills = job.skills.filter((s) => MY_SKILLS.includes(s));

  return (
    <div className={`card border-2 transition-shadow hover:shadow-hard ${applied ? "border-blue/40" : "border-ink"}`}>
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              {job.category}
            </span>
            {showMatch && job.matchScore && (
              <span className={`agent-badge ${job.matchScore >= 85 ? "bg-blue text-white" : "bg-yellow text-ink"}`}>
                <Bot size={11} /> {job.matchScore}% match
              </span>
            )}
            {job.stretchFlag && (
              <span className="agent-badge-alert"><Zap size={11} /> Stretch</span>
            )}
            {applied && (
              <span className="agent-badge bg-blue text-white"><Check size={11} /> Applied</span>
            )}
          </div>
          <h2 className="text-lg font-black uppercase leading-tight">{job.title}</h2>
          <p className="font-bold text-blue">{job.company}</p>
        </div>

        <div className="flex items-start gap-2">
          {/* Save button */}
          <button
            onClick={(e) => { e.stopPropagation(); onSave(job); }}
            title={saved ? "Unsave job" : "Save job"}
            className={`border-2 border-ink p-2 transition-colors ${saved ? "bg-yellow" : "hover:bg-canvas"}`}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>

          <div className="flex flex-col items-end gap-1.5 text-sm font-bold">
            <span className="flex items-center gap-1.5 text-ink/70"><MapPin size={13} /> {job.location}</span>
            <span className="flex items-center gap-1.5 text-ink/70"><Banknote size={13} /> {fmtSalary(job.salaryMin, job.salaryMax)}</span>
            <span className="border-2 border-ink px-2 py-0.5 text-[10px] uppercase tracking-wider">{job.mode}</span>
          </div>
        </div>
      </div>

      {/* Quick stats strip */}
      {(job.successRate || job.socialProof) && !expanded && (
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-3">
          {job.successRate && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-ink/50">
              <TrendingUp size={11} className="text-blue" />
              {job.successRate}% of similar profiles got to interview
            </span>
          )}
          {job.socialProof && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-ink/50">
              <Users size={11} className="text-blue" />
              {job.socialProof}
            </span>
          )}
        </div>
      )}

      {/* Collapsed hint */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 flex items-center gap-1 text-xs font-bold text-ink/40 hover:text-ink"
        >
          <ChevronDown size={13} /> Click to expand · Posted {job.postedAt}
        </button>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="mt-4 space-y-4 border-t-2 border-dashed border-ink/20 pt-4">
          <p className="text-sm font-medium text-ink/70">{job.description}</p>

          {/* Why it fits (AI matched) */}
          {showMatch && job.matchReason && (
            <div className="flex items-start gap-2 border-l-4 border-yellow bg-yellow/5 p-3 text-xs font-semibold">
              <Bot size={13} className="mt-0.5 shrink-0 text-blue" />
              <div>
                <span className="font-black text-blue">Why JobMatchAgent picked this: </span>
                {job.matchReason}
              </div>
            </div>
          )}

          {/* Success rate + social proof */}
          {(job.successRate || job.socialProof) && (
            <div className="grid gap-2 sm:grid-cols-2">
              {job.successRate && (
                <div className="flex items-start gap-2 border-2 border-ink bg-canvas p-3">
                  <TrendingUp size={14} className="mt-0.5 shrink-0 text-blue" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wide text-ink/50">Success Rate</p>
                    <p className="text-sm font-black">{job.successRate}%</p>
                    <p className="text-[10px] font-medium text-ink/60">of similar profiles reached interview stage</p>
                  </div>
                </div>
              )}
              {job.socialProof && (
                <div className="flex items-start gap-2 border-2 border-ink bg-canvas p-3">
                  <Users size={14} className="mt-0.5 shrink-0 text-blue" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wide text-ink/50">Social Proof</p>
                    <p className="text-xs font-semibold leading-relaxed">{job.socialProof}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills match + gap */}
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-ink/50">Skills Analysis</p>
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.map((s) => (
                <span key={s} className="flex items-center gap-1 border-2 border-blue bg-blue/5 px-2 py-0.5 text-[10px] font-bold uppercase text-blue">
                  <Check size={9} /> {s}
                </span>
              ))}
              {skillsGap.map((s) => (
                <span key={s} className="flex items-center gap-1 border-2 border-ink/30 bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase text-ink/50">
                  <AlertCircle size={9} /> {s}
                </span>
              ))}
            </div>
            {skillsGap.length > 0 && (
              <p className="mt-2 text-[11px] font-semibold text-ink/50">
                Skills gap: <span className="font-black text-ink">{skillsGap.join(", ")}</span> — not in your profile yet.
              </p>
            )}
            {skillsGap.length === 0 && (
              <p className="mt-2 text-[11px] font-bold text-blue">
                You match all required skills for this role.
              </p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-ink/50">Requirements</p>
            <ul className="space-y-1">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs font-semibold">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-ink" /> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview tip */}
          {job.interviewTip && (
            <div className="flex items-start gap-2 border-2 border-ink bg-ink p-3 text-white">
              <Lightbulb size={14} className="mt-0.5 shrink-0 text-yellow" />
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-yellow">Interview Tip</p>
                <p className="text-xs font-medium leading-relaxed text-white/80">{job.interviewTip}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-3">
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-1 text-xs font-bold text-ink/40 hover:text-ink"
            >
              <ChevronUp size={13} /> Collapse · via {job.source}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onSave(job); }}
                className={`flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 text-xs font-bold uppercase transition-colors ${saved ? "bg-yellow" : "hover:bg-canvas"}`}
              >
                {saved ? <><BookmarkCheck size={12} /> Saved</> : <><Bookmark size={12} /> Save</>}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); if (!applied) onApply(job); }}
                className={`px-4 py-2 text-xs ${applied ? "btn-ghost cursor-default" : "btn-blue"}`}
              >
                {applied ? <><Check size={13} /> Applied</> : <>Apply Now <Briefcase size={13} /></>}
              </button>
            </div>
          </div>
        </div>
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
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [appliedIds, setAppliedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("applied_jobs") ?? "[]")); }
    catch { return new Set(); }
  });

  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("saved_jobs") ?? "[]")); }
    catch { return new Set(); }
  });

  function submitApplication(job: JobListing, coverNote: string) {
    const next = new Set([...appliedIds, job.id]);
    setAppliedIds(next);
    localStorage.setItem("applied_jobs", JSON.stringify([...next]));
    setApplyingTo(null);
    setToastMsg(`Application sent to ${job.company}!`);
    setTimeout(() => setToastMsg(null), 3500);
  }

  function toggleSave(job: JobListing) {
    const next = new Set(savedIds);
    if (next.has(job.id)) {
      next.delete(job.id);
      setToastMsg(`Removed ${job.title} from saved`);
    } else {
      next.add(job.id);
      setToastMsg(`Saved ${job.title}`);
    }
    setSavedIds(next);
    localStorage.setItem("saved_jobs", JSON.stringify([...next]));
    setTimeout(() => setToastMsg(null), 2500);
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return jobListings.filter((j) => {
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q));
      return matchQ && (!category || j.category === category) && (!mode || j.mode === mode);
    });
  }, [query, category, mode]);

  const matchedJobs = jobListings.filter((j) => j.matchScore !== undefined);
  const avgMatch = matchedJobs.length
    ? Math.round(matchedJobs.reduce((a, b) => a + (b.matchScore ?? 0), 0) / matchedJobs.length)
    : 0;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">Job Board</p>
      <h1 className="text-heading mb-2">
        Find Your Next Role<span className="text-red">.</span>
      </h1>
      <p className="mb-6 max-w-2xl text-sm font-medium text-ink/60">
        Browse {jobListings.length} live listings or let the AI surface your top matches.
        Each job shows your skills gap, success rate, and interview tips — not just the description.
      </p>

      {/* Agent card */}
      <div className="mb-6">
        <AgentCard
          agentName="JobMatchAgent"
          status="complete"
          summary={`Analysed ${jobListings.length} roles against your profile. ${matchedJobs.length} matches found — average fit: ${avgMatch}%. ${savedIds.size > 0 ? `You have ${savedIds.size} saved job${savedIds.size > 1 ? "s" : ""}.` : "Save jobs you like with the bookmark button."}`}
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex border-b-4 border-ink">
        <button
          onClick={() => setTab("browse")}
          className={`px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${tab === "browse" ? "bg-ink text-white" : "hover:bg-canvas"}`}
        >
          Browse All ({jobListings.length})
        </button>
        <button
          onClick={() => setTab("matched")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${tab === "matched" ? "bg-ink text-white" : "hover:bg-canvas"}`}
        >
          <Bot size={14} /> AI Matched ({matchedJobs.length})
        </button>
        {savedIds.size > 0 && (
          <a
            href="/candidate/saved"
            className="ml-auto flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-blue hover:bg-canvas"
          >
            <Bookmark size={14} /> Saved ({savedIds.size})
          </a>
        )}
      </div>

      {/* ── Browse Tab ─────────────────────────── */}
      {tab === "browse" && (
        <>
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
              className={`flex items-center gap-2 border-2 border-ink px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${showFilters || category || mode ? "bg-yellow" : "hover:bg-canvas"}`}
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
                <select className="input-bauhaus" value={category} onChange={(e) => setCategory(e.target.value as JobCategory | "")}>
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-bauhaus">Work Mode</label>
                <select className="input-bauhaus" value={mode} onChange={(e) => setMode(e.target.value as WorkMode | "")}>
                  <option value="">All Modes</option>
                  {MODES.map((m) => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
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
                <JobCard key={job.id} job={job} applied={appliedIds.has(job.id)} saved={savedIds.has(job.id)} onApply={setApplyingTo} onSave={toggleSave} showMatch={false} />
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
            <span>
              Matched by <strong>JobMatchAgent</strong> based on your skills, portfolio trajectory, and location preference —
              not just keywords. Expand any card to see <em>exactly why</em> it fits, your skills gap, and interview tips.
            </span>
          </div>
          {matchedJobs
            .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
            .map((job) => (
              <JobCard key={job.id} job={job} applied={appliedIds.has(job.id)} saved={savedIds.has(job.id)} onApply={setApplyingTo} onSave={toggleSave} showMatch />
            ))}
        </div>
      )}

      {/* Apply Modal */}
      {applyingTo && (
        <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} onSubmit={(note) => submitApplication(applyingTo, note)} />
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
