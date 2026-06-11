"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

const INTERESTS = [
  "Web Development",
  "UI/UX Design",
  "Data & Analytics",
  "Mobile Apps",
  "Cybersecurity",
  "AI / Machine Learning",
  "Game Development",
  "Cloud & DevOps",
];

const STEPS = ["Academics", "Interests", "Location"];

export default function StudentOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const toggleInterest = (i: string) =>
    setInterests((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  function finish() {
    // Stage 1: hand off to the Agent Console to watch the real pipeline run
    setRunning(true);
    setTimeout(() => router.push("/student/agents"), 1800);
  }

  if (running) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center pt-20 text-center">
        <span className="agent-badge-running mb-6 animate-pulse">
          <Sparkles size={13} /> Agents running…
        </span>
        <h1 className="text-heading mb-3">Building your Career Profile</h1>
        <p className="text-sm font-medium text-ink/60">
          The Navigator is mapping your paths · The Auditor is scoring your
          readiness · The Recruiter is matching internships
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-label mb-1 text-blue">Student Onboarding</p>
      <h1 className="text-heading mb-8">
        3 steps, then your agents take over<span className="text-red">.</span>
      </h1>

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
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="label-bauhaus">University</label>
              <input className="input-bauhaus" defaultValue="UiTM Shah Alam" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-bauhaus">Programme</label>
                <select className="input-bauhaus">
                  <option>Degree</option>
                  <option>Diploma</option>
                  <option>Foundation</option>
                </select>
              </div>
              <div>
                <label className="label-bauhaus">Current Semester</label>
                <input className="input-bauhaus" type="number" defaultValue={6} />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-bauhaus">Field of Study</label>
                <input className="input-bauhaus" defaultValue="Computer Science" />
              </div>
              <div>
                <label className="label-bauhaus">Current CGPA</label>
                <input className="input-bauhaus" defaultValue="3.20" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="mb-4 text-sm font-medium text-ink/60">
              Pick what pulls you — The Navigator weighs these against your
              results to map realistic paths (not fantasy ones).
            </p>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  className={`border-2 border-ink px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                    interests.includes(i) ? "bg-yellow shadow-hard-sm" : "bg-white hover:bg-canvas"
                  }`}
                >
                  {interests.includes(i) ? "✓ " : ""}
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="label-bauhaus">Where are you based?</label>
              <input className="input-bauhaus" defaultValue="Shah Alam, Selangor" />
            </div>
            <div>
              <label className="label-bauhaus">Willing to relocate?</label>
              <select className="input-bauhaus">
                <option>Yes — anywhere in Malaysia</option>
                <option>Klang Valley only</option>
                <option>Prefer remote work</option>
                <option>No — staying local</option>
              </select>
            </div>
            <p className="border-2 border-ink bg-canvas p-3 text-xs font-bold uppercase tracking-wide text-ink/60">
              The Planner uses this for city-vs-salary trade-off maths — rural
              students get remote-friendly paths flagged automatically.
            </p>
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
          {step < 2 ? (
            <button onClick={() => setStep(step + 1)} className="btn-blue px-5 py-2 text-xs">
              Next <ArrowRight size={14} />
            </button>
          ) : (
            <button onClick={finish} className="btn-red px-5 py-2 text-xs">
              Run My Agents <Sparkles size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
