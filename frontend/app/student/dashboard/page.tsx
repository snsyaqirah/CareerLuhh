import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, ListTodo } from "lucide-react";
import { ReadinessRing } from "@/components/readiness-ring/ReadinessRing";
import { CoachAlert } from "@/components/shared/CoachAlert";
import { AgentCard } from "@/components/agent-card/AgentCard";
import {
  readiness,
  studentCoach,
  studentProfile,
  internships,
  skorAlign,
} from "@/lib/mock-data/student";

export default function StudentDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-label mb-1 text-blue">Student Dashboard</p>
      <h1 className="text-heading mb-2">
        Hey {studentProfile.name.split(" ")[0]}<span className="text-red">.</span>
      </h1>
      <p className="mb-8 text-sm font-medium text-ink/60">
        {studentProfile.programme} · {studentProfile.university} · Semester{" "}
        {studentProfile.semester} · Graduating {studentProfile.graduation}
      </p>

      {/* Coach alert */}
      <div className="mb-8">
        <CoachAlert {...studentCoach} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Readiness */}
        <AgentCard agentName="The Auditor" codeName="ReadinessAgent" accent="blue">
          <div className="flex flex-wrap items-center gap-6">
            <ReadinessRing score={readiness.score} />
            <div className="min-w-[180px] flex-1">
              <p className="text-label text-ink/50">Readiness grade</p>
              <p className="mb-3 text-5xl font-black">{readiness.grade}</p>
              <p className="text-sm font-medium text-ink/70">
                You&apos;re hireable-ish — close the gaps below before graduation
                and this jumps past 80.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-label mb-2 flex items-center gap-1.5 text-red">
                <AlertTriangle size={13} /> Gaps
              </p>
              <ul className="space-y-1.5 text-sm font-medium">
                {readiness.gaps.map((g) => (
                  <li key={g} className="border-l-4 border-red pl-2">{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label mb-2 flex items-center gap-1.5 text-blue">
                <CheckCircle2 size={13} /> Strengths
              </p>
              <ul className="space-y-1.5 text-sm font-medium">
                {readiness.strengths.map((s) => (
                  <li key={s} className="border-l-4 border-blue pl-2">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </AgentCard>

        <div className="flex flex-col gap-8">
          {/* Next actions */}
          <AgentCard agentName="The Auditor" codeName="Next Actions" accent="yellow">
            <p className="text-label mb-3 flex items-center gap-1.5">
              <ListTodo size={13} /> Do these next
            </p>
            <ol className="space-y-3">
              {readiness.nextActions.map((a, i) => (
                <li key={a} className="flex items-start gap-3 text-sm font-semibold">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-ink bg-yellow text-xs font-black">
                    {i + 1}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
          </AgentCard>

          {/* SkorAlign teaser */}
          <AgentCard agentName="The Translator" codeName="SkorAlignAgent" accent="red">
            <p className="text-sm font-medium text-ink/70">
              <span className="font-black text-ink">{skorAlign.localCert}</span> ={" "}
              <span className="font-black text-blue">{skorAlign.globalEquivalent}</span>
            </p>
            <p className="mt-2 text-sm font-medium text-ink/60">
              &ldquo;{skorAlign.employerDescription}&rdquo;
            </p>
          </AgentCard>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link href="/student/roadmap" className="card card-hover flex items-center justify-between">
          <div>
            <p className="text-label mb-1 text-blue">The Navigator</p>
            <p className="text-xl font-black uppercase">View Career Roadmap</p>
            <p className="mt-1 text-sm font-medium text-ink/60">
              3 realistic paths mapped from your profile
            </p>
          </div>
          <ArrowRight size={24} />
        </Link>
        <Link href="/student/internships" className="card card-hover flex items-center justify-between">
          <div>
            <p className="text-label mb-1 text-red">The Recruiter</p>
            <p className="text-xl font-black uppercase">Matched Internships</p>
            <p className="mt-1 text-sm font-medium text-ink/60">
              {internships.length} matches · top score {internships[0].matchScore}%
            </p>
          </div>
          <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
}
