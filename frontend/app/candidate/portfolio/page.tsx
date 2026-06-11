import { FolderGit2, Award, Briefcase, Sparkles } from "lucide-react";
import { AgentCard } from "@/components/agent-card/AgentCard";
import { parsedResume } from "@/lib/mock-data/candidate";

export default function CandidatePortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-label mb-1 text-red">Living Portfolio</p>
      <h1 className="text-heading mb-2">
        Your Career, Compounding<span className="text-blue">.</span>
      </h1>
      <p className="mb-8 max-w-2xl text-sm font-medium text-ink/60">
        Auto-built from your parsed resume by The Clerk — work history, projects
        and certs in one living profile that employers search by trajectory.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Experience */}
        <AgentCard agentName="Experience" codeName="via The Clerk" accent="blue">
          {parsedResume.experience.map((e) => (
            <div key={e.company}>
              <div className="mb-2 flex items-center gap-2">
                <span className="border-2 border-ink bg-blue p-2 text-white">
                  <Briefcase size={15} />
                </span>
                <div>
                  <p className="font-black uppercase leading-tight">{e.role}</p>
                  <p className="text-sm font-bold text-blue">{e.company} · {e.duration}</p>
                </div>
              </div>
              <ul className="ml-1 space-y-1.5">
                {e.responsibilities.map((r) => (
                  <li key={r} className="border-l-4 border-blue pl-2 text-sm font-medium">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AgentCard>

        {/* Projects */}
        <AgentCard agentName="Projects" codeName="via The Clerk" accent="yellow">
          <div className="space-y-3">
            {parsedResume.projects.map((p) => (
              <div key={p} className="flex items-center gap-2 border-2 border-ink bg-canvas p-3">
                <FolderGit2 size={15} className="shrink-0 text-red" />
                <p className="text-sm font-bold">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-1.5 border-l-4 border-yellow pl-2 text-xs font-semibold text-ink/60">
            <Sparkles size={12} className="mt-0.5 shrink-0" />
            Side projects are your strongest trajectory signal — The Broker
            surfaces them to employers who weight growth over pedigree.
          </p>
        </AgentCard>

        {/* Certifications */}
        <AgentCard agentName="Certifications" codeName="via The Clerk" accent="red">
          {parsedResume.certifications.map((c) => (
            <div key={c} className="flex items-center gap-2 border-2 border-ink bg-canvas p-3">
              <Award size={15} className="shrink-0 text-blue" />
              <p className="text-sm font-bold">{c}</p>
            </div>
          ))}
        </AgentCard>

        {/* Skills */}
        <AgentCard agentName="Skill graph" codeName="via The Clerk" accent="blue">
          <div className="flex flex-wrap gap-2">
            {parsedResume.skills.map((s) => (
              <span key={s} className="border-2 border-ink bg-yellow px-3 py-1.5 text-sm font-bold">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold text-ink/50">
            Stage 2: skills auto-update from GitHub activity and completed
            upskilling — no manual editing.
          </p>
        </AgentCard>
      </div>
    </div>
  );
}
