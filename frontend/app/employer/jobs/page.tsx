"use client";

import { useState } from "react";
import {
  Plus,
  X,
  Users,
  ChevronDown,
  ChevronUp,
  Check,
  Eye,
  Briefcase,
  Pause,
  Play,
} from "lucide-react";
import {
  employerJobPostings,
  type EmployerJobPosting,
  type EmployerApplicant,
  type JobCategory,
  type WorkMode,
  type JobType,
} from "@/lib/mock-data/jobs";

const CATEGORIES: JobCategory[] = [
  "Technology", "Design", "Data", "Product", "Marketing", "Finance", "Operations",
];
const STATUS_COLOR: Record<EmployerApplicant["status"], string> = {
  new: "bg-canvas text-ink border-ink/20",
  reviewing: "bg-yellow text-ink",
  shortlisted: "bg-blue text-white",
  rejected: "bg-red/10 text-red border-red",
};
const STATUS_LABEL: Record<EmployerApplicant["status"], string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

function ApplicantRow({
  applicant,
  onStatusChange,
}: {
  applicant: EmployerApplicant;
  onStatusChange: (id: string, status: EmployerApplicant["status"]) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/5 py-3 last:border-0">
      <div className="min-w-0">
        <p className="font-black uppercase leading-tight">{applicant.name}</p>
        <p className="text-xs font-semibold text-ink/60">
          {applicant.currentRole} · {applicant.yearsExp}y exp · Applied {applicant.appliedAt}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="agent-badge bg-blue text-white text-[10px]">
          {applicant.matchScore}% match
        </span>
        <select
          className={`border-2 px-2 py-1 text-[11px] font-black uppercase tracking-wide ${STATUS_COLOR[applicant.status]}`}
          value={applicant.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onStatusChange(applicant.id, e.target.value as EmployerApplicant["status"])
          }
        >
          {(Object.keys(STATUS_LABEL) as EmployerApplicant["status"][]).map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function JobPostingCard({ posting }: { posting: EmployerJobPosting }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(posting.isActive);
  const [applicants, setApplicants] = useState(posting.applicants);

  function updateStatus(id: string, status: EmployerApplicant["status"]) {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  const counts = {
    new: applicants.filter((a) => a.status === "new").length,
    shortlisted: applicants.filter((a) => a.status === "shortlisted").length,
  };

  return (
    <div className={`card mb-4 overflow-hidden p-0 ${!active ? "opacity-70" : ""}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 border-b-2 border-ink p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className={`border-2 border-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                active ? "bg-blue text-white" : "bg-canvas text-ink/50"
              }`}
            >
              {active ? "Active" : "Closed"}
            </span>
            <span className="text-[10px] font-bold text-ink/40">Posted {posting.postedAt}</span>
          </div>
          <h2 className="text-xl font-black uppercase">{posting.title}</h2>
          <p className="mt-1 text-sm font-bold text-ink/60">
            {posting.location} · {posting.mode} · {posting.type}
          </p>
          <p className="text-sm font-bold text-blue">
            RM{(posting.salaryMin / 1000).toFixed(0)}k – RM{(posting.salaryMax / 1000).toFixed(0)}k
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="flex items-center gap-1.5 text-sm font-black">
            <Users size={14} /> {applicants.length} applicants
          </span>
          {counts.new > 0 && (
            <span className="agent-badge bg-yellow text-ink">{counts.new} new</span>
          )}
          {counts.shortlisted > 0 && (
            <span className="agent-badge bg-blue text-white">{counts.shortlisted} shortlisted</span>
          )}
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded applicants list */}
      {expanded && (
        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-label text-ink/60">Applicants ({applicants.length})</p>
            <div className="flex gap-2">
              <button
                onClick={() => setActive(!active)}
                className="flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-canvas"
              >
                {active ? <><Pause size={12} /> Close Listing</> : <><Play size={12} /> Re-activate</>}
              </button>
            </div>
          </div>

          {applicants.length === 0 ? (
            <p className="py-4 text-center text-sm font-bold text-ink/40">No applicants yet.</p>
          ) : (
            <div className="divide-y divide-ink/5">
              {applicants.map((a) => (
                <ApplicantRow key={a.id} applicant={a} onStatusChange={updateStatus} />
              ))}
            </div>
          )}

          <p className="mt-4 text-[11px] font-semibold text-ink/40">
            Stage 2: applicants linked to full Candidate profiles — click to view trajectory score,
            portfolio, and transcript.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Post Job Form ─────────────────────────────────────────────────────────
function PostJobForm({ onClose }: { onClose: () => void }) {
  const [req, setReq] = useState<string[]>(["", ""]);

  function addReq() { setReq((p) => [...p, ""]); }
  function updateReq(i: number, v: string) {
    setReq((p) => p.map((r, idx) => (idx === i ? v : r)));
  }
  function removeReq(i: number) { setReq((p) => p.filter((_, idx) => idx !== i)); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Stage 1: just close — Stage 2: POST /api/jobs
    onClose();
    alert("Job posted! (Stage 1 demo — not persisted)");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border-4 border-ink bg-white shadow-hard-lg">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b-4 border-ink bg-ink px-5 py-4">
          <p className="font-black uppercase text-white">Post a New Job</p>
          <button onClick={onClose} className="border-2 border-white/40 p-1.5 text-white hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-bauhaus">Job Title</label>
              <input className="input-bauhaus" required placeholder="e.g. Frontend Developer" />
            </div>
            <div>
              <label className="label-bauhaus">Category</label>
              <select className="input-bauhaus" required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label-bauhaus">Work Mode</label>
              <select className="input-bauhaus" required>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="label-bauhaus">Job Type</label>
              <select className="input-bauhaus" required>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="label-bauhaus">Location</label>
              <input className="input-bauhaus" required placeholder="e.g. Kuala Lumpur" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-bauhaus">Min Salary (RM/month)</label>
              <input className="input-bauhaus" required type="number" min={1000} placeholder="5000" />
            </div>
            <div>
              <label className="label-bauhaus">Max Salary (RM/month)</label>
              <input className="input-bauhaus" required type="number" min={1000} placeholder="8000" />
            </div>
          </div>

          <div>
            <label className="label-bauhaus">Job Description</label>
            <textarea className="input-bauhaus h-28 resize-none" required placeholder="Describe the role, team, and what the person will own..." />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="label-bauhaus">Requirements</label>
              <button type="button" onClick={addReq} className="text-xs font-bold text-blue hover:underline">
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {req.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="input-bauhaus flex-1"
                    value={r}
                    onChange={(e) => updateReq(i, e.target.value)}
                    placeholder={`Requirement ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeReq(i)}
                    className="border-2 border-ink p-2 hover:bg-red hover:text-white"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="label-bauhaus">
              Skills Needed{" "}
              <span className="font-normal normal-case tracking-normal text-ink/50">— comma-separated</span>
            </label>
            <input className="input-bauhaus" placeholder="React, TypeScript, Node.js" />
          </div>

          <div className="flex gap-3 border-t-2 border-ink/10 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 py-2.5 text-xs">
              Cancel
            </button>
            <button type="submit" className="btn-blue flex-1 py-2.5 text-xs">
              Post Job <Briefcase size={13} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function EmployerJobsPage() {
  const [postings] = useState(employerJobPostings);
  const [showForm, setShowForm] = useState(false);

  const activeCount = postings.filter((p) => p.isActive).length;
  const totalApplicants = postings.reduce((s, p) => s + p.applicantCount, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label mb-1 text-blue">Job Management</p>
          <h1 className="text-heading mb-2">
            Your Job Listings<span className="text-red">.</span>
          </h1>
          <p className="max-w-xl text-sm font-medium text-ink/60">
            Post, manage, and screen applicants for your open roles.
            Stage 2: applicants matched by trajectory score via TrajectoryMatchAgent.
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-blue px-4 py-2 text-xs">
          <Plus size={14} /> Post a Job
        </button>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-3xl font-black text-blue">{activeCount}</p>
          <p className="text-label text-ink/50">Active Listings</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black">{postings.length}</p>
          <p className="text-label text-ink/50">Total Posted</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black">{totalApplicants}</p>
          <p className="text-label text-ink/50">Total Applicants</p>
        </div>
      </div>

      {/* Listings */}
      {postings.map((p) => (
        <JobPostingCard key={p.id} posting={p} />
      ))}

      {/* Post Job Form Modal */}
      {showForm && <PostJobForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
