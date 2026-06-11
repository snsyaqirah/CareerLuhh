"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Check,
  FolderGit2,
  BookOpen,
  Sparkles,
  CircleAlert,
} from "lucide-react";
import { portfolioItems, transcriptRecords, studentProfile, calcCgpa } from "@/lib/mock-data/student";
import { useAuth } from "@/lib/auth-context";

const STEPS = ["Job Details", "Preview Transfer", "Confirm"];

export default function GraduatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("employed");
  const [transferring, setTransferring] = useState(false);

  const cgpa = calcCgpa(transcriptRecords);
  const totalCredits = transcriptRecords
    .flatMap((r) => r.subjects)
    .reduce((s, x) => s + x.creditHours, 0);

  function doTransfer() {
    setTransferring(true);
    // Stage 1: mock transfer — in Stage 2 this calls POST /api/profile/graduate
    setTimeout(() => {
      router.push("/candidate/dashboard");
    }, 2000);
  }

  if (transferring) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center pt-20 text-center">
        <span className="agent-badge-running mb-6 animate-pulse">
          <Sparkles size={13} /> Transferring profile…
        </span>
        <h1 className="text-heading mb-3">Graduating your profile</h1>
        <p className="text-sm font-medium text-ink/60">
          Copying portfolio, transcript, and skills to your Candidate profile.
          You&apos;ll never start from scratch again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-label mb-1 text-blue">Profile Graduation</p>
      <h1 className="text-heading mb-2">
        You got the job<span className="text-red">.</span>
      </h1>
      <p className="mb-8 text-sm font-medium text-ink/60">
        Transfer your student profile to Candidate — your portfolio, academic records,
        and readiness score all carry over. Nothing gets left behind.
      </p>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center border-2 border-ink text-sm font-black ${
                step > i ? "bg-blue text-white" : step === i ? "bg-yellow" : "bg-white"
              }`}
            >
              {step > i ? <Check size={15} /> : i + 1}
            </span>
            <span className="text-label hidden sm:block">{label}</span>
            {i < STEPS.length - 1 && <div className="h-0.5 w-8 bg-ink" />}
          </div>
        ))}
      </div>

      <div className="card">
        {/* Step 0 — Job Details */}
        {step === 0 && (
          <div className="space-y-5">
            <p className="text-sm font-medium text-ink/60">
              Tell us about the role you&apos;re starting — this seeds your Candidate profile.
            </p>
            <div>
              <label className="label-bauhaus">Job Title</label>
              <input
                className="input-bauhaus"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Junior Frontend Developer"
              />
            </div>
            <div>
              <label className="label-bauhaus">Company</label>
              <input
                className="input-bauhaus"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Grab Malaysia"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-bauhaus">Start Date</label>
                <input
                  className="input-bauhaus"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. August 2026"
                />
              </div>
              <div>
                <label className="label-bauhaus">Employment Status</label>
                <select
                  className="input-bauhaus"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="employed">Employed (full-time)</option>
                  <option value="freelance">Freelance / Contract</option>
                  <option value="gig">Gig / Part-time</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Preview what transfers */}
        {step === 1 && (
          <div className="space-y-5">
            <p className="text-sm font-medium text-ink/60">
              Here&apos;s what moves to your Candidate profile:
            </p>

            {/* Identity */}
            <div className="border-2 border-ink p-4">
              <p className="text-label mb-2 flex items-center gap-1.5 text-blue">
                <GraduationCap size={13} /> Identity
              </p>
              <p className="text-sm font-bold">{user?.name}</p>
              <p className="text-xs font-semibold text-ink/60">{user?.email}</p>
              <p className="mt-1 text-xs font-semibold text-ink/50">
                Starting as: <span className="font-black text-ink">{jobTitle || "—"}</span> at{" "}
                <span className="font-black text-ink">{company || "—"}</span>
              </p>
            </div>

            {/* Portfolio */}
            <div className="border-2 border-ink p-4">
              <p className="text-label mb-2 flex items-center gap-1.5 text-blue">
                <FolderGit2 size={13} /> Portfolio ({portfolioItems.length} items)
              </p>
              <ul className="space-y-1">
                {portfolioItems.map((p) => (
                  <li key={p.id} className="flex items-center gap-2 text-xs font-semibold">
                    <Check size={11} className="text-blue" />
                    {p.title} — {p.type}
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic */}
            <div className="border-2 border-ink p-4">
              <p className="text-label mb-2 flex items-center gap-1.5 text-blue">
                <BookOpen size={13} /> Academic Records
              </p>
              <p className="text-sm font-bold">
                CGPA {cgpa.toFixed(2)} · {transcriptRecords.length} semesters · {totalCredits} credit hours
              </p>
              <p className="mt-1 text-xs font-semibold text-ink/50">
                {studentProfile.programme} · {studentProfile.university}
              </p>
            </div>

            <div className="flex items-start gap-2 border-2 border-yellow bg-yellow/10 p-3 text-xs font-semibold">
              <CircleAlert size={14} className="mt-0.5 shrink-0 text-ink" />
              Your Student portal stays active until you manually close it. You can access both until Stage 2.
            </div>
          </div>
        )}

        {/* Step 2 — Confirm */}
        {step === 2 && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border-4 border-ink bg-blue">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase">Ready to graduate?</h2>
              <p className="mt-2 text-sm font-medium text-ink/60">
                This creates your Candidate profile pre-filled with everything from your student journey.
                In Stage 2 this is a one-way migration — but for now you can switch portals via login.
              </p>
            </div>
            <button onClick={doTransfer} className="btn-blue w-full py-3 text-sm">
              Graduate Profile → Candidate Portal <Sparkles size={14} />
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="btn-ghost px-4 py-2 text-xs">
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 2 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 0 && (!jobTitle || !company)}
              className="btn-blue px-5 py-2 text-xs disabled:opacity-40"
            >
              Next <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
