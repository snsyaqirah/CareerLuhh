import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { CoachAlert } from "@/components/shared/CoachAlert";
import { AgentCard } from "@/components/agent-card/AgentCard";
import {
  candidateCoach,
  parsedResume,
  jobMatches,
  payBenchmark,
  nextMoves,
} from "@/lib/mock-data/candidate";

export default function CandidateDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-label mb-1 text-red">Candidate Dashboard</p>
      <h1 className="text-heading mb-2">
        Hey {parsedResume.name.split(" ")[0]} {parsedResume.name.split(" ")[1]}
        <span className="text-blue">.</span>
      </h1>
      <p className="mb-8 text-sm font-medium text-ink/60">
        {parsedResume.currentRole} · {parsedResume.yearsExp} years experience ·{" "}
        {parsedResume.location}
      </p>

      <div className="mb-8">
        <CoachAlert {...candidateCoach} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Salary snapshot */}
        <AgentCard agentName="The Analyst" codeName="PayBenchmarkAgent" accent="red" status="alert">
          <p className="text-label text-ink/50">Verdict</p>
          <p className="mb-2 text-3xl font-black uppercase text-red">{payBenchmark.verdict}</p>
          <p className="text-sm font-medium text-ink/70">
            You earn <span className="font-black">RM{payBenchmark.currentSalary.toLocaleString()}</span>.
            Market floor for your stack is{" "}
            <span className="font-black text-blue">RM{payBenchmark.benchmarkMin.toLocaleString()}</span>.
          </p>
          <Link href="/candidate/salary" className="btn-red mt-4 px-4 py-2 text-xs">
            Full benchmark <ArrowRight size={14} />
          </Link>
        </AgentCard>

        {/* Job digest */}
        <AgentCard agentName="The Broker" codeName="JobMatchAgent" accent="blue">
          <p className="text-label text-ink/50">This week&apos;s digest</p>
          <p className="mb-2 text-3xl font-black">{jobMatches.length} matches</p>
          <p className="text-sm font-medium text-ink/70">
            Top: {jobMatches[0].title} @ {jobMatches[0].company} —{" "}
            <span className="font-black text-blue">{jobMatches[0].matchScore}% match</span>
          </p>
          <Link href="/candidate/jobs" className="btn-blue mt-4 px-4 py-2 text-xs">
            See matches <ArrowRight size={14} />
          </Link>
        </AgentCard>

        {/* Next move teaser */}
        <AgentCard agentName="The Navigator" codeName="NextMoveAgent" accent="yellow">
          <p className="text-label text-ink/50">Your 3 next moves</p>
          <ul className="mt-2 space-y-2">
            {nextMoves.map((m) => (
              <li key={m.type} className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="border-2 border-ink bg-canvas px-2 py-0.5 text-[10px] uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="truncate text-right text-ink/70">{m.role}</span>
              </li>
            ))}
          </ul>
          <p className="text-label mt-4 text-ink/40">Full view unlocks in Stage 2</p>
        </AgentCard>
      </div>

      {/* Parsed resume */}
      <div className="mt-8">
        <AgentCard agentName="The Clerk" codeName="ResumeOCRAgent" accent="blue">
          <div className="mb-4 flex items-center gap-2">
            <FileText size={16} />
            <p className="font-black uppercase">Living Career Profile — parsed from your resume</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-label mb-2 text-blue">Skills</p>
              <div className="flex flex-wrap gap-2">
                {parsedResume.skills.map((s) => (
                  <span key={s} className="border-2 border-ink bg-yellow px-2 py-0.5 text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label mb-2 text-blue">Experience</p>
              {parsedResume.experience.map((e) => (
                <div key={e.company} className="text-sm font-medium">
                  <p className="font-black">{e.role}</p>
                  <p className="text-ink/60">{e.company} · {e.duration}</p>
                </div>
              ))}
              <p className="text-label mt-3 mb-1 text-blue">Certifications</p>
              {parsedResume.certifications.map((c) => (
                <p key={c} className="text-sm font-medium">{c}</p>
              ))}
            </div>
            <div>
              <p className="text-label mb-2 text-blue">Education</p>
              {parsedResume.education.map((ed) => (
                <div key={ed.institution} className="text-sm font-medium">
                  <p className="font-black">{ed.qualification}</p>
                  <p className="text-ink/60">
                    {ed.institution} · {ed.year} · CGPA {ed.cgpa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AgentCard>
      </div>
    </div>
  );
}
