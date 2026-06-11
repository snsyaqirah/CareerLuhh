"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Banknote, Check, Clock, X, Star, Calendar } from "lucide-react";
import {
  mockApplications,
  jobListings,
  type ApplicationRecord,
  type ApplicationStatus,
} from "@/lib/mock-data/jobs";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  applied: "Applied",
  reviewing: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview Scheduled",
  offer: "Offer Received",
  rejected: "Not Selected",
};

const STATUS_COLOR: Record<ApplicationStatus, string> = {
  applied: "bg-canvas border-ink/20 text-ink/60",
  reviewing: "bg-yellow text-ink",
  shortlisted: "bg-blue text-white",
  interview: "bg-blue text-white",
  offer: "bg-blue text-white",
  rejected: "bg-red/10 border-red text-red",
};

const STATUS_ICON: Record<ApplicationStatus, React.ReactNode> = {
  applied: <Clock size={12} />,
  reviewing: <Clock size={12} />,
  shortlisted: <Star size={12} />,
  interview: <Calendar size={12} />,
  offer: <Check size={12} />,
  rejected: <X size={12} />,
};

const STATUS_ORDER: ApplicationStatus[] = [
  "offer", "interview", "shortlisted", "reviewing", "applied", "rejected",
];

function fmtSalary(min: number, max: number) {
  return `RM${(min / 1000).toFixed(0)}k – RM${(max / 1000).toFixed(0)}k`;
}

function ApplicationCard({ app }: { app: ApplicationRecord }) {
  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-black uppercase leading-tight">{app.jobTitle}</h2>
          <p className="font-bold text-blue">{app.company}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-sm font-bold text-ink/60">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {app.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote size={13} /> {fmtSalary(app.salaryMin, app.salaryMax)}
            </span>
            <span className="rounded-full border-2 border-ink px-2 py-0.5 text-[10px] uppercase tracking-wider">
              {app.mode}
            </span>
          </div>
          {app.coverNote && (
            <p className="mt-3 border-l-4 border-ink/20 pl-3 text-sm font-medium italic text-ink/60">
              &ldquo;{app.coverNote}&rdquo;
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`flex items-center gap-1.5 border-2 px-3 py-1.5 text-xs font-black uppercase tracking-wide ${STATUS_COLOR[app.status]}`}
          >
            {STATUS_ICON[app.status]}
            {STATUS_LABEL[app.status]}
          </span>
          <p className="text-xs font-bold text-ink/40">Applied {app.appliedAt}</p>
        </div>
      </div>

      {/* Status timeline */}
      <div className="mt-4 flex items-center gap-1 border-t-2 border-dashed border-ink/10 pt-4">
        {(["applied", "reviewing", "shortlisted", "interview", "offer"] as ApplicationStatus[]).map(
          (s, i, arr) => {
            const stepOrder = STATUS_ORDER.indexOf(s);
            const currentOrder = STATUS_ORDER.indexOf(app.status);
            const active = app.status !== "rejected" && stepOrder >= currentOrder;
            const current = app.status === s;
            return (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-5 w-5 items-center justify-center border-2 text-[9px] font-black ${
                      current
                        ? "border-ink bg-blue text-white"
                        : active
                        ? "border-ink bg-ink text-white"
                        : "border-ink/20 bg-canvas text-ink/30"
                    }`}
                  >
                    {active ? <Check size={10} /> : i + 1}
                  </div>
                  <span
                    className={`hidden text-[9px] font-bold uppercase sm:block ${
                      active ? "text-ink" : "text-ink/30"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`mx-1 h-0.5 flex-1 ${active ? "bg-ink" : "bg-ink/10"}`} />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    // Merge pre-baked mock applications + any new ones applied during this session
    const savedIds: string[] = JSON.parse(localStorage.getItem("applied_jobs") ?? "[]");
    const newApps: ApplicationRecord[] = savedIds
      .filter((id) => !mockApplications.some((a) => a.jobId === id))
      .map((id) => {
        const job = jobListings.find((j) => j.id === id);
        if (!job) return null;
        return {
          id: `app_local_${id}`,
          jobId: id,
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          mode: job.mode,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          appliedAt: "Just now",
          status: "applied" as ApplicationStatus,
        };
      })
      .filter((a): a is ApplicationRecord => a !== null);

    setApplications([...mockApplications, ...newApps]);
  }, []);

  const byStatus = {
    active: applications.filter((a) => a.status !== "rejected" && a.status !== "offer"),
    offers: applications.filter((a) => a.status === "offer"),
    rejected: applications.filter((a) => a.status === "rejected"),
  };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-blue">My Applications</p>
      <h1 className="text-heading mb-2">
        Application Tracker<span className="text-red">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Every application in one place — from submitted to offer. Stage 2: real-time
        status updates pushed from employers.
      </p>

      {/* Summary stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <div className="card text-center">
          <p className="text-3xl font-black">{applications.length}</p>
          <p className="text-label text-ink/50">Total</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black text-yellow">
            {applications.filter((a) => a.status === "reviewing").length}
          </p>
          <p className="text-label text-ink/50">Under Review</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black text-blue">
            {applications.filter((a) => ["shortlisted", "interview"].includes(a.status)).length}
          </p>
          <p className="text-label text-ink/50">Shortlisted</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-black text-blue">
            {byStatus.offers.length}
          </p>
          <p className="text-label text-ink/50">Offers</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="card py-16 text-center">
          <Briefcase size={32} className="mx-auto mb-4 text-ink/30" />
          <p className="font-bold text-ink/50">No applications yet.</p>
          <p className="mt-1 text-sm font-medium text-ink/40">
            Head to Job Matches and apply to your first role.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {byStatus.offers.length > 0 && (
            <section>
              <p className="text-label mb-4 flex items-center gap-2 text-blue">
                <Check size={13} /> Offers ({byStatus.offers.length})
              </p>
              <div className="space-y-4">
                {byStatus.offers.map((a) => <ApplicationCard key={a.id} app={a} />)}
              </div>
            </section>
          )}

          {byStatus.active.length > 0 && (
            <section>
              <p className="text-label mb-4 text-ink/60">Active ({byStatus.active.length})</p>
              <div className="space-y-4">
                {byStatus.active.map((a) => <ApplicationCard key={a.id} app={a} />)}
              </div>
            </section>
          )}

          {byStatus.rejected.length > 0 && (
            <section>
              <p className="text-label mb-4 text-red">Not Selected ({byStatus.rejected.length})</p>
              <div className="space-y-4 opacity-60">
                {byStatus.rejected.map((a) => <ApplicationCard key={a.id} app={a} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
